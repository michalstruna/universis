import * as React from 'react'

import { StatelessComponent, Link } from '../../Utils'

/**
 * Render unauth identity block about user.
 * There is avatar and first name.
 */
class UnauthUser extends StatelessComponent<IBaseUser> {

    /**
     * Render avatar of user.
     * @return Avatar.
     */
    private renderAvatar(): JSX.Element {
        return (
            <img
                className='unauth-identity__avatar'
                src={this.props.avatar} />
        )
    }

    /**
     * Render first name of user.
     * @return First name.
     */
    private renderFirstName(): JSX.Element {
        return (
            <p className='unauth-identity__first-name'>
                {this.props.name}
            </p>
        )
    }

    /**
     * Render back button.
     * @return Back button.
     */
    private renderBack(): JSX.Element {
        return (
            <Link
                className='unauth-identity__back'
                target={Link.URLS.IDENTITY} />
        )
    }

    public render(): JSX.Element {
        console.log(this.props)

        if (!this.props.avatar || !this.props.name) {
            return null
        }

        return (
            <section className='unauth-identity'>
                {this.renderBack()}
                {this.renderAvatar()}
                {this.renderFirstName()}
            </section>
        )
    }

}

export default UnauthUser.connect(
    ({ user }: any) => ({
        ...user.unauthUser
    })
)