/** ✅ Define la interfaz base para Requests (Queries & Commands) */

// @ts-ignore
export interface IRequest<TResponse> {}

/** ✅ Define la interfaz base para los Handlers */
export interface IRequestHandler<TRequest extends IRequest<TResponse>, TResponse> {
    handle(request: TRequest): Promise<TResponse>;
}

/** ✅ Define la interfaz base para Queries */
export interface IBaseQuery<TResponse> extends IRequest<TResponse> {}

/** ✅ Define la interfaz base para Query Responses */
export interface IBaseQueryResponse extends IRequest<unknown> {}

/** ✅ Define la interfaz base para Query Handlers */
export interface IBaseQueryHandler<TQuery extends IBaseQuery<TResponse>, TResponse> 
    extends IRequestHandler<TQuery, TResponse> {}

/** ✅ Define la interfaz base para Commands */
export interface IBaseCommand<TResponse> extends IRequest<TResponse> {}

/** ✅ Define la interfaz base para Command Responses */
export interface IBaseCommandResponse extends IRequest<unknown> {}

/** ✅ Define la interfaz base para Command Handlers */
export interface IBaseCommandHandler<TCommand extends IBaseCommand<TResponse>, TResponse> 
    extends IRequestHandler<TCommand, TResponse> {}
