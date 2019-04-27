import * as React from 'react'

import { Url, View, Urls } from '../../Utils'
import { IdentityForm } from '../../User'

interface IProps {
    identity: Universis.User.Identity
}

/**
 * View for identity page.
 * There is identity form.
 */
class IdentityView extends View<IProps> {


    componentWillMount() {
        if (this.props.identity) {
            Url.replace({ pathname: Urls.HOME})
        }
    }

    public render(): React.ReactNode {
        return (
            <section className={this.getClassName('identity')}>
                <IdentityForm />
            </section>
        )
    }

}

export default IdentityView.connect(
    ({ user }: Universis.Redux.StoreState) => ({
        identity: user.identity.payload
    })
)