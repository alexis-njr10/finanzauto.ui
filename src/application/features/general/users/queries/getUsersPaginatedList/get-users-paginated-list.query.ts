import { IBaseQuery } from "../../../../../core/mediator/base"; 
import { GetUsersPaginatedListQueryResponse } from "./get-users-paginated-list.query.response";

export class GetUsersPaginatedListQuery
  implements IBaseQuery<GetUsersPaginatedListQueryResponse> {
  page: number;
  limit: number;
  constructor(page: number, limit: number) {
    this.page = page;
    this.limit = limit;
  }
}