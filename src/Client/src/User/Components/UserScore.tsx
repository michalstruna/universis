import * as React from 'react'

import { StatelessComponent, Numbers } from '../../Utils'

interface IProps {
    score: IUserScore
}

/**
 * Component for user score.
 */
class UserScore extends StatelessComponent<IProps> {

    public render(): JSX.Element {
        const { score } = this.props

        // TODO: Strings to constants.

        return (
            <section className='user-score'>
                <section className='user-score__reputation'>
                    <span className='user-score__reputation--value'>
                        {Numbers.toReadable(score.reputation)}
                     </span> reputace
                </section>
                <section className='user-score--list'>
                    <section className='user-score__gold'>
                        {Numbers.toReadable(score.gold)}
                    </section>
                    <section className='user-score__silver'>
                        {Numbers.toReadable(score.silver)}
                    </section>
                    <section className='user-score__bronze'>
                        {Numbers.toReadable(score.bronze)}
                    </section>
                </section>
            </section>
        )
    }

}

export default UserScore