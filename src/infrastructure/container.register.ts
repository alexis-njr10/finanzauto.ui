import { container } from "tsyringe";

// Interfaces
import { IUsersRepository } from "./repositories/general/users/iusers.repository";

// Implementaciones
import { UsersRepository } from "./repositories/general/users/users.repository"; 

// ✅ Registrar los repositorios como Singleton
container.registerSingleton<IUsersRepository>("IUsersRepository", UsersRepository);
