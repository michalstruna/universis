// bodies.ts
export default Route.getRouteGroupForAll(
    BodyModel
    { get: Route.all, post: Route.all, delete: Route.onlyAuthenticated }    
)

// bodies/{bodyId}.ts
export default Route.getRouteGroupForOne(
    BodyModel,
    { get: Route.all, put: Route.onlyAdmin, delete: Route.onlyAdmin }
)
