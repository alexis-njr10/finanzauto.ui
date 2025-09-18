import { inject, injectable } from "tsyringe";
import type { UpdateUserCommand } from "./update.command";
import type{  IResponse } from "@/domain/models/response.model";
import type { IBaseCommandHandler } from "../../../../../core/mediator/base";
import type { IUsersRepository } from "@/infrastructure/repositories/general/users/iusers.repository";

@injectable()
export class UpdateUserCommandHandler implements IBaseCommandHandler<UpdateUserCommand, IResponse<any>> {
  constructor(@inject("IUsersRepository") private readonly usersRepository: IUsersRepository) {}

  async handle(request: UpdateUserCommand): Promise<IResponse<any>> {
    return await this.usersRepository.updateAsync(request.user);
  }

}