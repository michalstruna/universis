import * as React from 'react'

import { StatelessComponent, FadeLayout, Link } from '../../Utils'
import { toggleAlert } from '../../System'

interface IProps {
    buttons: ILinkButton[]
    content: string
    toggleAlert: IConsumer<boolean>
    isVisible: boolean
    title: string
}

class Alert extends StatelessComponent<IProps> {

    /**
     * After click on alert button, hide alert and apply callback.
     * @param target Target of link.
     */
    private handleClickButton = (target: string) => {
        const { toggleAlert, history } = this.props
        toggleAlert(false)
        history.push(target)
    }

    /**
     * Render all buttons of alert window.
     * @return All buttons.
     */
    private renderButtons(): JSX.Element[] {
        const { buttons } = this.props

        return buttons.map((button, key) => (
            <Link
                className='alert__button'
                key={key}
                onClick={() => this.handleClickButton(button.target)}
                target={button.target}>
                {button.label}
            </Link>
        ))
    }

    public render(): JSX.Element {
        const { toggleAlert, content, isVisible, title } = this.props

        return (
            <FadeLayout
                className='alert'
                onClick={() => toggleAlert(false)}
                mounted={isVisible}>
                <section
                    className='alert--inner'
                    onClick={event => event.stopPropagation()}>
                    <button
                        className='alert__close'
                        onClick={() => toggleAlert(false)} />
                    <h1 className='alert__title'>
                        {title}
                    </h1>
                    <p className='alert__content'>
                        {content}
                    </p>
                    <section className='alert__buttons'>
                        {this.renderButtons()}
                    </section>
                </section>
            </FadeLayout>
        )
    }

}

export default Alert.connect(
    ({ system }: IStoreState) => ({
        buttons: system.alert.buttons,
        content: system.alert.content,
        isVisible: system.isAlertVisible,
        title: system.alert.title
    }),
    { toggleAlert }
)