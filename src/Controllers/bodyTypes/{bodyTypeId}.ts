import BodyTypeModel from '../../Models/BodyTypeModel'
import Route from '../../Utils/Route'

export default Route.getRouteGroupForOne(BodyTypeModel, {
    get: Route.all,
    put: {
        access: Route.all,
        mapBefore: ({ body, files }) => {
            const result = { ...body }

            if (files.texture) {
                result.texture = files.texture.path.split('/').pop()
            }

            return result
        }
    },
    delete: Route.all
})