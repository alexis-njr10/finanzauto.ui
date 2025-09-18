import { container } from "tsyringe";
import { Mediator } from "./base/mediator";
import "@/infrastructure/container.register";

// 🟢 Resolver el Mediator e invocar el comando
container.registerSingleton(Mediator);   // ✅ registra Mediator como singleton
export const mediator = container.resolve(Mediator); // ✅ una única instancia






