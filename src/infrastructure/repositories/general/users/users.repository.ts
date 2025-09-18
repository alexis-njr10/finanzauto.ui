
import { IUserEntity } from "@/domain/entities/general/user.entity";
import { IUsersRepository } from "./iusers.repository";
import { IPaginatedResponse, IResponse } from "@/domain/models/response.model";
import { IUserList } from "@/domain/models/general/user.model";
import axios from "axios";

export class UsersRepository implements IUsersRepository {

  public async getAsync(page: number = 1, limit: number = 10): Promise<IPaginatedResponse<IUserList> | any> {
    return await axios.get(`user?page=${page}&limit=${limit}`).then(async (res) => {
      const data = await Promise.all(
        res?.data.map(async (user) => {
          try {
            const detail = await this.getByIdAsync(user.id);
            return detail ?? user;
          } catch {
            return user;
          }
        })
      );
      return {
        ...res,
        data: data,
      };
    }).catch((err) => {
      return { data: [], total: 0, page: page, limit: limit };
    });
  }

  private async getByIdAsync(id: string): Promise<IUserList> {
    return await axios.get(`user/${id}`);
  }

  public async createAsync(payload: IUserEntity): Promise<IResponse<any>> {
    return await axios.post('user/create', payload).then((res: any)=> {
      if (res && res.id) {
        return { succeeded: true, message: { type: 'success', text: 'Usuario creado exitosamente' }, data: res };
      } else {
        return { succeeded: false, message: { type: 'error', text: 'Error al crear el usuario' }, data: null };
      }
    });
  }

  public async updateAsync(payload: IUserEntity): Promise<IResponse<any>> {
    return await axios.put(`user/${payload.id}`, payload).then((res: any)=> {

      if (res && res.id) {
        return { succeeded: true, message: { type: 'success', text: 'Usuario editado exitosamente' }, data: res };
      } else {
        return { succeeded: false, message: { type: 'error', text: 'Error al editar el usuario' }, data: res };
      }
    });
  }

  public async deleteAsync(id: string): Promise<IResponse<any>> {
    return await axios.delete(`user/${id}`).then((res : any)=> {
      if (res.id) {
        return { succeeded: true, message: { type: 'success', text: 'Usuario eliminado exitosamente' }, data: res };
      } else {
        return { succeeded: false, message: { type: 'error', text: 'Error al eliminar el usuario' }, data: null };
      }
    });
  }
}