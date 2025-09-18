import { GetUsersPaginatedListQueryResponse } from "@/application/features/general/users/queries/getUsersPaginatedList/get-users-paginated-list.query.response";
import { GetUsersPaginatedListQuery } from "@/application/features/general/users/queries/getUsersPaginatedList/get-users-paginated-list.query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";
import { mediator } from "@/application/core/mediator";
import { create } from "zustand";
import { IUser } from "./interfaces/user.interface";
import { DeleteUserCommand } from "@/application/features/general/users/commands/delete/delete.command";
import { CreateUserCommand } from "@/application/features/general/users/commands/create/create.command";
import { UpdateUserCommand } from "@/application/features/general/users/commands/update/update.command";
import { IResponse } from "@/domain/models/response.model";

interface UsersState {
    data: GetUsersPaginatedListQueryResponse | null;
    get: (page: number, limit: number) => void;
    create: (user: IUser) => Promise<IResponse<any> | any>;
    update: (user: IUser) => Promise<IResponse<any> | any>;
    deleteUser: (id: string) => Promise<IResponse<any> | any>;
}

export const useUsersStore = create<UsersState>()(
    persist(
        (set, get) => ({
            data: null,
            get: async (page: number, limit: number) => {
                const query = new GetUsersPaginatedListQuery(page, limit);
                await mediator.send(query).then((response) => {
                    set({ data: response });
                });
                
            },
            create: async (user: IUser) => {
               const command = new CreateUserCommand(user);
               return await mediator.send(command).then((response) => {
                   console.log('User created successfully:', response);
                    return response;
                }).catch((error) => {
                    console.warn('Error creating user:', error);
                    return { succeeded: false, message: { type: 'error', text: 'Error al crear el usuario' }, data: error?.response?.data || null  };
                });
                
            },
            update: async (user: IUser) => {
               const command = new UpdateUserCommand(user);
               return await mediator.send(command).then((response) => {
                    return response;
                }).catch((error) => {
                    console.warn('Error updating user:', error.response);
                    return { succeeded: false, message: { type: 'error', text: 'Error al editar el usuario' }, data: error?.response?.data || null };
                });
                
            },
            deleteUser: async (id: string) => {
                const command = new DeleteUserCommand(id);
               return await mediator.send(command).then((response) => {
                    return response;
                }).catch((error) => {
                    return { succeeded: false, message: { type: 'error', text: 'Error al eliminar el usuario' }, data: error?.response?.data || null };
                });
                
            },
        }),
        {
            name: "users-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
