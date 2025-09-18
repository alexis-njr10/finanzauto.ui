import { container, injectable, type InjectionToken } from "tsyringe";
import type { IRequest, IRequestHandler } from ".";

// Constructores
type ReqCtor<TReq extends IRequest<any>> = new (...args: any[]) => TReq;
type HdlCtor<TReq extends IRequest<TRes>, TRes> = new (...args: any[]) => IRequestHandler<TReq, TRes>;

// Usamos la CLASE del Request como token (sin strings ni symbols externos)
function tokenOf<TReq extends IRequest<TRes>, TRes>(
  reqCtor: ReqCtor<TReq>
): InjectionToken<IRequestHandler<TReq, TRes>> {
  return reqCtor as unknown as InjectionToken<IRequestHandler<TReq, TRes>>;
}

@injectable()
export class Mediator {
  async send<TRes, TReq extends IRequest<TRes>>(request: TReq): Promise<TRes> {
    const reqCtor = request.constructor as ReqCtor<TReq>;
    const token = tokenOf<TReq, TRes>(reqCtor);

    if (!container.isRegistered(token, true)) {
      throw new Error(`[Mediator] No hay handler registrado para ${reqCtor.name}.`);
    }
    const handler = container.resolve<IRequestHandler<TReq, TRes>>(token);
    return handler.handle(request);
  }

  register<TRes, TReq extends IRequest<TRes>>(
    requestType: ReqCtor<TReq>,
    handlerType: HdlCtor<TReq, TRes>
  ): void {
    container.register<IRequestHandler<TReq, TRes>>(tokenOf<TReq, TRes>(requestType), {
      useClass: handlerType,
    });
  }

  registerSingleton<TRes, TReq extends IRequest<TRes>>(
    requestType: ReqCtor<TReq>,
    handlerType: HdlCtor<TReq, TRes>
  ): void {
    container.registerSingleton<IRequestHandler<TReq, TRes>>(
      tokenOf<TReq, TRes>(requestType),
      handlerType
    );
  }
}