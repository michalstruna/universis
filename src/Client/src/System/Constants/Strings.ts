import { Urls } from '../../Utils'

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

    body: {
        data: 'Data',
        timeline: 'Časová osa',
        discussion: 'Diskuse',
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
        gravitationalParameter: 'Gravit. parametr',

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
        from: 'Od',
        to: 'Do'
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
        }

    },

    editor: {
        add: '＋',
        update: 'Upravit',
        delete: 'Odstranit'

    }

}