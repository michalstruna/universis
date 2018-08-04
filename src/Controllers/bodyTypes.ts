import BodyTypeModel from '../Models/BodyTypeModel'
import { process } from '../Utils/Response'

export default {

    get: process(() => (
        BodyTypeModel.getBodyTypes()
    )),

    post: process(({ body }) => (
        BodyTypeModel.addBodyType(body.name)
    ), _id => ({ _id })),

    delete: process(() => (
        BodyTypeModel.removeBodyTypes()
    ), count => ({ count }))

}