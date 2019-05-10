import { Urls } from '../../Utils'
import { SubjectType, Operation, ApprovalState } from '../../../../Constants'

export default {

    home: {
        title: 'Universis',
        menu: {
            universe: 'Do vesmíru',
            login: 'Přihlášení',
            profile: 'Můj profil'
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
        about: 'O projektu',
        approvals: 'Schválení'
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

    resetPassword: {
        title: 'Obnovení hesla.',
        password: 'Nové heslo',
        missingPassword: 'Zadejte nové heslo.',
        invalidPassword: 'Heslo musí mít 6+ znaků.',
        passwordAgain: 'Heslo znovu',
        missingPasswordAgain: 'Zadejte heslo znovu.',
        invalidPasswordAgain: 'Hesla se neshodují.',
        submit: 'Nastavit heslo',
        error: 'Odkaz již není platný. Zažádejte si o obnovení hesla znovu.'
    },

    activateEmail: {
        error: 'Odkaz již není platný.'
    },

    universe: {
        controls: {
            orbits: 'Orbity',
            labels: 'Názvy',
            panel: 'Panel',
            light: 'Světlo',
            now: 'Teď',
            velocity: 'Rychlost',
            earth: 'Od Země',
            camera: 'Od kamery',
            center: 'Od těžiště',
            particles: 'Částice',
            follow: 'Sledovat',
            faster: 'Zrychlit',
            slower: 'Zpomalit',
            speed: 'Rychlost 1'
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

        centerBody: '--- Centrální těleso ---',

        particlesCount: 'Počet částic',
        particlesThickness: 'Vnitřní poloměr částic',
        particlesSize: 'Velikost částic',
        parent: 'Nadřazené těleso',
        move: 'Pohyb',
        alpha: 'Úhel X',
        beta: 'Úhel Y',
        distance: 'Vzdálenost',
        nearest: 'Nejblíže k Zemi'
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

        unapproved: 'čeká na schválení',
        disapproved: 'neschváleno',


        [SubjectType.POST]: {
            [ApprovalState.APPROVED]: {
                [Operation.ADD]: 'okomentoval těleso',
                [Operation.UPDATE]: 'upravil komentář tělesa',
                [Operation.DELETE]: 'smazal komentář tělesa'
            }
        },
        [SubjectType.EVENT]: {
            [ApprovalState.UNAPPROVED]: {
                [Operation.ADD]: 'navrhl událost k tělesu',
                [Operation.UPDATE]: 'navrhl úpravu události tělesa',
                [Operation.DELETE]: 'navrhl odebrání událost tělesa'
            },
            [ApprovalState.APPROVED]: {
                [Operation.ADD]: 'přidal událost k tělesu',
                [Operation.UPDATE]: 'upravil událost tělesa',
                [Operation.DELETE]: 'odstranil událost tělesa'
            },
            [ApprovalState.DISAPPROVED]: {
                [Operation.ADD]: 'navrhl událost k tělesu',
                [Operation.UPDATE]: 'navrhl úpravu události tělesa',
                [Operation.DELETE]: 'navrhl odebrání událost tělesa'
            }
        },
        [SubjectType.BODY_TYPE]: {
            [ApprovalState.UNAPPROVED]: {
                [Operation.ADD]: 'navrhl typ tělesa',
                [Operation.UPDATE]: 'navrhl úpravu typu tělesa',
                [Operation.DELETE]: 'navrhl odebrání typu tělesa'
            },
            [ApprovalState.APPROVED]: {
                [Operation.ADD]: 'přidal typ tělesa',
                [Operation.UPDATE]: 'upravil typ tělesa',
                [Operation.DELETE]: 'odebral typ tělesa'
            },
            [ApprovalState.DISAPPROVED]: {
                [Operation.ADD]: 'navrhl typ tělesa',
                [Operation.UPDATE]: 'navrhl úpravu typu tělesa',
                [Operation.DELETE]: 'navrhl odebrání typu tělesa'
            }
        },
        [SubjectType.BODY]: {
            [ApprovalState.UNAPPROVED]: {
                [Operation.ADD]: 'navrhl těleso',
                [Operation.UPDATE]: 'navrhl úpravu tělesa',
                [Operation.DELETE]: 'navrhl odebrání tělesa'
            },
            [ApprovalState.APPROVED]: {
                [Operation.ADD]: 'přidal těleso',
                [Operation.UPDATE]: 'upravil těleso',
                [Operation.DELETE]: 'odebral těleso'
            },
            [ApprovalState.DISAPPROVED]: {
                [Operation.ADD]: 'navrhl typ tělesa',
                [Operation.UPDATE]: 'navrhl úpravu typu tělesa',
                [Operation.DELETE]: 'navrhl odebrání typu tělesa'
            }
        }

    },

    editor: {
        add: '＋',
        update: '',
        delete: ''

    },

    user: {
        reputation: 'Reputace',
        female: 'Žena',
        male: 'Muž',
        from: 'Registrace',
        lastOnline: 'Naposled',
        now: 'Právě aktivní',
        admin: 'Administrátor',
        authenticated: 'Registrovaný uživatel',
        human: 'Člověk',

        votes: {
            in: 'Rozdané hlasy',
            out: 'Přijaté hlasy',
            positive: 'Kladné',
            negative: 'Záporné'
        },

        posts: 'Příspěvky',

        name: 'Jméno',
        born: 'Narození',
        sex: 'Pohlaví',
        publicEmail: 'Veřejný email',
        website: 'Webové stránky',
        facebook: 'Facebook',
        about: 'O mně',
        role: 'Role',
        password: 'Nové heslo',
        home: 'Domov',
        invalidPassword: 'Heslo musí mít 6+ znaků.',
        avatar: 'Avatar',
        inactive: 'Deaktivovaný'

    },

    about: {
        title: 'Universis',
        articles: [
            {
                title: 'O projektu',
                text: 'Účelem této webové aplikace je 3D vizualizace těles ve vesmíru v reálném čase. Projekt vznikl jako bakalářská práce roku 2019 na fakultě FEI pardubické univerzity. Autorem je Michal Struna.',
                image: 'Simulator.png'
            },
            {
                title: 'Nastavení',
                text: 'Emulátor, v němž se tělesa zobrazují, je možné ovlivnit mnohými nastaveními. Patří mezi ně např. zrychlování či obracení běhu času, zobrazení orbit těles a v neposlední řadě také popisky těles. Ty mimo názvu samotného tělesa mohou obsahovat užitečné informace jako aktuální vzdálenost od Země nebo okamžitá rychlost pohybu.',
                image: 'Body.png'
            },
            {
                title: 'Databáze',
                text: 'Aplikace obsahuje bohatou databázi těles, ve které je možné libovolně vyhledávat. Jednotlivé položky lze filtrovat podle názvu nebo jakéhokoliv jiného údaje. Výsledky je možno zobrazit absolutně (např. průměr Slunce je 1 392 684 km) nebo relativně ku jakémukoliv jinému tělesu (např. průměr Slunce je roven 109 průměrům Země).',
                image: 'Database.png'
            },
            {
                title: 'Časová osa',
                text: 'U každého tělesa se nachází časová osa zobrazující události daného tělesa z minulosti. Po najetí kurzorem myši nad událost se zobrazí i podrobnější informace.',
                image: 'Timeline.png'
            },
            {
                title: 'Diskuse',
                text: 'Uživatelé spolu mohou komunikovat prostřednictvím diskusí, které lze zakládat v rámci jednotlivých těles. Přihlášení členové navíc mohou příspěvky ostatních i hodnotit.',
                image: 'Discussion.png'
            },
            {
                title: 'Úprava obsahu',
                text: 'Každý uživatel má možnost podílet se na obsahu aplikace. Pokud tedy budete chtít přidat nebo opravit některé informace v aplikaci, můžete je skrze editační formulář odeslat. Administrátor vámi navrhnuté změny posoudí a pokud je schválí, uvidí je všichni uživatelé.',
                image: 'Approval.png'
            },
            {
                title: 'Technologie',
                text: 'Frontend je vytvořen v TypeScriptu za využití knihovny React. Stylování je řešeno v CSS preprocesoru SASS. Veškerá 3D grafika je vytvořena s pomocí knihovny THREE.js. Serverová část je vytvořena taktéž v TypeScriptu, tentokrát ovšem za využití frameworku Node.js. Data jsou ukládána do databáze MongoDB, se kterou se pracuje pomocí knihovny Mongoose. Komunikaci uživatelů v reálném čase zprostředkovává knihovna Socket.io.',
                image: 'User.png'
            },
            {
                title: 'Cizí zdroje',
                text: 'Textury těles ani ikony použité v aplikace nevytvořil autor. Textury jsou brány ze zdrojů dovolujících jejich volné využívání. Ikony jsou převzaty z webu <a href="https://www.flaticon.com" target="_blank">flaticon.com</a>, který umožňuje ve verzi zdarma používat obrázky pod licencí <a href="http://creativecommons.org/licenses/by/3.0/" target="_blank">CC 3.0 BY</a>. Konkrétními autory grafických souborů jsou <a href="https://www.freepik.com" target="_blank">Freepik</a> (10), <a href="https://www.flaticon.com/authors/google" target="_blank">Google</a> (2), <a href="https://www.flaticon.com/authors/stephen-hutchings" target="_blank">Stephen Hutchings</a>, <a href="https://www.flaticon.com/authors/smashicons" target="_blank">Smashicons</a>, <a href="https://www.flaticon.com/authors/yannick" target="_blank">Yannick</a>, <a href="https://www.flaticon.com/authors/dave-gandy" target="_blank">Dave Gandy</a>, <a href="https://www.flaticon.com/authors/bqlqn" title="bqlqn">bqlqn</a>,  <a href="https://www.flaticon.com/authors/robin-kylander" target="_blank">Robin Kylander</a>, <a href="https://www.flaticon.com/authors/cursor-creative" target="_blank">Cursor Creative</a>, <a href="https://www.flaticon.com/authors/kiranshastry" target="_blank">Kiranshastry</a>, <a href="https://www.flaticon.com/authors/good-ware" target="_blank">Good Ware</a>, <a href="https://www.flaticon.com/authors/lucy-g" target="_blank">Lucy G</a>, <a href="https://www.flaticon.com/authors/dave-gandy" target="_blank">Dave Gandy</a>, <a href="https://www.flaticon.com/authors/eucalyp" target="_blank">Eucalyp</a> a <a href="https://www.flaticon.com/authors/gregor-cresnar" target="_blank">Gregor Cresnar</a>. Autor této aplikace neručí za obsah, který nahrají uživatelé.'
            }
        ]
    }

}