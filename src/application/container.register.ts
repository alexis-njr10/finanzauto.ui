import { CreateUserCommand } from "./features/general/users/commands/create/create.command"; 
import {  CreateUserCommandHandler} from "./features/general/users/commands/create/create.command.handler"; 
import { UpdateUserCommand } from "./features/general/users/commands/update/update.command"; 
import { UpdateUserCommandHandler} from "./features/general/users/commands/update/update.command.handler"; 
import { DeleteUserCommand } from "./features/general/users/commands/delete/delete.command"; 
import { DeleteCommandHandler as  DeleteUserCommandHandler} from "./features/general/users/commands/delete/delete.command.handler"; 
import { GetUsersPaginatedListQuery } from "./features/general/users/queries/getUsersPaginatedList/get-users-paginated-list.query"; 
import { GetUsersPaginatedListQueryHandler } from "./features/general/users/queries/getUsersPaginatedList/get-users-paginated-list.query.handler";
import { mediator } from "./core/mediator";

// 🟢 Registrar el handler en TSyringe
mediator.registerSingleton(CreateUserCommand, CreateUserCommandHandler);
mediator.registerSingleton(UpdateUserCommand, UpdateUserCommandHandler);
mediator.registerSingleton(DeleteUserCommand, DeleteUserCommandHandler);
mediator.registerSingleton(GetUsersPaginatedListQuery, GetUsersPaginatedListQueryHandler);