import { OK } from 'http-status-codes'

/**
 * Utils for express response.
 */
class Response {

    private constructor() {

    }

    public static process(action: IFunction<any, Promise<any>>): IDoubleConsumer<any, any> {
        return (request, response) => (
            action(request)
                .then(result => response.status(OK).send(result))
                .catch(error => response.sendStatus(error))
        )
    }

}

export default Response

export const process = Response.process