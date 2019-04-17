import { Urls } from '../../Utils'
import { SubjectType, Operation } from '../../../../Constants'

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
            orbits: 'Orbity',
            labels: 'Názvy',
            panel: 'Panel',
            light: 'Světlo',
            now: 'Teď',
            move: 'Pohyb',
            velocity: 'Rychlost',
            earth: 'Od Země',
            camera: 'Od kamery',
            center: 'Od těžiště',
            particles: 'Částice',
            follow: 'Sledovat'
        }
    },

    panel: {},

    database: {
        bodies: 'Tělesa',
        bodyTypes: 'Typy těles',

        name: 'Název',
        diameter: 'Průměr',
        mass: 'Hmotnost',
        density: 'Hustota',
        apsis: 'Apsida',
        periapsis: 'Periapsida',
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
        relativeTo: 'Relativně k',
        atmospherePressure: 'Atm. tlak',

        emissiveColor: 'Světlo',
        type: 'Typ',
        texture: 'Textura',
        particlesGenerator: 'Generátor částic'
    },

    body: {
        data: 'Data',
        timeline: 'Časová osa',
        discussion: 'Diskuse',

        name: 'Jméno',
        type: 'Typ',
        description: 'Popisek',
        texture: 'Textura',

        diameterX: 'Průměr x [km]',
        diameterY: 'Průměr y [km]',
        diameterZ: 'Průměr z [km]',

        mass: 'Hmotnost [kg]',
        innerTemperature: 'Teplota jádra [K]',
        outerTemperature: 'Povrchová teplota [K]',

        axisPeriod: 'Perioda rotace [d]',
        axisTilt: 'Sklon rotace [°]',
        axisInitialDate: 'Výchozí čas rotace',

        apsis: 'Apsida [km]',
        periapsis: 'Periapsida [km]',
        eccentricity: 'Excentricita',

        inclination: 'Sklon orbity [°]',
        rotation: 'Natočení orbity [°]',
        orbitInitialDate: 'Datum v pericentru',

        absoluteMagnitude: 'Absolutní magnituda',
        relativeMagnitude: 'Zdánlivá magnituda',
        albedo: 'Albedo',

        discoverer: 'Objevitel',
        discover: 'Datum objevu',
        period: 'Perioda oběhu [r]',

        pressure: 'Atmosférický tlak [Pa]',
        atmosphereComposition: 'Složení atmosféry [O=15;K=13]',
        composition: 'Složení [O=15;K=13]',

        ringMinDiameter: 'Min. prům. prst. [km]',
        ringMaxDIameter: 'Max. prům. prst. [km]',
        ringTexture: 'Textura prstence',

        centerBody: '--- Centrální těleso ---'
    },

    bodyData: {
        size: 'Velikost',
        diameterX: 'Rov. průměr',
        diameterY: 'Polar. průměr',
        diameterZ: 'Rov. průměr 2',
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
        gravitationalParameter: 'Gravit. parametr',

        orbit: 'Dráha',
        semiMajorAxis: 'Velká poloosa',
        periapsis: 'Periapsida',
        apsis: 'Apsida',
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
        outerTemperature: 'Vnějš. teplota',
        luminosity: 'Zářivý výkon',

        axis: 'Osa',
        axisPeriod: 'Perioda rotace',
        axisVelocity: 'Rychlost rotace',
        axisTilt: 'Sklon osy',

        discover: 'Objev',
        discoverer: 'Objevitel',
        discoverDate: 'Datum objevu'

    },

    events: {
        title: 'Titulek',
        description: 'Popis',
        from: 'Od roku',
        to: 'Do roku',
        ok: 'Vaše událost byla odeslána na posouzení a až ji administrátor schváli, bude viditelná pro všechny.'
    },

    discussion: {
        missingContent: 'Nelze odeslat prázdnou odpověď.',
        contentLabel: 'Vaše odpověď...',
        missingTitle: 'Zadejte titulek diskuse.',
        titleLabel: 'Titulek vaší diskuse',
        missingDiscussion: 'Popište problém, otázku či úvahu.',
        discussionLabel: 'Podrobnosti...',
        discussionsCount: 'Diskusí',
        answersCount: 'Odpovědí',
        usersCount: 'Uživatelů',
        mostActive: 'Nejaktivnější',
        mostFavorite: 'Nejoblíbenější',
        newDiscussion: 'Založit novou diskusi'
    },

    notifications: {

        operations: {
            0: 'Nový',
            1: 'Smazaný',
            2: 'Upravený',
            3: 'Přečtený'
        },

        subjects: {
            0: 'Těleso',
            1: 'Komentář',
            2: 'Událost',
            3: 'Diskuse',
            4: 'Uživatel'
        },

        [SubjectType.POST]: {
            [Operation.ADD]: 'okomentoval těleso',
            [Operation.UPDATE]: 'upravil komentář tělesa',
            [Operation.REMOVE]: 'smazal komentář tělesa'
        },
        [SubjectType.EVENT]: {
            [Operation.ADD]: 'přidal událost k tělesu',
            [Operation.UPDATE]: 'upravil událost tělesa',
            [Operation.REMOVE]: 'odstranil událost tělesa'
        }

    },

    editor: {
        add: '＋',
        update: '',
        delete: ''

    },

}