import { inject, injectable } from "tsyringe";
import type { IBaseQueryHandler } from "../../../../../core/mediator/base";
import type { GetUsersPaginatedListQuery } from "./get-users-paginated-list.query";
import type { GetUsersPaginatedListQueryResponse } from "./get-users-paginated-list.query.response";
import type { IUsersRepository } from "@/infrastructure/repositories/general/users/iusers.repository";

@injectable()
export class GetUsersPaginatedListQueryHandler
  implements IBaseQueryHandler<GetUsersPaginatedListQuery, GetUsersPaginatedListQueryResponse>
{
  constructor(@inject("IUsersRepository") private readonly usersRepository: IUsersRepository) {}

  async handle(query: GetUsersPaginatedListQuery): Promise<GetUsersPaginatedListQueryResponse> {
    return await this.usersRepository.getAsync(query.page, query.limit);
  }
}

