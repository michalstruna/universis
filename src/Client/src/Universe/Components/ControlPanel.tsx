import * as ClassNames from 'classnames'
import * as React from 'react'

import Keys from '../Constants/Keys'
import { Keyboard, Queries, StatelessComponent, Url } from '../../Utils'
import {
    changeFollow,
    changeTimeSpeed,
    toggleFromCamera,
    toggleFromCenter,
    toggleFromEarth,
    toggleLabels,
    toggleLight,
    toggleOrbits,
    toggleParticles,
    toggleVelocity,
    setNow
} from '../Redux/UniverseActions'
import Follow from '../Constants/Follow'

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
    areParticlesVisible: boolean
    toggleParticles: Universis.Consumer<boolean>
    selectedBody: string
    bodies: Universis.Redux.AsyncEntity<Universis.Universe.Body.Simple[]>
    changeFollow: Universis.Runnable
    follow: Follow
    setNow: Universis.Runnable
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
            [Keys.ORBITS]: () => this.props.toggleOrbits(!this.props.areOrbitsVisible),
            [Keys.PARTICLES]: () => this.props.toggleParticles(!this.props.areParticlesVisible),
            [Keys.PANEL]: () => this.togglePanel(),
            [Keys.FOLLOW]: () => this.props.changeFollow(),
            [Keys.NOW]: () => this.props.setNow()
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
     * @param isSemiActive Button is semi-active. (optional, default false)
     * @returns Button.
     */
    private renderButton(name: string, handleClick: Universis.Runnable = () => null, isActive: boolean = false, isSemiActive: boolean = false): React.ReactNode {
        const className = ClassNames(
            'universe__controls__button',
            'universe__controls__button--' + name,
            { 'universe__controls__button--active': isActive },
            { 'universe__controls__button--semi-active': isSemiActive }
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

    private togglePanel = () => {
        const { selectedBody, bodies, location } = this.props

        const isPanelOpened = Url.hasQuery(Queries.PANEL, location.search)
        const bodyName = bodies.payload.find(body => body._id === selectedBody).name

        Url.push({
            query: {
                [Queries.PANEL]: isPanelOpened ? null : Queries.BODY,
                [Queries.BODY]: isPanelOpened ? null : bodyName
            }
        })
    }

    public render(): React.ReactNode {
        const {
            isNameVisible, toggleLabels, isLightVisible, toggleLight, areOrbitsVisible, toggleOrbits, isVelocityVisible,
            toggleVelocity, isFromCenterVisible, toggleFromCenter, isFromCameraVisible, toggleFromEarth, isFromEarthVisible,
            toggleFromCamera, timeSpeed, changeTimeSpeed, toggleParticles, areParticlesVisible, changeFollow, follow, setNow
        } = this.props

        return (
            <section className='universe__controls'>
                <section className='universe__controls__row'>
                    {this.renderButton('panel', this.togglePanel, Url.hasQuery(Queries.PANEL, location.search))}
                    {this.renderButton('follow', changeFollow, follow === Follow.MOVE_AND_ROTATION, follow === Follow.MOVE)}
                </section>
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
                    {this.renderButton('particles', () => toggleParticles(!areParticlesVisible), areParticlesVisible)}
                    {this.renderButton('light', () => toggleLight(!isLightVisible), isLightVisible)}
                </section>
                <section className='universe__controls__row'>
                    {this.renderButton('slower', () => changeTimeSpeed(timeSpeed, false))}
                    {this.renderButton('faster', () => changeTimeSpeed(timeSpeed, true))}
                </section>
                <section className='universe__controls__row'>
                    {this.renderButton('speed', () => changeTimeSpeed(1))}
                    {this.renderButton('now', () => setNow())}
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
        timeSpeed: universe.timeSpeed,
        areParticlesVisible: universe.areParticlesVisible,
        selectedBody: universe.selectedBody,
        bodies: universe.bodies,
        follow: universe.follow
    }),
    {
        toggleLight,
        toggleOrbits,
        toggleLabels,
        toggleVelocity,
        toggleFromCamera,
        toggleFromCenter,
        toggleFromEarth,
        changeTimeSpeed,
        toggleParticles,
        changeFollow,
        setNow
    }
)