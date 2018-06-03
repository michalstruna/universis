import * as React from 'react'

import { StatelessComponent, FadeLayout, Link } from '../../Utils'
import { SystemActions } from '../../System'

interface IProps {
    buttons: ILinkButton[],
    content: string,
    hide: () => void,
    isVisible: boolean,
    title: string
}

class Alert extends StatelessComponent<IProps> {

    /**
     * After click on alert button, hide alert and apply callback.
     * @param target Target of link.
     */
    private handleClickButton = (target: string) => {
        const { hide, history } = this.props
        hide()
        history.push(target)
    }

    /**
     * Render all buttons of alert window.
     * @return All buttons.
     */
    private renderButtons(): JSX.Element[] {
        const { buttons, hide } = this.props

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
        const { hide, content, isVisible, title } = this.props

        let x: React.MouseEvent<any>

        return (
            <FadeLayout
                className='alert'
                onClick={hide}
                mounted={isVisible}>
                <section
                    className='alert--inner'
                    onClick={event => {event.stopPropagation(); console.log(event.currentTarget)}}>
                    <button
                        className='alert__close'
                        onClick={hide} />
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
    ({ system: { alert } }: any) => ({
        buttons: alert.buttons,
        content: alert.content,
        isVisible: alert.isVisible,
        title: alert.title
    }),
    (dispatch: any) => ({
        hide: () => dispatch(SystemActions.hideAlert())
    })
)