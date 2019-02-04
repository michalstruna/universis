/**
 * Interface for express request.
 */
declare type IExpressRequest = any

/**
 * Interface for express response.
 */
declare type IExpressResponse = any

/**
 * Interface for promise method.
 */
declare type IRouteAction = IFunction<any, Promise<any>>

/**
 * Interface for function, that converts output of model to response data.
 */
declare type IResultMap = boolean | IFunction<any, any>

/**
 * Interface for express handler.
 */
declare type IRequestHandler = IConsumer2<IExpressRequest, IExpressResponse>

/**
 * Interface for is authorized check.
 */
declare type IIsAuthorized = IFunction<IUser, boolean>

/**
 * Function that say, who has access to route.
 */
type IDefaultRouteAccess = (IFunction<IRouteAction, IRequestHandler> & IFunction2<IRouteAction, IResultMap, IRequestHandler>)
declare type IRouteAccess = IDefaultRouteAccess | { access: IDefaultRouteAccess, mapBefore?: IFunction<any, any>, mapAfter?: IFunction<any, any> }

/**
 * Interface for route group access.
 */
declare interface IRouteGroupAccess {
    get?: IRouteAccess,
    post?: IRouteAccess,
    put?: IRouteAccess,
    delete?: IRouteAccess
}

/**
 * Interface for group of routes for one entity.
 */
declare interface IRouteGroupForAll {

    /**
     * Route for get entities.
     */
    get?: IRequestHandler

    /**
     * Route for add entity.
     */
    post?: IRequestHandler

    /**
     * Route for remove all entities.
     */
    delete?: IRequestHandler

}

/**
 * Interface for group of routes for one entity.
 */
declare interface IRouteGroupForOne {

    /**
     * Route for get one entity.
     */
    get?: IRequestHandler

    /**
     * Route for update entity.
     */
    put?: IRequestHandler

    /**
     * Route for remove one entity.
     */
    delete?: IRequestHandler

}

/**
 * Interface for group of routes for one entity.
 */
declare interface IRouteGroupForCount {

    /**
     * Route for get count of entities.
     */
    get?: IRequestHandler

}