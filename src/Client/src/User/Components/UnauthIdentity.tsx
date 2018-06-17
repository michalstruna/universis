import * as React from 'react'

import { StatelessComponent, Link } from '../../Utils'

export interface IProps {
    avatar: string,
    firstName: string
}

/**
 * Render unauth identity block about user.
 * There is avatar and first name.
 */
class UnauthIdentity extends StatelessComponent<IProps> {

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
                {this.props.firstName}
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
        if (!this.props.avatar || !this.props.firstName) {
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

export default UnauthIdentity.connect(
    ({ }: any) => ({
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSutibWvQM8vtCnmte5CGFdDt2szJJqAvD-WVqbNHGE809ZuMPkTg',
        firstName: 'Michal'
    })
)