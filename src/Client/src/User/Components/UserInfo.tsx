import * as React from 'react'

import UserScore from './UserScore'
import { StatelessComponent } from '../../Utils'

interface IProps {

}

/**
 * Component for user short info.
 */
class UserInfo extends StatelessComponent<IProps> {

    private getColorFromKarma(): string {
        const karma = Math.min(Math.max(1000, -100), 100)
        const color = 200 - Math.abs(karma / 100) * 200

        if (karma > 0) {
            console.log(color)
            return `rgb(${color}, 230, ${color})`
        } else if (karma < 0) {
            return `rgb(230, ${color}, ${color})`
        } else {
            return 'rgb(230, 230, 230)'
        }
    }

    public render(): JSX.Element {
        const score = {
            gold: 10,
            silver: 112,
            bronze: 1226,
            karma: -56,
            reputation: 1863
        }

        return (
            <section className='user-info'>
                <section className='user-info--left'>
                    <section className='user-info__avatar' />
                    <UserScore score={score} />
                </section>
                <section className='user-info--right'>
                    <section
                        className='user-info__name'
                        style={{ color: this.getColorFromKarma() }}>
                        Michal Struna
                    </section>
                    <section className='user-info__activity'>
                        <p className='user-info__activity__item'>
                            Jaká je největší planeta sluneční soustavy?
                        </p>
                    </section>
                </section>
            </section>
        )
    }

}

export default UserInfo