import { inject, injectable } from "tsyringe";
import type { DeleteUserCommand } from "./delete.command";
import type{  IResponse } from "@/domain/models/response.model";
import type { IBaseCommandHandler } from "../../../../../core/mediator/base";
import type { IUsersRepository } from "@/infrastructure/repositories/general/users/iusers.repository";

@injectable()
export class DeleteCommandHandler implements IBaseCommandHandler<DeleteUserCommand, IResponse<any>> {
  constructor(@inject("IUsersRepository") private readonly usersRepository: IUsersRepository) {}

  async handle(request: DeleteUserCommand): Promise<IResponse<any>> {
    return await this.usersRepository.deleteAsync(request.id);
  }

}