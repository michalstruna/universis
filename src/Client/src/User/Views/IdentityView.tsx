import * as React from 'react'

import { Url, View } from '../../Utils'
import { IdentityForm } from '../../User'

interface IProps {
    identity: IUserIdentity
}

/**
 * View for identity page.
 * There is identity form.
 */
class IdentityView extends View<IProps> {


    componentWillMount() {
        if (this.props.identity) {
            Url.replace({ pathname: Url.URLS.HOME})
        }
    }

    public render(): JSX.Element {
        return (
            <section className={this.getClassName('identity')}>
                <IdentityForm onSubmit={data => console.log(data)} />
            </section>
        )
    }

}

export default IdentityView.connect(
    ({ user }: IStoreState) => ({
        identity: user.identity.payload
    })
)