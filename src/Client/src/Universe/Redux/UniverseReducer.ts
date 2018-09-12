import ActionTypes from './ActionTypes'
import { Redux } from '../../Utils'

export default Redux.createReducer(
    {
        viewSize: 1,
        bodies: {
            payload: JSON.parse('[{"_id":"5b6ef2544ca9f558f17df5f3","diameter":{"equatorial":8.8e+23,"polar":8.8e+23},"orbit":{"apocenter":0,"pericenter":0,"eccentricity":0,"inclination":0,"startAngle":0,"period":0},"name":"Vesmír","period":0,"rings":[],"texture":"Universe.jpg","tilt":0,"type":{"_id":"5b6ef1f84ca9f558f17d9426","name":"Spirální galaxie","emissiveColor":0}},{"_id":"5b6ef2544ca9f558f17df5f4","diameter":{"equatorial":"946100000000000000","polar":"94610000000000000"},"orbit":{"apocenter":0,"pericenter":0,"eccentricity":0,"inclination":0,"startAngle":0,"period":0},"name":"Mléčná dráha","period":0,"rings":[],"texture":"MilkyWay.png","tilt":0,"parentId":"5b6ef2544ca9f558f17df5f3","type":{"_id":"5b6ef1f84ca9f558f17d9426","name":"Spirální galaxie","emissiveColor":0}},{"_id":"5b6ef3ba4ca9f558f17fb8aa","diameter":{"equatorial":1392684,"polar":1392684},"orbit":{"apocenter":"245986000000000000","pericenter":"245986000000000000","eccentricity":0,"inclination":0,"startAngle":0,"period":226000000},"name":"Slunce","period":25.38,"rings":[],"texture":"Sun.jpg","tilt":0,"parentId":"5b6ef2544ca9f558f17df5f4","type":{"_id":"5b6eacd24ca9f558f1379815","name":"Žlutý trpaslík","emissiveColor":11184810}},{"_id":"5b6ef3c64ca9f558f17fc79f","diameter":{"equatorial":4879.4,"polar":4879.4},"orbit":{"apocenter":69817079,"pericenter":46001272,"eccentricity":0.20563069,"inclination":3.38,"startAngle":0,"period":0.240847},"name":"Merkur","period":58.6462,"rings":[],"texture":"Mercury.jpg","tilt":0.01,"parentId":"5b6ef3ba4ca9f558f17fb8aa","type":{"_id":"5b6ead074ca9f558f137d012","name":"Terestrická planeta"}},{"_id":"5b6ef3d34ca9f558f17fdc3b","diameter":{"equatorial":15,"polar":8},"orbit":{"apocenter":5248192475,"pericenter":87664352,"eccentricity":0.96714,"inclination":162.26,"startAngle":0,"period":75.32},"name":"Halleyova kometa","period":7.4,"rings":[],"texture":"Mercury.jpg","tilt":0,"parentId":"5b6ef3ba4ca9f558f17fb8aa","type":{"_id":"5b6ed4be4ca9f558f15f766f","name":"Krátkoperiodická kometa"}},{"_id":"5b6ef3e04ca9f558f1800077","diameter":{"equatorial":1020,"polar":1020},"orbit":{"apocenter":134686496600,"pericenter":11380829010,"eccentricity":0.8442,"inclination":11.92872,"startAngle":0,"period":11400},"name":"Sedna","period":0.428,"rings":[],"texture":"Mercury.jpg","tilt":0,"parentId":"5b6ef3ba4ca9f558f17fb8aa","type":{"_id":"5b6ed9d14ca9f558f164d7c3","name":"Planetka"}},{"_id":"5b7447a24ca9f558f179bd0f","diameter":{"equatorial":12104,"polar":12104},"orbit":{"apocenter":108941849,"pericenter":107476002,"eccentricity":0.00677323,"inclination":3.86,"startAngle":0,"period":0.6151977},"name":"Venuše","period":243.0185,"rings":[],"texture":"Venus.jpg","tilt":2.64,"parentId":"5b6ef3ba4ca9f558f17fb8aa","type":{"_id":"5b6ead074ca9f558f137d012","name":"Terestrická planeta"}},{"_id":"5b7448344ca9f558f179ff50","diameter":{"equatorial":12756,"polar":12713},"orbit":{"apocenter":152097701,"pericenter":147098074,"eccentricity":0.01671022,"inclination":7.25,"startAngle":0,"period":1},"name":"Země","period":1,"rings":[],"texture":"Earth.jpg","tilt":23.439281,"parentId":"5b6ef3ba4ca9f558f17fb8aa","type":{"_id":"5b6ead074ca9f558f137d012","name":"Terestrická planeta"}},{"_id":"5b7449854ca9f558f17aab4d","diameter":{"equatorial":6792,"polar":6752},"orbit":{"apocenter":249228730,"pericenter":206644545,"eccentricity":0.09341233,"inclination":5.65,"startAngle":0,"period":1.8808},"name":"Mars","period":1.026,"rings":[],"texture":"Mars.jpg","tilt":25.19,"parentId":"5b6ef3ba4ca9f558f17fb8aa","type":{"_id":"5b6ead074ca9f558f137d012","name":"Terestrická planeta"}},{"_id":"5b744ae94ca9f558f17b50bf","diameter":{"equatorial":142984,"polar":133709},"orbit":{"apocenter":816081455,"pericenter":740742598,"eccentricity":0.04839266,"inclination":6.09,"startAngle":0,"period":11.8618},"name":"Jupiter","period":0.41351,"rings":[],"texture":"Jupiter.jpg","tilt":3.13,"parentId":"5b6ef3ba4ca9f558f17fb8aa","type":{"_id":"5b6ead184ca9f558f137d752","name":"Plynný obr"}},{"_id":"5b7455ac4ca9f558f180b6b8","diameter":{"equatorial":120536,"polar":108728},"orbit":{"apocenter":1503983449,"pericenter":1349467375,"eccentricity":0.0541506,"inclination":5.51,"startAngle":0,"period":29.45},"name":"Saturn","period":0.440428241,"rings":[],"texture":"Saturn.jpg","tilt":26.73,"parentId":"5b6ef3ba4ca9f558f17fb8aa","type":{"_id":"5b6ead184ca9f558f137d752","name":"Plynný obr"}},{"_id":"5b7457054ca9f558f18151b4","diameter":{"equatorial":51118,"polar":49946},"orbit":{"apocenter":3006389405,"pericenter":2735555035,"eccentricity":0.04716771,"inclination":6.48,"startAngle":0,"period":84.07},"name":"Uran","period":0.718,"rings":[],"texture":"Uranus.jpg","tilt":97.77,"parentId":"5b6ef3ba4ca9f558f17fb8aa","type":{"_id":"5b6ead184ca9f558f137d752","name":"Plynný obr"}},{"_id":"5b74580c4ca9f558f181d99d","diameter":{"equatorial":49528,"polar":48681},"orbit":{"apocenter":4553946490,"pericenter":4452940833,"eccentricity":0.011214269,"inclination":6.43,"startAngle":0,"period":146.79},"name":"Neptun","period":0.67125,"rings":[],"texture":"Neptune.jpg","tilt":28.32,"parentId":"5b6ef3ba4ca9f558f17fb8aa","type":{"_id":"5b6ead184ca9f558f137d752","name":"Plynný obr"}},{"_id":"5b7458be4ca9f558f1823568","diameter":{"equatorial":50,"polar":70},"orbit":{"apocenter":55470890196,"pericenter":136732453,"eccentricity":0.995086,"inclination":89.4,"startAngle":0,"period":2533},"name":"Hale-Bopp","period":0.67125,"rings":[],"texture":"Mercury.jpg","tilt":0,"parentId":"5b6ef3ba4ca9f558f17fb8aa","type":{"_id":"5b6ed9ca4ca9f558f164d4ec","name":"Dlouhoperiodická planeta"}},{"_id":"5b745be24ca9f558f183b9a5","diameter":{"equatorial":100,"polar":100},"orbit":{"apocenter":10471850900000,"pericenter":29470780,"eccentricity":0.99997,"inclination":43.0664,"startAngle":0,"period":558000},"name":"West","period":0,"rings":[],"texture":"Mercury.jpg","tilt":0,"parentId":"5b6ef3ba4ca9f558f17fb8aa","type":{"_id":"5b6ed9ca4ca9f558f164d4ec","name":"Dlouhoperiodická planeta"}},{"_id":"5b745e194ca9f558f184d098","diameter":{"equatorial":4.2,"polar":4.2},"orbit":{"apocenter":510128736700,"pericenter":34437235,"eccentricity":0.9998946,"inclination":124.92246,"startAngle":0,"period":70000},"name":"Hyakutake","period":0.25,"rings":[],"texture":"Mercury.jpg","tilt":0,"parentId":"5b6ef3ba4ca9f558f17fb8aa","type":{"_id":"5b6ed9ca4ca9f558f164d4ec","name":"Dlouhoperiodická planeta"}},{"_id":"5b745efe4ca9f558f1855f23","diameter":{"equatorial":4.1,"polar":1.8},"orbit":{"apocenter":850150000,"pericenter":185980000,"eccentricity":0.64102,"inclination":7.0405,"startAngle":0,"period":6.44},"name":"Churyumov–Gerasimenko","period":0.25,"rings":[],"texture":"Mercury.jpg","tilt":0,"parentId":"5b6ef3ba4ca9f558f17fb8aa","type":{"_id":"5b6ed4be4ca9f558f15f766f","name":"Krátkoperiodická kometa"}},{"_id":"5b7460684ca9f558f1861999","diameter":{"equatorial":2376,"polar":2376},"orbit":{"apocenter":7375922980,"pericenter":4436773628,"eccentricity":0.2488,"inclination":11.86,"startAngle":0,"period":248},"name":"Pluto","period":6.38723,"rings":[],"texture":"Mercury.jpg","tilt":122.53,"parentId":"5b6ef3ba4ca9f558f17fb8aa","type":{"_id":"5b745fa94ca9f558f185c1b5","name":"Trpasličí planeta"}},{"_id":"5b74622d4ca9f558f186fae7","diameter":{"equatorial":2326,"polar":2326},"orbit":{"apocenter":14608381603,"pericenter":5671404849,"eccentricity":0.44068,"inclination":44.0445,"startAngle":0,"period":558.04},"name":"Eris","period":1.079,"rings":[],"texture":"Mercury.jpg","tilt":0,"parentId":"5b6ef3ba4ca9f558f17fb8aa","type":{"_id":"5b745fa94ca9f558f185c1b5","name":"Trpasličí planeta"}},{"_id":"5b7730494ca9f558f1cfe80b","diameter":{"equatorial":27,"polar":18},"orbit":{"apocenter":9517,"pericenter":9234,"eccentricity":0.0151,"inclination":1.093,"startAngle":0,"period":0.000873},"name":"Phobos","period":0.31891023,"rings":[],"texture":"Moon.jpg","tilt":0,"parentId":"5b7449854ca9f558f17aab4d","type":{"_id":"5b6ead2a4ca9f558f137ddd4","name":"Měsíc"}},{"_id":"5b7733f34ca9f558f1d17e8b","diameter":{"equatorial":15,"polar":11},"orbit":{"apocenter":23471,"pericenter":23456,"eccentricity":0.00033,"inclination":0.93,"startAngle":0,"period":0.003457},"name":"Deimos","period":1.263,"rings":[],"texture":"Moon.jpg","tilt":0,"parentId":"5b7449854ca9f558f17aab4d","type":{"_id":"5b6ead2a4ca9f558f137ddd4","name":"Měsíc"}},{"_id":"5b7804934ca9f558f12783b3","diameter":{"equatorial":59.8,"polar":18.6},"orbit":{"apocenter":445700000,"pericenter":410300000,"eccentricity":0.0411,"inclination":1.132,"startAngle":0,"period":4.83955},"name":"Ida","period":0.193,"rings":[],"texture":"Moon.jpg","tilt":0,"parentId":"5b6ef3ba4ca9f558f17fb8aa","type":{"_id":"5b6ed9d14ca9f558f164d7c3","name":"Planetka"}},{"_id":"5b7806314ca9f558f128303f","diameter":{"equatorial":1.6,"polar":1.2},"orbit":{"apocenter":140,"pericenter":115,"eccentricity":0,"inclination":8,"startAngle":0,"period":0.00228},"name":"Dactyl","period":0.833,"rings":[],"texture":"Moon.jpg","tilt":0,"parentId":"5b7804934ca9f558f12783b3","type":{"_id":"5b6ead2a4ca9f558f137ddd4","name":"Měsíc"}},{"_id":"5b78a3934ca9f558f16d65cb","diameter":{"equatorial":1392684,"polar":1392684},"orbit":{"apocenter":"245967078000000000","pericenter":"245967078000000000","eccentricity":0,"inclination":0,"startAngle":0,"period":226000000},"name":"Proxima Centauri","period":25.38,"rings":[],"texture":"Sun.jpg","tilt":0,"parentId":"5b6ef2544ca9f558f17df5f4","type":{"_id":"5b6eacd24ca9f558f1379815","name":"Žlutý trpaslík","emissiveColor":11184810}}]')
        }
    },
    (state, action) => {
        switch (action.type) {
            case ActionTypes.CHANGE_VIEW_SIZE:
                return {
                    ...state,
                    viewSize: action.viewSize
                }
        }
    }
)