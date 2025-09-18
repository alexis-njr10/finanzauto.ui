import { IPaginatedResponse } from "@/domain/models/response.model";
import { IBaseQueryResponse } from "../../../../../core/mediator/base"; 
import { IUserList } from "@/domain/models/general/user.model";

export interface GetUsersPaginatedListQueryResponse
  extends IPaginatedResponse<IUserList>, IBaseQueryResponse {}
