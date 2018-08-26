import * as React from 'react'

import { Urls, View } from '../../Utils'
import { IdentityForm } from '../../User'

interface IProps {
    isLoggedIn: boolean
}

/**
 * View for identity page.
 * There is identity form.
 */
class IdentityView extends View<IProps> {


    componentWillMount() {
        const { history, isLoggedIn } = this.props

        if (isLoggedIn) {
            history.push(Urls.HOME)
        }
    }

    public render(): JSX.Element {
        return (
            <section className={this.getClassName('identity')}>
                <IdentityForm />
            </section>
        )
    }

}

export default IdentityView.connect(
    ({ user }: IStoreState) => ({
        isLoggedIn: user.isLoggedIn
    })
)