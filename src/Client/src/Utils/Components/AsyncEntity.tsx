import * as React from 'react'

import StatelessComponent from './StatelessComponent'
import Loader from './Loader'

interface IProps {
    data: IAsyncEntity<any>
    success?: ISupplier<React.ReactNode>
    fail?: ISupplier<React.ReactNode>
    sent?: ISupplier<React.ReactNode>
}

class AsyncEntity extends StatelessComponent<IProps> {

    /**
     * Send async entity request.
     * @param entity Async entity.
     * @param request Request.
     * @param {boolean} force Request is being sent also if data is already exists.
     */
    public static request(entity: IAsyncEntity<any>, request: IRunnable, force: boolean = false) {
        if (!entity.isSent && (!entity.payload || force)) {
            request()
        }
    }

    public render(): React.ReactNode {
        const { data, success, fail, sent } = this.props

        if (data.isSent) {
            return sent ? sent() : <Loader />
        } else if (data.error) {
            return fail ? fail() : data.error
        } else {
            return success ? success() : JSON.stringify(data.payload || {})
        }
    }

}

export default AsyncEntity