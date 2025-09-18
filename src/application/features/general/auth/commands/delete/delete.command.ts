import { IBaseCommand } from "../../../../../core/mediator/base";
import { IResponse } from "@/presentation/screens/shared/interfaces/response.interface";

export class DeleteUserCommand implements IBaseCommand<IResponse> {
  constructor(public id: string) {}
}