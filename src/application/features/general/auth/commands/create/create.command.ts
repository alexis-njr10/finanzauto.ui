import { IBaseCommand } from "../../../../../core/mediator/base";
import { IUserEntity } from "@/domain/entities/general/user.entity";
import { IResponse } from "@/presentation/screens/shared/interfaces/response.interface";

export class CreateUserCommand implements IBaseCommand<IResponse> {
  constructor(public user: IUserEntity) {}
}