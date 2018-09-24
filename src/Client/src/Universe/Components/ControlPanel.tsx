import * as React from 'react'

import Keys from '../Constants/Keys'
import { StatelessComponent } from '../../Utils'

interface IProps {
    strings: IStrings
    viewSize: number
}

/**
 * Component control panel.
 */
class ControlPanel extends StatelessComponent<IProps> {

    /**
     * Render button.
     * @param name Class name suffix.
     * @param key Key shortcut.
     * @returns Button.
     */
    private renderButton(name: string, key: string = null): JSX.Element {
        return (
            <button
                className={'universe__controls__button universe__controls__button--' + name}>
                <section className='universe__controls__button__key'>
                    {Keys[name.toUpperCase()]}
                </section>
                <section className='universe__controls__button__icon' />
                {this.props.strings[name] || null}
            </button>
        )
    }

    public render(): JSX.Element {
        return (
            <section className='universe__controls'>
                <section className='universe__controls__row'>
                    {this.renderButton('name')}
                </section>
                <section className='universe__controls__row'>
                    {this.renderButton('size')}
                </section>
                <section className='universe__controls__row'>
                    {this.renderButton('orbits')}
                    {this.renderButton('labels')}
                </section>
                <section className='universe__controls__row'>
                    {this.renderButton('panel')}
                    {this.renderButton('free')}
                </section>
                <section className='universe__controls__row'>
                    {this.renderButton('slower')}
                    {this.renderButton('speed')}
                    {this.renderButton('faster')}
                </section>
                <section className='universe__controls__row'>
                    {this.renderButton('now')}
                    {this.renderButton('move')}
                </section>
            </section>
        )
    }

}

export default ControlPanel.connect(
    ({ system }: IStoreState) => ({
        strings: system.strings.universe.controls
    })
)