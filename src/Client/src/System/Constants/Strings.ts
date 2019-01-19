import { Urls } from '../../Utils'
import { Subject, Relation } from '../../Panel'

export default {

    home: {
        title: 'Universis',
        menu: {
            universe: 'Do vesmíru',
            login: 'Přihlášení'
        }
    },

    controls: {
        maximize: 'Maximalizovat',
        minimize: 'Minimalizovat',
        home: 'Domů',
        help: 'Nápověda',
        logIn: 'Přihlášení',
        logout: 'Odhlásit se',
        hideUI: 'Skrýt ovládání',
        showUI: 'Zobrazit ovládání',
        about: 'O Universis'
    },

    alert: {
        about: {
            title: 'O Universis',
            content: 'Universis je 3D simulátor vesmíru. Autorem je Michal Struna. Další informace naleznete v nápovědě.',
            buttons: [
                { label: 'Do vesmíru', target: Urls.UNIVERSE },
                { label: 'Nápověda', target: Urls.HELP }
            ]
        }
    },

    identity: {
        title: 'Přihlašte se.',
        email: 'Zadejte email',
        missingEmail: 'Zadejte email.',
        invalidEmail: 'Zadejte platný email.',
        submit: 'Další'
    },

    login: {
        title: 'Vítejte.',
        password: 'Zadejte heslo',
        missingPassword: 'Zadejte heslo.',
        invalidPassword: 'Zadejte správné heslo.',
        submit: 'Hotovo',
        forgotPassword: 'Zapomenuté heslo?',
        back: 'Zpět'
    },

    signUp: {
        title: 'Registrujte se.',
        password: 'Nové heslo',
        missingPassword: 'Zadejte nové heslo.',
        invalidPassword: 'Heslo musí mít 6+ znaků.',
        passwordAgain: 'Heslo znovu',
        missingPasswordAgain: 'Zadejte heslo znovu.',
        invalidPasswordAgain: 'Hesla se neshodují.',
        submit: 'Registrovat se'
    },

    universe: {
        controls: {
            name: 'Jméno',
            size: 'Size',
            orbits: 'Orbity',
            labels: 'Popisky',
            panel: 'Panel',
            light: 'Světlo',
            now: 'Teď',
            move: 'Pohyb'
        }
    },

    panel: {

    },

    bodies: {
        name: 'Název',
        diameter: 'Průměr',
        mass: 'Hmotnost',
        density: 'Hustota',
        apocenter: 'Apocentrum',
        pericenter: 'Pericentrum',
        eccentricity: 'Excentricita',
        year: 'Rok',
        day: 'Den',
        escapeVelocity: 'Úniková rychlost',
        axisTilt: 'Sklon',
        orbitVelocity: 'Rychlost',
        outerTemperature: 'Vnejší teplota',
        innerTemperature: 'Vnitřní teplota',
        discoverDate: 'Objev',
        flattening: 'Zploštění',
        relativeMagnitude: 'Mag.',
        absoluteMagnitude: 'Abs. mag.',
        axisVelocity: 'Rychlost rotace',
        albedo: 'Albedo',
        luminosity: 'Zářivost',
        absoluteValues: 'Absolutní hodnoty',
        relativeTo: 'Relativně k'
    },

    bodyData: {
        size: 'Velikost',
        diameterX: 'Rov. průměr',
        diameterY: 'Polar. průměr',
        surface: 'Povrch',
        circumference: 'Obvod',
        volume: 'Objem',
        flattening: 'Zploštění',

        matter: 'Hmota',
        mass: 'Hmotnost',
        density: 'Hustota',
        composition: 'Složení',
        escapeVelocity: 'Úniková rychlost',
        gravitationalAcceleration: 'Gravit. zrychlení',

        orbit: 'Dráha',
        semiMajorAxis: 'Velká poloosa',
        pericenter: 'Periapsida',
        apocenter: 'Apoapsida',
        eccentricity: 'Excentricita',
        orbitPeriod: 'Doba oběhu',
        orbitVelocity: 'Rychlost oběhu',
        inclination: 'Sklon dráhy',
        circuit: 'Obvod dráhy',

        atmosphere: 'Atmosféra',
        atmospherePressure: 'Atmosfér. tlak',
        atmosphereComposition: 'Složení',

        visibility: 'Viditelnost',
        albedo: 'Albedo',
        magnitude: 'Magnituda',
        absoluteMagnitude: 'Abs. magnituda',

        energy: 'Energie',
        innerTemperature: 'Vnitř. teplota',
        outerTemperature: 'Vnějš. templota',
        luminosity: 'Zářivý výkon',

        axis: 'Osa',
        axisPeriod: 'Perioda rotace',
        axisVelocity: 'Rychlost rotace',
        axisTilt: 'Sklon osy',

        discover: 'Objev',
        discoverer: 'Objevitel',
        discoverDate: 'Datum objevu'

    },

    notifications: {

        relations: {

        },

        subjects: {
            [Subject.BODY]: 'Těleso',
            [Subject.COMMENT]: 'Komentář',
            [Subject.DISCUSSION]: 'Diskuse',
            [Subject.USER]: 'Uživatel'
        }

    }

}