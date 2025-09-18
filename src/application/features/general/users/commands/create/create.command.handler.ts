import { inject, injectable } from "tsyringe";
import type { CreateUserCommand } from "./create.command";
import type{  IResponse } from "@/domain/models/response.model";
import type { IBaseCommandHandler } from "../../../../../core/mediator/base";
import type { IUsersRepository } from "@/infrastructure/repositories/general/users/iusers.repository";

@injectable()
export class CreateUserCommandHandler implements IBaseCommandHandler<CreateUserCommand, IResponse<any>> {
  constructor(@inject("IUsersRepository") private readonly usersRepository: IUsersRepository) {}

  async handle(request: CreateUserCommand): Promise<IResponse<any>> {
    return await this.usersRepository.createAsync(request.user);
  }

}