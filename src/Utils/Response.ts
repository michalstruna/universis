import { OK, NO_CONTENT } from 'http-status-codes'

/**
 * Utils for express response.
 */
class Response {

    private constructor() {

    }

    public static process(action: IFunction<any, Promise<any>>, resultMap: IFunction<any, any> = result => result): IDoubleConsumer<any, any> {
        return (request, response) => (
            action(request)
                .then(result => response.status(OK).send(resultMap(result)))
                .catch(error => response.sendStatus(error))
        )
    }

    public static processWithoutResponse(action: IFunction<any, Promise<any>>): IDoubleConsumer<any, any> {
        return (request, response) => (
            action(request)
                .then(() => (response.sendStatus(NO_CONTENT)))
                .catch(error => response.sendStatus(error))
        )
    }

}

export default Response

export const process = Response.process
export const processWithoutResponse = Response.processWithoutResponse