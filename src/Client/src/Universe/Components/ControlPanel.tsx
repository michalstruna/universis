import * as ClassNames from 'classnames'
import * as React from 'react'

import Keys from '../Constants/Keys'
import { StatelessComponent, Keyboard } from '../../Utils'
import {
    toggleLabels,
    toggleLight,
    toggleOrbits,
    toggleVelocity,
    toggleFromCamera,
    toggleFromCenter,
    toggleFromEarth,
    changeTimeSpeed
} from '../Redux/UniverseActions'

interface IProps {
    strings: Universis.Strings
    viewSize: number
    isNameVisible: boolean
    toggleLabels: Universis.Consumer<boolean>
    isLightVisible: boolean
    toggleLight: Universis.Consumer<boolean>
    areOrbitsVisible: boolean
    toggleOrbits: Universis.Consumer<boolean>
    isVelocityVisible: boolean
    toggleVelocity: Universis.Consumer<boolean>
    isFromEarthVisible: boolean
    toggleFromEarth: Universis.Consumer<boolean>
    isFromCameraVisible: boolean
    toggleFromCamera: Universis.Consumer<boolean>
    isFromCenterVisible: boolean
    toggleFromCenter: Universis.Consumer<boolean>
    timeSpeed: number,
    changeTimeSpeed: (timeSpeed: number, faster?: boolean) => void
}

/**
 * Component control panel.
 */
class ControlPanel extends StatelessComponent<IProps> {

    public componentDidMount(): void {
        Keyboard.set({
            [Keys.CAMERA]: () => this.props.toggleFromCamera(!this.props.isFromCameraVisible),
            [Keys.CENTER]: () => this.props.toggleFromCenter(!this.props.isFromCenterVisible),
            [Keys.EARTH]: () => this.props.toggleFromEarth(!this.props.isFromEarthVisible),
            [Keys.VELOCITY]: () => this.props.toggleVelocity(!this.props.isVelocityVisible),
            [Keys.LIGHT]: () => this.props.toggleLight(!this.props.isLightVisible),
            [Keys.FASTER]: () => this.props.changeTimeSpeed(this.props.timeSpeed, true),
            [Keys.SLOWER]: () => this.props.changeTimeSpeed(this.props.timeSpeed, false),
            [Keys.SPEED]: () => this.props.changeTimeSpeed(1),
            [Keys.LABELS]: () => this.props.toggleLabels(!this.props.isNameVisible),
            [Keys.ORBITS]: () => this.props.toggleOrbits(!this.props.areOrbitsVisible)
        })
    }

    public componentWillUnmount(): void {
        Keyboard.clear(...Object.keys(Keys))
    }

    /**
     * Render button.
     * @param name Class name suffix.
     * @param handleClick Callback after click.
     * @param isActive Button is active.
     * @returns Button.
     */
    private renderButton(name: string, handleClick: Universis.Runnable = () => null, isActive: boolean = false): React.ReactNode {
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

    public render(): React.ReactNode {
        const { isNameVisible, toggleLabels, isLightVisible, toggleLight, areOrbitsVisible, toggleOrbits, isVelocityVisible, toggleVelocity, isFromCenterVisible, toggleFromCenter, isFromCameraVisible, toggleFromEarth, isFromEarthVisible, toggleFromCamera, timeSpeed, changeTimeSpeed } = this.props

        return (
            <section className='universe__controls'>
                <section className='universe__controls__row'>
                    {this.renderButton('camera', () => toggleFromCamera(!isFromCameraVisible), isFromCameraVisible)}
                    {this.renderButton('center', () => toggleFromCenter(!isFromCenterVisible), isFromCenterVisible)}
                </section>
                <section className='universe__controls__row'>
                    {this.renderButton('velocity', () => toggleVelocity(!isVelocityVisible), isVelocityVisible)}
                    {this.renderButton('earth', () => toggleFromEarth(!isFromEarthVisible), isFromEarthVisible)}
                </section>
                <section className='universe__controls__row'>
                    {this.renderButton('orbits', () => toggleOrbits(!areOrbitsVisible), areOrbitsVisible)}
                    {this.renderButton('labels', () => toggleLabels(!isNameVisible), isNameVisible)}
                </section>
                <section className='universe__controls__row'>
                    {this.renderButton('panel')}
                    {this.renderButton('light', () => toggleLight(!isLightVisible), isLightVisible)}
                </section>
                <section className='universe__controls__row'>
                    {this.renderButton('slower', () => changeTimeSpeed(timeSpeed, false))}
                    {this.renderButton('speed', () => changeTimeSpeed(1))}
                    {this.renderButton('faster', () => changeTimeSpeed(timeSpeed, true))}
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
    ({ system, universe }: Universis.Redux.StoreState) => ({
        strings: system.strings.universe.controls,
        isNameVisible: universe.isNameVisible,
        isLightVisible: universe.isLightVisible,
        areOrbitsVisible: universe.areOrbitsVisible,
        isVelocityVisible: universe.isVelocityVisible,
        isFromEarthVisible: universe.isFromEarthVisible,
        isFromCameraVisible: universe.isFromCameraVisible,
        isFromCenterVisible: universe.isFromCenterVisible,
        timeSpeed: universe.timeSpeed
    }),
    {
        toggleLight,
        toggleOrbits,
        toggleLabels,
        toggleVelocity,
        toggleFromCamera,
        toggleFromCenter,
        toggleFromEarth,
        changeTimeSpeed
    }
)