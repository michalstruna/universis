import BodyTypeModel from '../Models/BodyTypeModel'
import Route from '../Utils/Route'

export default Route.getRouteGroupForAll(BodyTypeModel, {
    get: Route.all,
    post: {
        access: Route.all,
        mapBefore: ({ body, files }) => {
            const result = { ...body }
            result.texture = files.texture.path.split('/').pop()
            return result
        }
    },
    delete: Route.onlyAdmin
})