import BodyModel from '../Models/BodyModel'
import Route from '../Utils/Route'

export default Route.getRouteGroupForAll(BodyModel, {
    get: Route.all,
    post: {
        access: Route.all,
        mapBefore: ({ body, files }) => {
            const result = { ...body }

            if (result.texture) {
                result.texture = files.texture.path.split('/').pop()
            }

            return result
        }
    },
    delete: Route.onlyAdmin
})