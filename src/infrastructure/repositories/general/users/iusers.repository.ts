import { IPaginatedResponse, IResponse } from "@/domain/models/response.model"; 
import { IUserEntity } from "@/domain/entities/general/user.entity";
import { IUserList } from "@/domain/models/general/user.model";

export interface IUsersRepository {
    getAsync(page: number, limit: number): Promise<IPaginatedResponse<IUserList>>;
    createAsync(user: IUserEntity):Promise<IResponse<any>>;
    updateAsync(user: IUserEntity):Promise<IResponse<any>>;
    deleteAsync(id: string):Promise<IResponse<any>>;
}