import * as ClassNames from 'classnames'
import * as React from 'react'

import Keys from '../Constants/Keys'
import { StatelessComponent } from '../../Utils'
import UniverseActions from '../Redux/UniverseActions'

interface IProps {
    strings: IStrings
    viewSize: number
    areLabelsVisible: boolean
    toggleLabels: IConsumer<boolean>
    isLightVisible: boolean
    toggleLight: IConsumer<boolean>
    areOrbitsVisible: boolean
    toggleOrbits: IConsumer<boolean>
}

/**
 * Component control panel.
 */
class ControlPanel extends StatelessComponent<IProps> {

    /**
     * Render button.
     * @param name Class name suffix.
     * @param handleClick Callback after click.
     * @param isActive Button is active.
     * @returns Button.
     */
    private renderButton(name: string, handleClick: IRunnable = () => null, isActive: boolean = false): JSX.Element {
        const className = ClassNames(
            'universe__controls__button',
            'universe__controls__button--' + name,
            { 'universe__controls__button--active': isActive }
        )

        return (
            <button
                className={className}
                onClick={handleClick}>
                <section className='universe__controls__button__key'>
                    {Keys[name.toUpperCase()]}
                </section>
                <section className='universe__controls__button__icon' />
                {this.props.strings[name] || null}
            </button>
        )
    }

    public render(): JSX.Element {
        const { areLabelsVisible, toggleLabels, isLightVisible, toggleLight, areOrbitsVisible, toggleOrbits } = this.props

        return (
            <section className='universe__controls'>
                <section className='universe__controls__row'>
                    {this.renderButton('name')}
                </section>
                <section className='universe__controls__row'>
                    {this.renderButton('size')}
                </section>
                <section className='universe__controls__row'>
                    {this.renderButton('orbits', () => toggleOrbits(!areOrbitsVisible), areOrbitsVisible)}
                    {this.renderButton('labels', () => toggleLabels(!areLabelsVisible), areLabelsVisible)}
                </section>
                <section className='universe__controls__row'>
                    {this.renderButton('panel')}
                    {this.renderButton('light', () => toggleLight(!isLightVisible), isLightVisible)}
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
    ({ system, universe }: IStoreState) => ({
        strings: system.strings.universe.controls,
        areLabelsVisible: universe.areLabelsVisible,
        isLightVisible: universe.isLightVisible,
        areOrbitsVisible: universe.areOrbitsVisible
    }),
    (dispatch: IDispatch) => ({
        toggleLabels: areLabelsVisible => dispatch(UniverseActions.toggleLabels(areLabelsVisible)),
        toggleLight: isLightVisible => dispatch(UniverseActions.toggleLight(isLightVisible)),
        toggleOrbits: areOrbitsVisible => dispatch(UniverseActions.toggleOrbits(areOrbitsVisible))
    })
)