db = db.getSiblingDB("universis")

db.getCollection('approvals').drop()
db.getCollection('approvals').insert(
    [ ]
)

db.getCollection('bodies').drop()
db.getCollection('bodies').insert(
    [
        {
            "_id" : ObjectId("5bdedf97c719d246388b7324"),
            "diameter" : {
                "x" : 946100000000000000,
                "y" : 946100000000000000,
                "z" : 94610000000000000
            },
            "name" : "Mléčná dráha",
            "temperature" : {
                "inner" : 2.7
            },
            "axis" : {
                "period" : 0,
                "tilt" : 0
            },
            "position" : {
                "alpha" : 0,
                "beta" : 0,
                "distance" : 0
            },
            "mass" : 6e+42,
            "composition" : [
                {
                    "_id" : ObjectId("5bdedf97c719d246388b7328"),
                    "element" : "DE",
                    "percentage" : 71.4
                },
                {
                    "_id" : ObjectId("5bdedf97c719d246388b7327"),
                    "element" : "DM",
                    "percentage" : 24
                },
                {
                    "_id" : ObjectId("5bdedf97c719d246388b7326"),
                    "element" : "H",
                    "percentage" : 0.03
                },
                {
                    "_id" : ObjectId("5bdedf97c719d246388b7325"),
                    "element" : "He",
                    "percentage" : 0.0092
                },
                {
                    "_id" : ObjectId("5bdedf97c719d246388b7324"),
                    "element" : "O",
                    "percentage" : 0.0004
                }
            ],
            "typeId" : ObjectId("5b6ef1f83ca9f558f17d9426"),
            "parentId" : ObjectId("5bdedf97c719d246388b7323"),
            "rings" : [ ],
            "discover" : {

            },
            "magnitude" : {

            },
            "__v" : 0,
            "particles" : {
                "count" : 10000,
                "thickness" : 100000000000000000
            },
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8db9a76"),
            "name" : "Slunce",
            "diameter" : {
                "x" : 1392684
            },
            "mass" : 1.9891e+30,
            "magnitude" : {
                "relative" : -26.74,
                "absolute" : 4.83
            },
            "temperature" : {
                "inner" : 15000000,
                "outer" : 5778
            },
            "axis" : {
                "period" : 25.38,
                "tilt" : 67.23
            },
            "composition" : [
                {
                    "_id" : ObjectId("5be60eee4143ef4fd8db9a80"),
                    "element" : "H",
                    "percentage" : 73.46
                },
                {
                    "_id" : ObjectId("5be60eee4143ef4fd8db9a7f"),
                    "element" : "He",
                    "percentage" : 24.85
                },
                {
                    "_id" : ObjectId("5be60eee4143ef4fd8db9a7e"),
                    "element" : "O",
                    "percentage" : 0.77
                },
                {
                    "_id" : ObjectId("5be60eee4143ef4fd8db9a7d"),
                    "element" : "C",
                    "percentage" : 0.29
                },
                {
                    "_id" : ObjectId("5be60eee4143ef4fd8db9a7c"),
                    "element" : "Fe",
                    "percentage" : 0.16
                },
                {
                    "_id" : ObjectId("5be60eee4143ef4fd8db9a7b"),
                    "element" : "Ne",
                    "percentage" : 0.12
                },
                {
                    "_id" : ObjectId("5be60eee4143ef4fd8db9a7a"),
                    "element" : "N",
                    "percentage" : 0.09
                },
                {
                    "_id" : ObjectId("5be60eee4143ef4fd8db9a79"),
                    "element" : "SI",
                    "percentage" : 0.07
                },
                {
                    "_id" : ObjectId("5be60eee4143ef4fd8db9a78"),
                    "element" : "Mg",
                    "percentage" : 0.05
                },
                {
                    "_id" : ObjectId("5be60eee4143ef4fd8db9a77"),
                    "element" : "S",
                    "percentage" : 0.04
                }
            ],
            "rings" : [ ],
            "typeId" : ObjectId("5b6eacd24ca9f558f1379815"),
            "parentId" : ObjectId("5bdedf97c719d246388b7324"),
            "discover" : {

            },
            "position" : {
                "alpha" : 0,
                "beta" : 0,
                "distance" : 0
            },
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "name" : "Země",
            "diameter" : {
                "x" : 12756,
                "y" : 12713,
                "z" : 12756
            },
            "mass" : 5.9736e+24,
            "magnitude" : {

            },
            "temperature" : {
                "inner" : 5800,
                "outer" : 287
            },
            "axis" : {
                "period" : 0.997258,
                "tilt" : 23.439281
            },
            "composition" : [
                {
                    "_id" : ObjectId("5cce85be69c14f0ee906d9b5"),
                    "element" : "Fe",
                    "percentage" : 34.1
                },
                {
                    "_id" : ObjectId("5cce85be69c14f0ee906d9b4"),
                    "element" : "O",
                    "percentage" : 28.2
                },
                {
                    "_id" : ObjectId("5cce85be69c14f0ee906d9b3"),
                    "element" : "Si",
                    "percentage" : 17.2
                },
                {
                    "_id" : ObjectId("5cce85be69c14f0ee906d9b2"),
                    "element" : "Mg",
                    "percentage" : 15.9
                },
                {
                    "_id" : ObjectId("5cce85be69c14f0ee906d9b1"),
                    "element" : "Ni",
                    "percentage" : 1.6
                },
                {
                    "_id" : ObjectId("5cce85be69c14f0ee906d9b0"),
                    "element" : "Ca",
                    "percentage" : 1.6
                },
                {
                    "_id" : ObjectId("5cce85be69c14f0ee906d9af"),
                    "element" : "Al",
                    "percentage" : 1.5
                },
                {
                    "_id" : ObjectId("5cce85be69c14f0ee906d9ae"),
                    "element" : "S",
                    "percentage" : 0.7
                },
                {
                    "_id" : ObjectId("5cce85be69c14f0ee906d9ad"),
                    "element" : "Na",
                    "percentage" : 0.25
                },
                {
                    "_id" : ObjectId("5cce85be69c14f0ee906d9ac"),
                    "element" : "Ti",
                    "percentage" : 0.071
                },
                {
                    "_id" : ObjectId("5cce85be69c14f0ee906d9ab"),
                    "element" : "K",
                    "percentage" : 0.019
                }
            ],
            "rings" : [
                {
                    "_id" : ObjectId("5caa3a869b717e45ae95c282"),
                    "texture" : "",
                    "diameter" : {
                        "min" : null,
                        "max" : null
                    }
                }
            ],
            "texture" : "Earth.jpg",
            "typeId" : ObjectId("5b6ead074ca9f558f137d012"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a76"),
            "discover" : {

            },
            "orbit" : {
                "eccentricity" : 0.01671022,
                "inclination" : 7.25,
                "apsis" : 152097701,
                "periapsis" : 147098074,
                "rotation" : 0,
                "initialDate" : 1493642520000
            },
            "__v" : 0,
            "albedo" : 0.367,
            "description" : "Země je jedinou planetou, na které je potvrzena existence života. Jedná se o největší terestickou planetu a o nejhustší planetu ve sluneční soustavě. Povrch je více jak ze dvou třetin tvořen vodou.",
            "atmosphere" : {
                "pressure" : 101325,
                "composition" : [
                    {
                        "_id" : ObjectId("5cce85be69c14f0ee906d9ba"),
                        "element" : "N",
                        "percentage" : 78.08
                    },
                    {
                        "_id" : ObjectId("5cce85be69c14f0ee906d9b9"),
                        "element" : "O",
                        "percentage" : 20.95
                    },
                    {
                        "_id" : ObjectId("5cce85be69c14f0ee906d9b8"),
                        "element" : "Ar",
                        "percentage" : 0.93
                    },
                    {
                        "_id" : ObjectId("5cce85be69c14f0ee906d9b7"),
                        "element" : "CO2",
                        "percentage" : 0.033
                    }
                ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8db9a78"),
            "name" : "Merkur",
            "diameter" : {
                "x" : 4879,
                "y" : 4879,
                "z" : 4879
            },
            "mass" : 3.302e+23,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 440
            },
            "axis" : {
                "period" : 58.6462,
                "tilt" : 0.01
            },
            "composition" : [
                {
                    "_id" : ObjectId("5cd293bdcb972b2f05314a08"),
                    "element" : "K",
                    "percentage" : 31.7
                },
                {
                    "_id" : ObjectId("5cd293bdcb972b2f05314a07"),
                    "element" : "Na",
                    "percentage" : 24.09
                },
                {
                    "_id" : ObjectId("5cd293bdcb972b2f05314a06"),
                    "element" : "O",
                    "percentage" : 9.5
                },
                {
                    "_id" : ObjectId("5cd293bdcb972b2f05314a05"),
                    "element" : "Ar",
                    "percentage" : 5.9
                },
                {
                    "_id" : ObjectId("5cd293bdcb972b2f05314a04"),
                    "element" : "He",
                    "percentage" : 5.9
                },
                {
                    "_id" : ObjectId("5cd293bdcb972b2f05314a03"),
                    "element" : "N",
                    "percentage" : 5.2
                }
            ],
            "rings" : [ ],
            "texture" : "Mercury.jpg",
            "typeId" : ObjectId("5b6ead074ca9f558f137d012"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a76"),
            "discover" : {

            },
            "orbit" : {
                "eccentricity" : 0.20563069,
                "inclination" : 3.38,
                "apsis" : 69817079,
                "periapsis" : 46001272,
                "initialDate" : 1490280840000,
                "rotation" : 62.5
            },
            "__v" : 0,
            "atmosphere" : {
                "composition" : [
                    {
                        "_id" : ObjectId("5cd293bdcb972b2f05314a0d"),
                        "element" : "O",
                        "percentage" : 42
                    },
                    {
                        "_id" : ObjectId("5cd293bdcb972b2f05314a0c"),
                        "element" : "Na",
                        "percentage" : 29
                    },
                    {
                        "_id" : ObjectId("5cd293bdcb972b2f05314a0b"),
                        "element" : "H",
                        "percentage" : 22
                    },
                    {
                        "_id" : ObjectId("5cd293bdcb972b2f05314a0a"),
                        "element" : "He",
                        "percentage" : 6
                    },
                    {
                        "_id" : ObjectId("5cd293bdcb972b2f05314a09"),
                        "element" : "K",
                        "percentage" : 0.5
                    }
                ],
                "pressure" : 1e-9
            },
            "description" : "Merkur je nejmenší a zároveň Slunci nejbližší planetou sluneční soustavy. Kvůli nízké gravitaci a slunečnímu větru zmizela většina atmosféry, ze které dnes zbývá pouze velmi tenká vrstva."
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8db9a79"),
            "name" : "Venuše",
            "diameter" : {
                "x" : 12103,
                "y" : 12103,
                "z" : 12103
            },
            "mass" : 4.8685e+24,
            "magnitude" : {
                "relative" : -4.4
            },
            "temperature" : {
                "outer" : 737
            },
            "axis" : {
                "period" : 243.0185,
                "tilt" : 2.64
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : "Venus.jpg",
            "typeId" : ObjectId("5b6ead074ca9f558f137d012"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a76"),
            "discover" : {

            },
            "orbit" : {
                "eccentricity" : 0.00677323,
                "inclination" : 3.86,
                "apsis" : 108941849,
                "periapsis" : 107476002,
                "rotation" : 147.5,
                "initialDate" : 1493642520000
            },
            "__v" : 0,
            "atmosphere" : {
                "pressure" : 9119250,
                "composition" : [
                    {
                        "_id" : ObjectId("5cd29d68d5e39f3bc88f12c2"),
                        "element" : "CO2",
                        "percentage" : 96.5
                    },
                    {
                        "_id" : ObjectId("5cd29d68d5e39f3bc88f12c1"),
                        "element" : "N",
                        "percentage" : 3.5
                    }
                ]
            },
            "description" : "Venuše je druhá planeta od Slunce. I když je od něj dvakrát dál než Merkur, její povrch je kvůli skleníkovým plynům v její husté atmosféře mnohem teplejší. Velikostí je podobná Zemi, ale podmínky pro život zde nejsou.",
            "albedo" : 0.6
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8db9a80"),
            "name" : "Měsíc",
            "diameter" : {
                "x" : 3476,
                "y" : 3472
            },
            "mass" : 7.347673e+22,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 250
            },
            "axis" : {
                "period" : 27.321582,
                "tilt" : 1.5424
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : "Moon.jpg",
            "typeId" : ObjectId("5b6ead074ca9f558f137d012"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "discover" : {

            },
            "orbit" : {
                "eccentricity" : 0.0549,
                "inclination" : 28.6,
                "startAngle" : 0,
                "period" : 0.0748,
                "apsis" : 405503,
                "periapsis" : 363295,
                "initialDate" : 1493642520000
            },
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8db9a81"),
            "name" : "Mars",
            "diameter" : {
                "x" : 6792,
                "y" : 6752
            },
            "mass" : 6.4185e+23,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 210
            },
            "axis" : {
                "period" : 1.026,
                "tilt" : 25.19
            },
            "composition" : [
                {
                    "element" : "CO2",
                    "percentage" : 95.32
                },
                {
                    "element" : "N",
                    "percentage" : 2.7
                },
                {
                    "element" : "Ar",
                    "percentage" : 1.16
                }
            ],
            "rings" : [ ],
            "texture" : "Mars.jpg",
            "typeId" : ObjectId("5b6ead074ca9f558f137d012"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a76"),
            "discover" : {

            },
            "orbit" : {
                "eccentricity" : 0.09341233,
                "inclination" : 5.65,
                "initialDate" : NumberLong("1537109640000"),
                "period" : 1.8808,
                "apsis" : 249228730,
                "periapsis" : 206664545,
                "rotation" : 290.9
            },
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8db9a82"),
            "name" : "Jupiter",
            "diameter" : {
                "x" : 142984,
                "y" : 133709
            },
            "mass" : 1.899e+27,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : -152
            },
            "axis" : {
                "period" : 0.41351,
                "tilt" : 3.13
            },
            "composition" : [
                {
                    "element" : "H",
                    "percentage" : 86
                },
                {
                    "element" : "He",
                    "percentage" : 14
                }
            ],
            "rings" : [ ],
            "texture" : "Jupiter.jpg",
            "typeId" : ObjectId("5b6ead184ca9f558f137d752"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a76"),
            "discover" : {

            },
            "orbit" : {
                "eccentricity" : 0.04839266,
                "inclination" : 6.09,
                "initialDate" : NumberLong("1674218520000"),
                "period" : 11.8618,
                "apsis" : 816081455,
                "periapsis" : 740742598,
                "rotation" : 273.8
            },
            "__v" : 0,
            "description" : "Jupiter je největší planeta sluneční soustavy, v pořadí pátá od Slunce. Je 3krát hmotnější, než všechny ostatní planety sluneční soustavy dohromady. Symbolickým útvarem je Velká rudá skvrna. Jedná se o bouři dvakrát větší, než Země.",
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8db9a83"),
            "name" : "Saturn",
            "diameter" : {
                "x" : 120536,
                "y" : 108728,
                "z" : 120536
            },
            "mass" : 5.6846e+26,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 134
            },
            "axis" : {
                "period" : 0.440428241,
                "tilt" : 26.73
            },
            "composition" : [
                {
                    "_id" : ObjectId("5ccafd4d3616ca471f2f1650"),
                    "element" : "H",
                    "percentage" : 96
                },
                {
                    "_id" : ObjectId("5ccafd4d3616ca471f2f164f"),
                    "element" : "He",
                    "percentage" : 3
                }
            ],
            "rings" : [
                {
                    "_id" : ObjectId("5ccaf6a7ddbd9a3bf72da380"),
                    "diameter" : {
                        "min" : 133800,
                        "max" : 300000
                    },
                    "texture" : "SaturnRings.jpg"
                }
            ],
            "texture" : "Saturn.jpg",
            "typeId" : ObjectId("5b6ead184ca9f558f137d752"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a76"),
            "discover" : {

            },
            "orbit" : {
                "eccentricity" : 0.0541506,
                "inclination" : 5.51,
                "apsis" : 1503983449,
                "periapsis" : 1349467375,
                "rotation" : 0,
                "initialDate" : 1493642520000
            },
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            },
            "description" : ""
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8db9a84"),
            "name" : "Uran",
            "diameter" : {
                "x" : 51118,
                "y" : 49946
            },
            "mass" : 8.6832e+25,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 68
            },
            "axis" : {
                "period" : 0.718,
                "tilt" : 97.77
            },
            "composition" : [
                {
                    "element" : "H",
                    "percentage" : 83
                },
                {
                    "element" : "He",
                    "percentage" : 15
                },
                {
                    "element" : "CH4",
                    "percentage" : 2
                }
            ],
            "rings" : [ ],
            "texture" : "Uranus.jpg",
            "typeId" : ObjectId("5b6ead184ca9f558f137d752"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a76"),
            "discover" : {

            },
            "orbit" : {
                "eccentricity" : 0.04716771,
                "inclination" : 6.48,
                "period" : 84.07,
                "apsis" : NumberLong("3006389405"),
                "periapsis" : NumberLong("2735555035"),
                "initialDate" : NumberLong("2556187200000")
            },
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8db9a85"),
            "name" : "Neptun",
            "diameter" : {
                "x" : 49528,
                "y" : 48681
            },
            "mass" : 1.0243e+26,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 53
            },
            "axis" : {
                "period" : 0.67125,
                "tilt" : 28.32
            },
            "composition" : [
                {
                    "element" : "H",
                    "percentage" : 80
                },
                {
                    "element" : "He",
                    "percentage" : 19
                },
                {
                    "element" : "CH4",
                    "percentage" : 1.5
                }
            ],
            "rings" : [ ],
            "texture" : "Neptune.jpg",
            "typeId" : ObjectId("5b6ead184ca9f558f137d752"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a76"),
            "discover" : {
                "date" : "1846-09-23T00:00:00.000Z"
            },
            "orbit" : {
                "eccentricity" : 0.011214269,
                "inclination" : 6.43,
                "startAngle" : 0,
                "period" : 164.79,
                "apsis" : NumberLong("4553946490"),
                "periapsis" : NumberLong("4452940833"),
                "initialDate" : 1493642520000
            },
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8db9a86"),
            "name" : "Pluto",
            "diameter" : {
                "x" : 2370,
                "y" : 2370
            },
            "mass" : 1.305e+22,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 33
            },
            "axis" : {
                "period" : 6.387,
                "tilt" : 119.591
            },
            "composition" : [ ],
            "rings" : [ ],
            "typeId" : ObjectId("5b745fa94ca9f558f185c1b5"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a76"),
            "discover" : {

            },
            "orbit" : {
                "eccentricity" : 0.246918,
                "inclination" : 17.155,
                "startAngle" : 0,
                "period" : 247.41,
                "apsis" : NumberLong("7348097870"),
                "periapsis" : NumberLong("4437000000"),
                "initialDate" : 1493642520000
            },
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5bdedf97c719d246388b7323"),
            "diameter" : {
                "x" : 8.8e+23
            },
            "temperature" : {
                "inner" : 2.73
            },
            "axis" : {
                "period" : 0,
                "tilt" : 0
            },
            "position" : {
                "alpha" : 0,
                "beta" : 0,
                "distance" : 0
            },
            "name" : "Vesmír",
            "mass" : 3e+55,
            "composition" : [ ],
            "texture" : "Universe.jpg",
            "typeId" : ObjectId("5b6ef1f84ca9f558f17d9430"),
            "rings" : [ ],
            "discover" : {

            },
            "magnitude" : {

            },
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8db9b82"),
            "name" : "Metis",
            "diameter" : {
                "x" : 60,
                "y" : 40,
                "z" : 34
            },
            "mass" : 36000000000000000,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 123
            },
            "axis" : {
                "period" : 0.29478,
                "tilt" : 3.13
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : null,
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a82"),
            "discover" : {

            },
            "orbit" : {
                "eccentricity" : 0.0002,
                "inclination" : 6.06,
                "apsis" : 128026,
                "periapsis" : 127974,
                "initialDate" : 1493642520000,
                "rotation" : 0
            },
            "__v" : 0,
            "description" : "",
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5c6d6c5ecd2ad99014121e90"),
            "diameter" : {
                "x" : 27,
                "y" : 21.6,
                "z" : 19.8
            },
            "temperature" : {
                "inner" : 233,
                "outer" : 233
            },
            "axis" : {
                "period" : 0.31891023,
                "tilt" : 0
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "orbit" : {
                "eccentricity" : 0.0151,
                "inclination" : 1.093,
                "apsis" : 9517,
                "periapsis" : 9234,
                "rotation" : 0,
                "initialDate" : 1484861640000
            },
            "magnitude" : {
                "relative" : null,
                "absolute" : null
            },
            "description" : "",
            "name" : "Phobos",
            "mass" : 10700000000000000,
            "albedo" : 0.071,
            "composition" : [ ],
            "rings" : [ ],
            "texture" : "Phobos.jpg",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a81"),
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8db9c77"),
            "name" : "Halleyova kometa",
            "diameter" : {
                "x" : 15,
                "y" : 8
            },
            "mass" : 220000000000000,
            "magnitude" : {
                "relative" : 28.2
            },
            "temperature" : {
                "inner" : 5800,
                "outer" : 287
            },
            "axis" : {
                "period" : 2.2,
                "tilt" : 0
            },
            "composition" : [ ],
            "rings" : [ ],
            "typeId" : ObjectId("5b6ead074ca9f558f137d012"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a76"),
            "discover" : {

            },
            "orbit" : {
                "eccentricity" : 0.96714,
                "inclination" : 162.26,
                "initialDate" : NumberLong("508287600000"),
                "period" : 75.32,
                "rotation" : 0,
                "apsis" : NumberLong("5250885237"),
                "periapsis" : 87664351
            },
            "__v" : 0,
            "albedo" : 0.04,
            "description" : "",
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8dbbc77"),
            "name" : "Sedna",
            "diameter" : {
                "x" : 1500,
                "y" : 1500
            },
            "mass" : 3e+21,
            "magnitude" : {
                "absolute" : 1.58
            },
            "temperature" : {
                "inner" : 23,
                "outer" : 23
            },
            "axis" : {
                "period" : 0.428,
                "tilt" : 0
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : null,
            "typeId" : ObjectId("5b6ead074ca9f558f137d012"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a76"),
            "discover" : {

            },
            "orbit" : {
                "eccentricity" : 0.8442,
                "inclination" : 11.9296,
                "startAngle" : 0,
                "period" : 10787.1,
                "apsis" : NumberLong("134686492870"),
                "periapsis" : NumberLong("11380829010"),
                "initialDate" : 1493642520000
            },
            "albedo" : 0.2,
            "description" : "",
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8db9976"),
            "name" : "Alfa Centauri",
            "diameter" : {
                "x" : 0
            },
            "mass" : 2.188e+30,
            "magnitude" : {

            },
            "temperature" : {

            },
            "axis" : {
                "period" : 0,
                "tilt" : 0
            },
            "composition" : [ ],
            "rings" : [ ],
            "typeId" : ObjectId("5b745fa94ca9f558f185c1b6"),
            "parentId" : ObjectId("5bdedf97c719d246388b7324"),
            "discover" : {

            },
            "position" : {
                "alpha" : 0,
                "beta" : 0,
                "distance" : 41436200000000
            },
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8db9977"),
            "name" : "Proxima Centauri",
            "diameter" : {
                "x" : 1000000000
            },
            "mass" : 1,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 3042
            },
            "axis" : {
                "period" : 82.6,
                "tilt" : 0
            },
            "composition" : [ ],
            "rings" : [ ],
            "typeId" : ObjectId("5b6eacd24ca9f558f1379815"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9976"),
            "discover" : {

            },
            "orbit" : {
                "eccentricity" : 0.5,
                "inclination" : 107.6,
                "initialDate" : -7000000000000000,
                "period" : 547000,
                "apsis" : 2243968100000,
                "periapsis" : NumberLong("149597870000"),
                "rotation" : -35
            },
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8db9978"),
            "name" : "Alfa Centauri A",
            "diameter" : {
                "x" : 1703809
            },
            "mass" : 2.188e+30,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 5790
            },
            "axis" : {
                "period" : 22.6,
                "tilt" : 0
            },
            "composition" : [ ],
            "rings" : [ ],
            "typeId" : ObjectId("5b6eacd24ca9f558f1379815"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9976"),
            "discover" : {

            },
            "orbit" : {
                "eccentricity" : 0.5179,
                "inclination" : 79.205,
                "startAngle" : 0,
                "period" : 79.91,
                "apsis" : NumberLong("2628434576"),
                "periapsis" : NumberLong(262843457),
                "initialDate" : 1493642520000
            },
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8db9979"),
            "name" : "Alfa Centauri B",
            "diameter" : {
                "x" : 1703809
            },
            "mass" : 1.88e+30,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 5790
            },
            "axis" : {
                "period" : 22.6,
                "tilt" : 0
            },
            "composition" : [ ],
            "rings" : [ ],
            "typeId" : ObjectId("5b6eacd24ca9f558f1379815"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9976"),
            "discover" : {

            },
            "orbit" : {
                "eccentricity" : 0.5179,
                "inclination" : 72,
                "startAngle" : 0,
                "period" : 79.91,
                "rotation" : 180,
                "apsis" : NumberLong("4628434576"),
                "periapsis" : NumberLong(462843457),
                "initialDate" : 1493642520000
            },
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8db9980"),
            "name" : "Alfa Centauri Bb",
            "diameter" : {
                "x" : 10000
            },
            "mass" : 1,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 1500
            },
            "axis" : {
                "period" : 0.00885965482,
                "tilt" : 0
            },
            "composition" : [ ],
            "rings" : [ ],
            "typeId" : ObjectId("5b6ead074ca9f558f137d012"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9979"),
            "discover" : {

            },
            "orbit" : {
                "eccentricity" : 0.5179,
                "inclination" : 72,
                "startAngle" : 0,
                "period" : 79.91,
                "rotation" : 180,
                "apsis" : NumberLong(6000000),
                "periapsis" : NumberLong(6000000),
                "initialDate" : 1493642520000
            },
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4153ef4fd8db9b82"),
            "name" : "Sinope",
            "diameter" : {
                "x" : 19
            },
            "mass" : 75000000000000000,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 124
            },
            "axis" : {
                "period" : 0,
                "tilt" : 0
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : null,
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a82"),
            "discover" : {

            },
            "orbit" : {
                "eccentricity" : 0.25,
                "inclination" : 153.12,
                "startAngle" : 0,
                "period" : 1.95,
                "apsis" : 30191200,
                "periapsis" : 18237600,
                "initialDate" : 1493642520000
            },
            "__v" : 0,
            "description" : "",
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd9db9a78"),
            "name" : "Hlavní pás",
            "diameter" : {
                "x" : 1196782960,
                "y" : 100000000
            },
            "magnitude" : {

            },
            "temperature" : {

            },
            "axis" : {

            },
            "composition" : [ ],
            "rings" : [ ],
            "typeId" : ObjectId("5b745fa94ca9f558f185c1b7"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a76"),
            "discover" : {

            },
            "particles" : {
                "thickness" : 299195740,
                "count" : 3000
            },
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd9db9a79"),
            "name" : "Kuiper belt",
            "diameter" : {
                "x" : NumberLong("16455765700"),
                "y" : 1000000000
            },
            "magnitude" : {

            },
            "temperature" : {

            },
            "axis" : {

            },
            "composition" : [ ],
            "rings" : [ ],
            "typeId" : ObjectId("5b745fa94ca9f558f185c1b7"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a76"),
            "discover" : {

            },
            "particles" : {
                "thickness" : NumberLong("3739946750"),
                "count" : 3000
            },
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd9db9a80"),
            "name" : "Trojané",
            "diameter" : {
                "x" : 25000000,
                "y" : 50000000,
                "z" : 25000000
            },
            "magnitude" : {

            },
            "temperature" : {

            },
            "axis" : {

            },
            "composition" : [ ],
            "rings" : [ ],
            "typeId" : ObjectId("5b745fa94ca9f558f185c1b8"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a76"),
            "discover" : {

            },
            "particles" : {
                "count" : 300
            },
            "orbit" : {
                "eccentricity" : 0.04839266,
                "inclination" : 6.09,
                "period" : 11.8618,
                "apsis" : 816081455,
                "periapsis" : 740742598,
                "initialDate" : NumberLong("1737376920000"),
                "rotation" : 273.8
            },
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd9db9a81"),
            "name" : "Řekové",
            "diameter" : {
                "x" : NumberLong(25000000),
                "y" : NumberLong(50000000),
                "z" : NumberLong(25000000)
            },
            "magnitude" : {

            },
            "temperature" : {

            },
            "axis" : {

            },
            "composition" : [ ],
            "rings" : [ ],
            "typeId" : ObjectId("5b745fa94ca9f558f185c1b8"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a76"),
            "discover" : {

            },
            "particles" : {
                "count" : 300
            },
            "orbit" : {
                "eccentricity" : 0.04839266,
                "inclination" : 6.09,
                "period" : 11.8618,
                "apsis" : 816081455,
                "periapsis" : 740742598,
                "initialDate" : NumberLong("1611146520000"),
                "rotation" : 273.8
            },
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd9db9a82"),
            "name" : "Oortův oblak",
            "diameter" : {
                "x" : 44879361000000,
                "y" : 44879361000000,
                "z" : 44879361000000
            },
            "magnitude" : {

            },
            "temperature" : {

            },
            "axis" : {

            },
            "composition" : [ ],
            "rings" : [ ],
            "typeId" : ObjectId("5b745fa94ca9f558f185c1b9"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a76"),
            "discover" : {

            },
            "particles" : {
                "count" : 3000,
                "thickness" : 44280970000000
            },
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5bdedf97c719d246388b7724"),
            "diameter" : {
                "x" : 1461000000000000000,
                "y" : 1461000000000000000,
                "z" : 144610000000000000
            },
            "temperature" : {
                "inner" : 2.7
            },
            "axis" : {
                "period" : 0,
                "tilt" : 120
            },
            "position" : {
                "alpha" : 75,
                "beta" : 5,
                "distance" : 18922000000000000000
            },
            "name" : "Velká galaxie v Andromedě",
            "mass" : 6e+42,
            "composition" : [
                {
                    "_id" : ObjectId("5bdedf97c719d246388b7328"),
                    "element" : "DE",
                    "percentage" : 71.4
                },
                {
                    "_id" : ObjectId("5bdedf97c719d246388b7327"),
                    "element" : "DM",
                    "percentage" : 24
                },
                {
                    "_id" : ObjectId("5bdedf97c719d246388b7326"),
                    "element" : "H",
                    "percentage" : 0.03
                },
                {
                    "_id" : ObjectId("5bdedf97c719d246388b7325"),
                    "element" : "He",
                    "percentage" : 0.0092
                },
                {
                    "_id" : ObjectId("5bdedf97c719d246388b7324"),
                    "element" : "O",
                    "percentage" : 0.0004
                }
            ],
            "typeId" : ObjectId("5b6ef1f84ca9f558f17d9426"),
            "parentId" : ObjectId("5bdedf97c719d246388b7323"),
            "rings" : [ ],
            "discover" : {

            },
            "magnitude" : {

            },
            "__v" : 0,
            "particles" : {
                "count" : 10000,
                "thickness" : 100000000000000000
            },
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5bdedf97c719d246388b7729"),
            "diameter" : {
                "x" : 66227000000000000,
                "y" : 36227000000000000,
                "z" : 56227000000000000
            },
            "temperature" : {

            },
            "axis" : {

            },
            "position" : {
                "alpha" : 90,
                "beta" : 40,
                "distance" : 1892200000000000000
            },
            "name" : "Malé Magellanovo mračno",
            "mass" : 1.4e+43,
            "composition" : [ ],
            "typeId" : ObjectId("5b745fa94ca9f558f185c2b8"),
            "parentId" : ObjectId("5bdedf97c719d246388b7323"),
            "rings" : [ ],
            "discover" : {

            },
            "magnitude" : {

            },
            "__v" : 0,
            "particles" : {
                "count" : 1000
            },
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5bdedf97c719d246388b7730"),
            "diameter" : {
                "x" : 132454000000000000,
                "y" : 83245400000000000
            },
            "temperature" : {

            },
            "axis" : {

            },
            "position" : {
                "alpha" : 150,
                "beta" : 170,
                "distance" : 1542143000000000000
            },
            "name" : "Velké Magellanovo mračno",
            "mass" : 1.4e+43,
            "composition" : [ ],
            "typeId" : ObjectId("5b745fa94ca9f558f185c2b8"),
            "parentId" : ObjectId("5bdedf97c719d246388b7323"),
            "rings" : [ ],
            "discover" : {

            },
            "magnitude" : {

            },
            "__v" : 0,
            "particles" : {
                "count" : 1000
            },
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8df9b00"),
            "name" : "Adrastea",
            "diameter" : {
                "x" : 20,
                "y" : 16,
                "z" : 14
            },
            "mass" : NumberLong("20000000000000000"),
            "magnitude" : {

            },
            "temperature" : {

            },
            "axis" : {
                "period" : 0.29826,
                "tilt" : 3.13,
                "initialDate" : NumberLong("1553335058485")
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : null,
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a82"),
            "discover" : {

            },
            "orbit" : {
                "eccentricity" : 0.0015,
                "inclination" : 0.03,
                "apsis" : 129000,
                "periapsis" : 129000,
                "initialDate" : NumberLong("1553335058485")
            },
            "__v" : 0,
            "description" : "",
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8df9b01"),
            "name" : "Amalthea",
            "diameter" : {
                "x" : 250,
                "y" : 146,
                "z" : 128
            },
            "mass" : 2080000000000000000,
            "magnitude" : {

            },
            "temperature" : {

            },
            "axis" : {
                "period" : 0.49817943,
                "tilt" : 0,
                "initialDate" : NumberLong("1553335058485")
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : null,
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a82"),
            "discover" : {

            },
            "orbit" : {
                "eccentricity" : 0.003,
                "inclination" : 0.374,
                "apsis" : 182840,
                "periapsis" : 181150,
                "initialDate" : NumberLong("1553335058485")
            },
            "__v" : 0,
            "description" : "",
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8df9b02"),
            "name" : "Thebe",
            "diameter" : {
                "x" : 116,
                "y" : 98,
                "z" : 84
            },
            "mass" : 2080000000000000000,
            "magnitude" : {

            },
            "temperature" : {
                "inner" : 124
            },
            "axis" : {
                "period" : 0.674536,
                "tilt" : 0,
                "initialDate" : NumberLong("1553335058485")
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : null,
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a82"),
            "discover" : {
                "date" : "1979-03-05",
                "author" : "Stephen P. Synnott"
            },
            "orbit" : {
                "eccentricity" : 0.0175,
                "inclination" : 1.076,
                "apsis" : 226000,
                "periapsis" : 218000,
                "initialDate" : NumberLong("1553335058485")
            },
            "albedo" : 0.047,
            "__v" : 0,
            "description" : "",
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8df9b03"),
            "name" : "Io",
            "diameter" : {
                "x" : 3660,
                "y" : 3637,
                "z" : 3630
            },
            "mass" : 8.931938e+22,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 130
            },
            "axis" : {
                "period" : 1.769137786,
                "tilt" : 0,
                "initialDate" : NumberLong("1553335058485")
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : "Io.jpg",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a82"),
            "discover" : {
                "date" : "1610-01-08",
                "author" : "Galileo Galilei"
            },
            "orbit" : {
                "eccentricity" : 0.0041,
                "inclination" : 0.05,
                "apsis" : 423400,
                "periapsis" : 420000,
                "initialDate" : NumberLong("1553335058485")
            },
            "albedo" : 0.63,
            "__v" : 0,
            "description" : "",
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8df9b04"),
            "name" : "Europa",
            "diameter" : {
                "x" : 3121,
                "y" : 3121,
                "z" : 3121
            },
            "mass" : 8.931938e+22,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 102
            },
            "axis" : {
                "period" : 3.551181,
                "tilt" : 0,
                "initialDate" : NumberLong("1553335058485")
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : "Europa.jpg",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a82"),
            "discover" : {
                "date" : "1610-01-08",
                "author" : "Galileo Galilei"
            },
            "orbit" : {
                "eccentricity" : 0.009,
                "inclination" : 0.47,
                "apsis" : 676938,
                "periapsis" : 664862,
                "initialDate" : NumberLong("1553005058485")
            },
            "albedo" : 0.67,
            "__v" : 0,
            "description" : "",
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8df9b05"),
            "name" : "Ganymedes",
            "diameter" : {
                "x" : 5168,
                "y" : 5168,
                "z" : 5168
            },
            "mass" : 1.4819e+23,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 110
            },
            "axis" : {
                "period" : 7.15455296,
                "tilt" : 0.33,
                "initialDate" : NumberLong("1553005058485")
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : "Ganymede.jpg",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a82"),
            "discover" : {
                "date" : "1610-01-07",
                "author" : "Galileo Galilei"
            },
            "orbit" : {
                "eccentricity" : 0.009,
                "inclination" : 0.47,
                "apsis" : 1071600,
                "periapsis" : 1068200,
                "initialDate" : NumberLong("1553005058485")
            },
            "albedo" : 0.67,
            "__v" : 0,
            "description" : "",
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8df9b06"),
            "name" : "Callisto",
            "diameter" : {
                "x" : 4820,
                "y" : 4820,
                "z" : 4820
            },
            "mass" : 1.075938e+23,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 134
            },
            "axis" : {
                "period" : 16.6890184,
                "tilt" : 0,
                "initialDate" : NumberLong("1550005058485")
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : "Callisto.jpg",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a82"),
            "discover" : {
                "date" : "1610-01-07",
                "author" : "Galileo Galilei"
            },
            "orbit" : {
                "eccentricity" : 0.0074,
                "inclination" : 2.017,
                "apsis" : 1897000,
                "periapsis" : 1869000,
                "initialDate" : NumberLong("1550005058485")
            },
            "albedo" : 0.22,
            "__v" : 0,
            "description" : "",
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8df9b07"),
            "name" : "Themisto",
            "diameter" : {
                "x" : 8,
                "y" : 8,
                "z" : 8
            },
            "mass" : 689000000000000,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 124
            },
            "axis" : {
                "period" : 129.82761,
                "tilt" : 0,
                "initialDate" : NumberLong("1550005058485")
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : null,
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a82"),
            "orbit" : {
                "eccentricity" : 0.2006,
                "inclination" : 45.81,
                "apsis" : 8874300,
                "periapsis" : 5909000,
                "initialDate" : NumberLong("1550005058485")
            },
            "albedo" : 0.04,
            "__v" : 0,
            "description" : "",
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8df9b08"),
            "name" : "Leda",
            "diameter" : {
                "x" : 20,
                "y" : 20,
                "z" : 20
            },
            "mass" : 11000000000000000,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 124
            },
            "axis" : {
                "period" : 240.92,
                "tilt" : 0,
                "initialDate" : NumberLong("1550005058485")
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : null,
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a82"),
            "orbit" : {
                "eccentricity" : 0.16,
                "inclination" : 29.01,
                "apsis" : 11160000,
                "periapsis" : 11160000,
                "initialDate" : NumberLong("1550005058485")
            },
            "albedo" : 0.04,
            "__v" : 0,
            "description" : "",
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8df9b09"),
            "name" : "Himalia",
            "diameter" : {
                "x" : 150,
                "y" : 120,
                "z" : 130
            },
            "mass" : 4200000000000000000,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 124
            },
            "axis" : {
                "period" : 250.56,
                "tilt" : 0,
                "initialDate" : NumberLong("1550005058485")
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : null,
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a82"),
            "orbit" : {
                "eccentricity" : 0.16,
                "inclination" : 29.59,
                "apsis" : 13082000,
                "periapsis" : 9782900,
                "initialDate" : NumberLong("1550005058485")
            },
            "albedo" : 0.04,
            "__v" : 0,
            "description" : "",
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8df9b11"),
            "name" : "Lysithea",
            "diameter" : {
                "x" : 32,
                "y" : 32,
                "z" : 32
            },
            "mass" : 63000000000000000,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 124
            },
            "axis" : {
                "period" : 259.2,
                "tilt" : 0,
                "initialDate" : NumberLong("1550005058485")
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : null,
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a82"),
            "orbit" : {
                "eccentricity" : 0.11,
                "inclination" : 25.77,
                "apsis" : 11720000,
                "periapsis" : 11720000,
                "initialDate" : NumberLong("1550005058485")
            },
            "albedo" : 0.04,
            "__v" : 0,
            "description" : "",
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8df9b12"),
            "name" : "Elara",
            "diameter" : {
                "x" : 86,
                "y" : 86,
                "z" : 86
            },
            "mass" : 870000000000000000,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 124
            },
            "axis" : {
                "period" : 259.64,
                "tilt" : 0,
                "initialDate" : NumberLong("1550005058485")
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : null,
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a82"),
            "orbit" : {
                "eccentricity" : 0.22,
                "inclination" : 30.66,
                "apsis" : 11740000,
                "periapsis" : 11740000,
                "initialDate" : NumberLong("1550005058485")
            },
            "albedo" : 0.04,
            "__v" : 0,
            "description" : "",
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8df9b13"),
            "name" : "Dia",
            "diameter" : {
                "x" : 4,
                "y" : 4,
                "z" : 4
            },
            "mass" : 87000000000000,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 124
            },
            "axis" : {
                "period" : 274,
                "tilt" : 0,
                "initialDate" : NumberLong("1550005058485")
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : null,
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a82"),
            "orbit" : {
                "eccentricity" : 0.21,
                "inclination" : 28.2,
                "apsis" : 12100000,
                "periapsis" : 12100000,
                "initialDate" : NumberLong("1550005058485")
            },
            "albedo" : 0.04,
            "__v" : 0,
            "description" : "",
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8df9b14"),
            "name" : "Valetudo",
            "diameter" : {
                "x" : 1,
                "y" : 1,
                "z" : 1
            },
            "mass" : 8000000000000,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 124
            },
            "axis" : {
                "period" : 533.3,
                "tilt" : 0,
                "initialDate" : NumberLong("1550005058485")
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : null,
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a82"),
            "orbit" : {
                "eccentricity" : 0.222,
                "inclination" : 34,
                "apsis" : 18980000,
                "periapsis" : 18980000,
                "initialDate" : NumberLong("1550005058485")
            },
            "albedo" : 0.04,
            "__v" : 0,
            "description" : "",
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8df9b18"),
            "name" : "Megaclite",
            "diameter" : {
                "x" : 5.4,
                "y" : 5.4,
                "z" : 5.4
            },
            "mass" : 80000000000000,
            "magnitude" : {

            },
            "temperature" : {

            },
            "axis" : {
                "period" : 792.437,
                "tilt" : 0,
                "initialDate" : NumberLong("1550005058485")
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : null,
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a82"),
            "orbit" : {
                "eccentricity" : 0.308,
                "inclination" : 148,
                "apsis" : 24687000,
                "periapsis" : 22800000,
                "initialDate" : NumberLong("1550005058485")
            },
            "albedo" : 0.04,
            "__v" : 0,
            "description" : "",
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8df9c00"),
            "name" : "Pan",
            "diameter" : {
                "x" : 34.4,
                "y" : 31.4,
                "z" : 20.8
            },
            "mass" : 4950000000000000,
            "magnitude" : {

            },
            "temperature" : {

            },
            "axis" : {
                "period" : 0.575050718,
                "tilt" : 0,
                "initialDate" : NumberLong("1553335058485")
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : null,
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a83"),
            "discover" : {
                "date" : "1990-01-16",
                "author" : "M. R. Showalter"
            },
            "orbit" : {
                "eccentricity" : 0.0000144,
                "inclination" : 0.0001,
                "apsis" : 133584,
                "periapsis" : 133584,
                "initialDate" : NumberLong("1553335058485")
            },
            "albedo" : 0.5,
            "__v" : 0,
            "description" : "",
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be60eee4143ef4fd8df9c01"),
            "name" : "Fornjot",
            "diameter" : {
                "x" : 6,
                "y" : 6,
                "z" : 6
            },
            "mass" : 49500000000000,
            "magnitude" : {

            },
            "temperature" : {

            },
            "axis" : {
                "period" : 1354,
                "tilt" : 0,
                "initialDate" : NumberLong("1553335058485")
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : null,
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a83"),
            "discover" : {
                "date" : "2005-05-04"
            },
            "orbit" : {
                "eccentricity" : 0.186,
                "inclination" : 160,
                "apsis" : 23609000,
                "periapsis" : 23609000,
                "initialDate" : NumberLong("1553335058485")
            },
            "__v" : 0,
            "description" : "",
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5c6d6c5ecd2ad99014121e89"),
            "diameter" : {
                "x" : 15,
                "y" : 12.2,
                "z" : 11
            },
            "temperature" : {
                "inner" : 233,
                "outer" : 233
            },
            "axis" : {
                "period" : 1.263,
                "tilt" : 0
            },
            "discover" : {
                "author" : "Asaph Hall",
                "date" : "12. 8. 1877"
            },
            "orbit" : {
                "eccentricity" : 0.00033,
                "inclination" : 0.93,
                "apsis" : 23471,
                "periapsis" : 23455,
                "rotation" : 0,
                "initialDate" : 1487861640000
            },
            "magnitude" : {
                "relative" : 12.89
            },
            "description" : "",
            "name" : "Deimos",
            "mass" : 1476200000000000,
            "albedo" : 0.068,
            "composition" : [ ],
            "rings" : [ ],
            "texture" : "Deimos.jpg",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a81"),
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be50eee4143ef4fd8db9976"),
            "name" : "Sirius",
            "diameter" : {
                "x" : 0
            },
            "mass" : 0,
            "magnitude" : {

            },
            "temperature" : {

            },
            "axis" : {
                "period" : 0,
                "tilt" : 0
            },
            "composition" : [ ],
            "rings" : [ ],
            "typeId" : ObjectId("5b745fa94ca9f558f185c1b6"),
            "parentId" : ObjectId("5bdedf97c719d246388b7324"),
            "discover" : {

            },
            "position" : {
                "alpha" : 165,
                "beta" : 165,
                "distance" : 39736200000000
            },
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5be55eee4143ef4fd8db9977"),
            "name" : "Sirius A",
            "diameter" : {
                "x" : 1000000000
            },
            "mass" : 1,
            "magnitude" : {

            },
            "temperature" : {
                "outer" : 3042
            },
            "axis" : {
                "period" : 82.6,
                "tilt" : 0
            },
            "composition" : [ ],
            "rings" : [ ],
            "texture" : "BlueGiant.jpg",
            "typeId" : ObjectId("5b6eacd24ca9f558f1379815"),
            "parentId" : ObjectId("5be50eee4143ef4fd8db9976"),
            "discover" : {

            },
            "orbit" : {
                "eccentricity" : 0.5,
                "inclination" : 107.6,
                "startAngle" : 0,
                "period" : 547000,
                "apsis" : 2243968100000,
                "periapsis" : NumberLong("149597870000"),
                "initialDate" : 1493642520000
            },
            "__v" : 0,
            "atmosphere" : {
                "composition" : [ ]
            }
        },
        {
            "_id" : ObjectId("5cd2c65876f8b45aa27f3042"),
            "axis" : {
                "tilt" : 0,
                "period" : 0.5940798,
                "initialDate" : 1557317208592
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "name" : "Daphnis",
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a83"),
            "diameter" : {
                "x" : 8.6,
                "y" : 8.2,
                "z" : 6.4
            },
            "mass" : 7700000000000000,
            "temperature" : {
                "outer" : 78
            },
            "orbit" : {
                "eccentricity" : 0.0000331,
                "periapsis" : 136505,
                "apsis" : 136505,
                "inclination" : 0.0036,
                "initialDate" : 1557317208593
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2c769c5f7d263b32da85d"),
            "axis" : {
                "tilt" : 0,
                "period" : 0.6016947883,
                "initialDate" : 1527317481819
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "name" : "Atlas",
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a83"),
            "diameter" : {
                "x" : 40.8,
                "y" : 35.4,
                "z" : 18.8
            },
            "mass" : 6600000000000000,
            "orbit" : {
                "apsis" : 137670,
                "periapsis" : 137670,
                "eccentricity" : 0.0012,
                "inclination" : 0.003,
                "initialDate" : 1527317481819
            },
            "temperature" : {
                "outer" : 81
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2db5118af0d0017658f4e"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557322577646
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a83"),
            "name" : "Prometheus",
            "diameter" : {
                "x" : 135,
                "y" : 79,
                "z" : 60
            },
            "mass" : 159500000000000000,
            "orbit" : {
                "apsis" : 139380,
                "periapsis" : 139380,
                "eccentricity" : 0.0022,
                "initialDate" : 1557322577646
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2db5318af0d0017658f4f"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557322579568
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a83"),
            "name" : "Pandora",
            "diameter" : {
                "x" : 104,
                "y" : 81,
                "z" : 64
            },
            "mass" : 137100000000000000,
            "orbit" : {
                "apsis" : 141720,
                "periapsis" : 171720,
                "initialDate" : 1483228800000,
                "eccentricity" : 0.0042,
                "rotation" : 0,
                "inclination" : 0
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2db5518af0d0017658f50"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557322581936
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a83"),
            "name" : "Epimetheus",
            "orbit" : {
                "initialDate" : 1483228800000,
                "eccentricity" : 0.0098,
                "periapsis" : 151410,
                "apsis" : 151410
            },
            "mass" : 526600000000000000,
            "diameter" : {
                "x" : 130,
                "y" : 114,
                "z" : 106
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2de5deb312576b93ab528"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557323358006
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a83"),
            "name" : "Mimas",
            "diameter" : {
                "y" : 393,
                "z" : 381,
                "x" : 415
            },
            "mass" : 37493000000000000000,
            "orbit" : {
                "apsis" : 181902,
                "periapsis" : 189176,
                "eccentricity" : 0.0196,
                "inclination" : 1.574,
                "initialDate" : 1557323358007,
                "rotation" : 0
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0,
            "texture" : "upload_d172727517c8d5d77e743176889c0e61.jpg"
        },
        {
            "_id" : ObjectId("5cd2e15aeb312576b93ab52d"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557324122729
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a83"),
            "name" : "Enceladus",
            "diameter" : {
                "x" : 513,
                "y" : 503,
                "z" : 497
            },
            "mass" : 108022000000000000000,
            "orbit" : {
                "apsis" : 237948,
                "periapsis" : 237948,
                "eccentricity" : 0.0047,
                "inclination" : 0.009,
                "initialDate" : 1257324122729,
                "rotation" : 0
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "texture" : "upload_b7aa52e7416cbf177a97bd41368d4210.jpg",
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2e286eb312576b93ab534"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557324422437
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a83"),
            "name" : "Tethys",
            "diameter" : {
                "x" : 1077,
                "y" : 1057,
                "z" : 1053
            },
            "mass" : 617449000000000000000,
            "orbit" : {
                "apsis" : 294619,
                "periapsis" : 294619,
                "eccentricity" : 0.0001,
                "inclination" : 1.12,
                "initialDate" : 1277324122729,
                "rotation" : 0
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0,
            "texture" : "upload_9ac229c60f8f077a3a265d9515941c89.jpg"
        },
        {
            "_id" : ObjectId("5cd2e288eb312576b93ab535"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557324424722
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a83"),
            "name" : "Dione",
            "diameter" : {
                "x" : 1129,
                "y" : 1123,
                "z" : 1119
            },
            "mass" : 1.095e+21,
            "orbit" : {
                "apsis" : 377396,
                "periapsis" : 377396,
                "eccentricity" : 0.0022,
                "inclination" : 0.019,
                "initialDate" : 1257324122729
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2e540eb312576b93ab53f"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557325120347
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a83"),
            "name" : "Rhea",
            "diameter" : {
                "x" : 1532,
                "y" : 1526,
                "z" : 1524
            },
            "mass" : 2.306518e+21,
            "orbit" : {
                "apsis" : 527108,
                "periapsis" : 527108,
                "eccentricity" : 0.0012583,
                "inclination" : 0.345,
                "initialDate" : 1357324721601
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "texture" : "upload_9570cdad56e164b0255401c2a7d8e44c.jpg",
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2e542eb312576b93ab540"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557325122345
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a83"),
            "name" : "Titan",
            "diameter" : {
                "x" : 5149
            },
            "mass" : 1.3452e+23,
            "orbit" : {
                "apsis" : 1257060,
                "periapsis" : 1186680,
                "eccentricity" : 0.0288,
                "inclination" : 0.34854,
                "initialDate" : 1357324721601
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2e545eb312576b93ab541"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557325125269
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a83"),
            "name" : "Hyperion",
            "diameter" : {
                "x" : 360,
                "y" : 266,
                "z" : 205
            },
            "mass" : 5619900000000000000,
            "orbit" : {
                "apsis" : 1481009,
                "periapsis" : 1481009,
                "eccentricity" : 0.123061,
                "inclination" : 0.43,
                "initialDate" : 1557325125269
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2e847b7afde0017fb8805"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557325895358
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a85"),
            "name" : "Nalad",
            "diameter" : {
                "x" : 96,
                "y" : 60,
                "z" : 52
            },
            "mass" : 190000000000000000,
            "orbit" : {
                "apsis" : 48224,
                "periapsis" : 48224,
                "eccentricity" : 0.0047,
                "inclination" : 4.75,
                "initialDate" : 1357324721601
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2e98db7afde0017fb880e"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557326221799
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a85"),
            "name" : "Thalassa",
            "diameter" : {
                "x" : 108,
                "y" : 100,
                "z" : 52
            },
            "mass" : 350000000000000000,
            "orbit" : {
                "apsis" : 50074,
                "periapsis" : 50074,
                "eccentricity" : 0.00176,
                "inclination" : 0.21,
                "initialDate" : 1357324721601
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2e98fb7afde0017fb880f"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557326223801
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a85"),
            "name" : "Despina",
            "diameter" : {
                "x" : 180,
                "y" : 148,
                "z" : 128
            },
            "mass" : 2200000000000000000,
            "orbit" : {
                "apsis" : 52526,
                "periapsis" : 52526,
                "eccentricity" : 0.00038,
                "inclination" : 0.216,
                "initialDate" : 1357324721601
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2e99ab7afde0017fb8810"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557326234377
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a85"),
            "name" : "Galatea",
            "diameter" : {
                "x" : 204,
                "y" : 184,
                "z" : 144
            },
            "mass" : 2120000000000000000,
            "orbit" : {
                "apsis" : 61953,
                "periapsis" : 61953,
                "eccentricity" : 0.00022,
                "inclination" : 0.052,
                "initialDate" : 1357324721601
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2e99cb7afde0017fb8811"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557326236812
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a85"),
            "name" : "Larissa",
            "diameter" : {
                "x" : 216,
                "y" : 206,
                "z" : 168
            },
            "mass" : 4200000000000000000,
            "orbit" : {
                "apsis" : 73548,
                "periapsis" : 73548,
                "eccentricity" : 0.001393,
                "initialDate" : 1357324721601,
                "inclination" : -3
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2ed1cb7afde0017fb8825"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557327132948
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a85"),
            "name" : "Hippocamp",
            "diameter" : {
                "x" : 17.4,
                "y" : 17.4,
                "z" : 17.4
            },
            "mass" : 5000000000000000000,
            "orbit" : {
                "apsis" : 105284,
                "periapsis" : 105284,
                "eccentricity" : 0.00048,
                "inclination" : 0.0641,
                "initialDate" : 1357324721601
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2ed1fb7afde0017fb8826"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557327135445
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a85"),
            "name" : "Proteus",
            "diameter" : {
                "x" : 424,
                "y" : 390,
                "z" : 396
            },
            "mass" : 44000000000000000000,
            "orbit" : {
                "apsis" : 117709,
                "periapsis" : 117584,
                "eccentricity" : 0.00053,
                "inclination" : 0.524,
                "initialDate" : 1357324721601
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2ed30b7afde0017fb8827"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557327152724
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a85"),
            "name" : "Triton",
            "diameter" : {
                "x" : 1353,
                "y" : 1353,
                "z" : 1353
            },
            "mass" : 2.14e+22,
            "orbit" : {
                "apsis" : 354759,
                "periapsis" : 354759,
                "eccentricity" : 0.000016,
                "inclination" : 156.885,
                "initialDate" : 1357324721601
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2ed32b7afde0017fb8828"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557327154696
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a85"),
            "name" : "Nereid",
            "diameter" : {
                "x" : 170,
                "y" : 170,
                "z" : 170
            },
            "mass" : 31000000000000000000,
            "orbit" : {
                "apsis" : 9655000,
                "periapsis" : 1372000,
                "eccentricity" : 0.7507,
                "inclination" : 32.55,
                "initialDate" : 1357324721601,
                "rotation" : 0
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2eea7b7afde0017fb882d"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557327527527
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a85"),
            "name" : "Halimede",
            "diameter" : {
                "x" : 62,
                "y" : 62,
                "z" : 62
            },
            "mass" : 20000000000000000000,
            "orbit" : {
                "apsis" : 16611000,
                "periapsis" : 16611000,
                "eccentricity" : 0.2646,
                "inclination" : 134.1,
                "initialDate" : 1357324721601
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2eea9b7afde0017fb882e"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557327529364
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a85"),
            "name" : "Sao",
            "diameter" : {
                "x" : 44,
                "y" : 44,
                "z" : 44
            },
            "mass" : 10000000000000000000,
            "orbit" : {
                "apsis" : 22228000,
                "periapsis" : 22228000,
                "eccentricity" : 0.1365,
                "inclination" : 55.483,
                "initialDate" : 1357324721601
            },
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2eeb3b7afde0017fb8830"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557327539281
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a85"),
            "name" : "Psamathe",
            "diameter" : {
                "x" : 38,
                "y" : 38,
                "z" : 38
            },
            "orbit" : {
                "apsis" : 46705000,
                "periapsis" : 46705000,
                "eccentricity" : 0.4617,
                "inclination" : 137.679,
                "initialDate" : 1357324721601
            },
            "albedo" : 0.04,
            "mass" : 2000000000000000000,
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2eeb6b7afde0017fb8831"),
            "axis" : {
                "tilt" : 0,
                "initialDate" : 1557327542630
            },
            "discover" : {
                "author" : null,
                "date" : null
            },
            "description" : "",
            "typeId" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "parentId" : ObjectId("5be60eee4143ef4fd8db9a85"),
            "name" : "Neso",
            "diameter" : {
                "x" : 60,
                "y" : 60,
                "z" : 60
            },
            "orbit" : {
                "apsis" : 49500000,
                "periapsis" : 49500000,
                "eccentricity" : 0.5716,
                "inclination" : 136.439,
                "initialDate" : 1357324721601
            },
            "mass" : 20000000000000000000,
            "composition" : [ ],
            "atmosphere" : {
                "composition" : [ ]
            },
            "rings" : [ ],
            "__v" : 0
        }
    ]
)

db.getCollection('bodyevents').drop()
db.getCollection('bodyevents').insert(
    [
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c07"),
            "title" : "Čtvrtohory",
            "description" : "Bez popisu.",
            "from" : -2600000,
            "to" : 2019,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c08"),
            "title" : "Prvohory",
            "description" : "Bez popisu.",
            "from" : -541000000,
            "to" : -252000000,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c09"),
            "title" : "Prahory",
            "description" : "Bez popisu.",
            "from" : -4000000000,
            "to" : -2500000000,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c10"),
            "title" : "Hadaikum",
            "description" : "Bez popisu.",
            "from" : -4600000000,
            "to" : -4000000000,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c11"),
            "title" : "Druhohory",
            "description" : "Bez popisu.",
            "from" : -252000000,
            "to" : -66000000,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c12"),
            "title" : "Třetihory",
            "description" : "Bez popisu.",
            "from" : -66000000,
            "to" : -2580000,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c13"),
            "title" : "Starohory",
            "description" : "Bez popisu.",
            "from" : -2500000000,
            "to" : -542000000,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c14"),
            "title" : "Pangea",
            "description" : "Bez popisu.",
            "from" : NumberLong(-300000000),
            "to" : NumberLong(-200000000),
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c15"),
            "title" : "Rodinie",
            "description" : "Bez popisu.",
            "from" : -1300000000,
            "to" : -750000000,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c16"),
            "title" : "Pannotie",
            "description" : "Bez popisu.",
            "from" : -600000000,
            "to" : -550000000,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c17"),
            "title" : "Homo Sapiens",
            "description" : "Bez popisu.",
            "from" : -200000,
            "to" : 2019,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c18"),
            "title" : "Vyhynutí mamutů",
            "description" : "Bez popisu.",
            "from" : -13000,
            "to" : -2000,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c19"),
            "title" : "Neandrtálci",
            "description" : "Bez popisu.",
            "from" : -250000,
            "to" : -32000,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c20"),
            "title" : "Množství CO2",
            "description" : "Poprvé po 3 milionech let překročila koncentrace CO2 ve vzduchu 0,04 %.",
            "from" : 2013,
            "to" : 2013,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c21"),
            "title" : "Vznik pyramid",
            "description" : "Bez popisu.",
            "from" : -5500,
            "to" : -2000,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c22"),
            "title" : "Vesuv",
            "description" : "Bez popisu.",
            "from" : 79,
            "to" : 79,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c23"),
            "title" : "La Garita",
            "description" : "Největší sopečná erupce v dějinách Země. Sopečný oblak byl vysoký 50 km a bylo vyvrhnuto 4 800 km3 magmatu",
            "from" : -2780000,
            "to" : -2780000,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c24"),
            "title" : "Yellowstone",
            "description" : "Druhý největší sopečný výbuch na Zemi vytvořil oblak o výšce 50 km.",
            "from" : -640000,
            "to" : -640000,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c25"),
            "title" : "Asteroid Chicxulub",
            "description" : "Do Země pravděpodobně narazil hypotetický 12km asteroid, který způsobil vyhynutí dinosaurů. Výsledkem byl kráter o průměru 150 km. Síla výbuchu odpovídala 100M megatun TNT, což je 6,6 miliardkrát víc, než výbuch atomové bomby v Hirošimě.",
            "from" : -66000000,
            "to" : -66000000,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c26"),
            "title" : "Dinosauři",
            "description" : "Bez popisu.",
            "from" : -250000000,
            "to" : -66000000,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c27"),
            "title" : "Zemětřesení v Chile",
            "description" : "Došlo k nejsilnějšímu zemětřesení v historii lidstva. Dosáhlo hodnoty 9,5 na Richterově stupnici. ",
            "from" : 1960,
            "to" : 1960,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c28"),
            "title" : "Vymírání zvířat",
            "description" : "67 % všech divoce žijících zvířecích druhů vymřelo. Jedná se o nejrozsáhlejší vymírání od dob dinosaurů.",
            "from" : 1971,
            "to" : 2019,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c29"),
            "title" : "Tunguská událost",
            "description" : "10 km nad Sibiří došlo k výbuchu o síle 10-25 Mt TNT. Výbuch přelámal 80 milionů stromů a byl slyšet na vzdálenost 1 000 km. I když nikdy nebyly nalezeny zbytky žádného vesmírného tělesa, předpokládá se, že šlo o přilétající planetku.",
            "from" : 1908,
            "to" : 1908,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c30"),
            "title" : "Vznik Měsíce",
            "description" : "Do Země narazilo těleso o velikosti Marsu. Náraz byl tečný a zasáhl pouze vrchní vrstvy Země. Tyto vrstvy byly odpařeny a vymrštěny do vesmíru. Došlo k vytvoření prstence kolem Země, který se shlukoval až dokud nevzniklo jediné těleso, Měsíc.",
            "from" : -4500000000,
            "to" : -3000000000,
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c31"),
            "title" : "První mnohobuněčné organismy",
            "description" : "Začaly vznikat první mnohobuněčné organismy. V tomto období vznikly řasy.",
            "from" : NumberLong(-2100000000),
            "to" : NumberLong(-1900000000),
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c50e2a52b434a7cbf494c32"),
            "title" : "Permské vymírání",
            "description" : "Během 31 tisíc let vymřelo 81 % všech živočišných druhů na planetě. Jedná se o nejrozsáhlejší vymírání v historii celé planety. Důvodem byl nejspíš nedostatek kyslíku ve vodě i v atmosféře, vulkanická činnost a pokles mořské hladiny.",
            "from" : NumberLong(-252000000),
            "to" : NumberLong(-252000000),
            "bodyId" : ObjectId("5be60eee4143ef4fd8db9a77"),
            "__v" : 0
        },
        {
            "_id" : ObjectId("5c58b35c1370c93107bcaf5c"),
            "title" : "První život",
            "description" : "První jednobuněčné organismy se vyvinuly ve vodě a umožnily vznik složitějších organismů.",
            "from" : -3500000000,
            "to" : -3000000000,
            "bodyId" : ObjectId("87ac4247acf457229c9aa7ae"),
            "__v" : 0
        }
    ]
)

db.getCollection('bodyposts').drop()
db.getCollection('bodyposts').insert(
    [ ]
)

db.getCollection('bodytypes').drop()
db.getCollection('bodytypes').insert(
    [
        {
            "_id" : ObjectId("5b6eacd24ca9f558f1379815"),
            "name" : "Žlutý trpaslík",
            "emissiveColor" : "#FFFFFF",
            "texture" : "YellowDwarf.jpg"
        },
        {
            "_id" : ObjectId("5b6ead074ca9f558f137d012"),
            "name" : "Terestrická planeta",
            "texture" : "DefaultBody.jpg"
        },
        {
            "_id" : ObjectId("5b6ead184ca9f558f137d752"),
            "name" : "Plynný obr",
            "texture" : "GasGiant.jpg"
        },
        {
            "_id" : ObjectId("5b6ead2a4ca9f558f137ddd4"),
            "name" : "Měsíc",
            "texture" : "DefaultBody.jpg"
        },
        {
            "_id" : ObjectId("5b6ed4be4ca9f558f15f766f"),
            "name" : "Krátkoperiodická kometa",
            "texture" : "DefaultBody.jpg"
        },
        {
            "_id" : ObjectId("5b6ed9ca4ca9f558f164d4ec"),
            "name" : "Dlouhoperiodická planeta",
            "texture" : "DefaultBody.jpg"
        },
        {
            "_id" : ObjectId("5b6ed9d14ca9f558f164d7c3"),
            "name" : "Planetka",
            "texture" : "DefaultBody.jpg"
        },
        {
            "_id" : ObjectId("5b6ef1f84ca9f558f17d9426"),
            "name" : "Spirální galaxie",
            "particlesGenerator" : "return [Random.normal(0, body.diameter.x / 4), Random.normal(0, body.diameter.y / 4), Random.normal(0, body.diameter.z / 4)]",
            "emissiveColor" : "#000000"
        },
        {
            "_id" : ObjectId("5b745fa94ca9f558f185c1b5"),
            "name" : "Trpasličí planeta",
            "texture" : "DefaultBody.jpg"
        },
        {
            "_id" : ObjectId("5b745fa94ca9f558f185c1b6"),
            "name" : "Těžiště",
            "visible" : false
        },
        {
            "_id" : ObjectId("5b745fa94ca9f558f185c1b7"),
            "name" : "Pás",
            "particlesGenerator" : "const d = Random.normal((body.diameter.x - body.particles.thickness) / 2,body.particles.thickness / 4);const a = Random.uniform(0, 359);return [d * Math.cos(a), d * Math.sin(a), Random.normal(0, body.diameter.y / 2)]"
        },
        {
            "_id" : ObjectId("5b745fa94ca9f558f185c1b8"),
            "name" : "Roj",
            "particlesGenerator" : "return [Random.normal(0, body.diameter.x / 2), Random.normal(0, body.diameter.y / 2), Random.normal(0, body.diameter.z / 2)]"
        },
        {
            "_id" : ObjectId("5b745fa94ca9f558f185c1b9"),
            "name" : "Oblak",
            "particlesGenerator" : "const d = body.diameter.x / 2 - Random.exp(body.diameter.x / 2); const a = Random.uniform(0, 360);const b = Random.uniform(0, 360);return [Math.sin(a) * Math.cos(b) * d, Math.sin(a) * Math.sin(b) * d, Math.cos(a) * d]"
        },
        {
            "_id" : ObjectId("5b6ef1f84ca9f558f17d9430"),
            "name" : "Vesmír",
            "emissiveColor" : "#000000"
        },
        {
            "_id" : ObjectId("5b745fa94ca9f558f185c2b8"),
            "name" : "Nepravidelná trpasličí galaxie",
            "particlesGenerator" : "return [Random.normal(0, body.diameter.x / 2), Random.normal(0, body.diameter.y / 2), Random.normal(0, body.diameter.z / 2)]",
            "emissiveColor" : "#000000"
        },
        {
            "_id" : ObjectId("5cb0ae948c680d18464d7f81"),
            "name" : "Červený trpaslík",
            "texture" : "YellowDwarf.jpg",
            "emissiveColor" : "#FFFFFF",
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cb0b26e6e7ac41df781aac4"),
            "name" : "Bílý trpaslík",
            "emissiveColor" : "#FFFFFF",
            "texture" : "YellowDwarf.jpg",
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cb0b97c6e7ac41df781aac5"),
            "name" : "Modrý obr",
            "texture" : "BlueGiant.jpg",
            "emissiveColor" : "#FFFFFF",
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cb0b98c6e7ac41df781aac6"),
            "name" : "Červený obr",
            "texture" : "RedGiant.jpg",
            "emissiveColor" : "#FFFFFF",
            "__v" : 0
        },
        {
            "_id" : ObjectId("5b6ef1f83ca9f558f17d9426"),
            "name" : "Spirální galaxie s příčkou",
            "particlesGenerator" : "return [Random.normal(0, body.diameter.x / 4) - 2.50666e+17, Random.normal(0, body.diameter.y / 4), Random.normal(0, body.diameter.z / 4)]",
            "emissiveColor" : "#000000"
        }
    ]
)

db.getCollection('messages').drop()
db.getCollection('messages').insert(
    [ ]
)

db.getCollection('notifications').drop()
db.getCollection('notifications').insert(
    [
        {
            "_id" : ObjectId("5cd2e51deb312576b93ab53c"),
            "approvalState" : 1,
            "operation" : 0,
            "subjectType" : 2,
            "subjectName" : "Hyperion",
            "text" : "Hyperion",
            "link" : "?panel=body&body-tab=data&body=Hyperion",
            "createdAt" : 1557325085090,
            "updatedAt" : 1557325125340,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2e7d7b7afde0017fb8802"),
            "approvalState" : 1,
            "operation" : 0,
            "subjectType" : 2,
            "subjectName" : "Nalad",
            "text" : "Nalad",
            "link" : "?panel=body&body-tab=data&body=Nalad",
            "createdAt" : 1557325783334,
            "updatedAt" : 1557325895426,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2ea70b7afde0017fb8812"),
            "approvalState" : 1,
            "operation" : 0,
            "subjectType" : 2,
            "subjectName" : "Hippocamp",
            "text" : "Hippocamp",
            "link" : "?panel=body&body-tab=data&body=Hippocamp",
            "createdAt" : 1557326448861,
            "updatedAt" : 1557327133000,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2eaafb7afde0017fb8814"),
            "approvalState" : 1,
            "operation" : 0,
            "subjectType" : 2,
            "subjectName" : "Proteus",
            "text" : "Proteus",
            "link" : "?panel=body&body-tab=data&body=Proteus",
            "createdAt" : 1557326511375,
            "updatedAt" : 1557327135502,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2eaf1b7afde0017fb8816"),
            "approvalState" : 1,
            "operation" : 0,
            "subjectType" : 2,
            "subjectName" : "Triton",
            "text" : "Triton",
            "link" : "?panel=body&body-tab=data&body=Triton",
            "createdAt" : 1557326577210,
            "updatedAt" : 1557327152779,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2eb50b7afde0017fb8818"),
            "approvalState" : 1,
            "operation" : 0,
            "subjectType" : 2,
            "subjectName" : "Nereid",
            "text" : "Nereid",
            "link" : "?panel=body&body-tab=data&body=Nereid",
            "createdAt" : 1557326672406,
            "updatedAt" : 1557327154756,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2ebbeb7afde0017fb881a"),
            "approvalState" : 1,
            "operation" : 0,
            "subjectType" : 2,
            "subjectName" : "Halimede",
            "text" : "Halimede",
            "link" : "?panel=body&body-tab=data&body=Halimede",
            "createdAt" : 1557326782623,
            "updatedAt" : 1557327527579,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2ec0ab7afde0017fb881c"),
            "approvalState" : 1,
            "operation" : 0,
            "subjectType" : 2,
            "subjectName" : "Sao",
            "text" : "Sao",
            "link" : "?panel=body&body-tab=data&body=Sao",
            "createdAt" : 1557326858803,
            "updatedAt" : 1557327529419,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2ec3ab7afde0017fb881e"),
            "approvalState" : 0,
            "operation" : 0,
            "subjectType" : 2,
            "subjectName" : "Laomedeia",
            "text" : "Laomedeia",
            "link" : "?panel=body&body-tab=data&body=Laomedeia",
            "createdAt" : 1557326906613,
            "updatedAt" : 1557326906613,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2ec8eb7afde0017fb8820"),
            "approvalState" : 1,
            "operation" : 0,
            "subjectType" : 2,
            "subjectName" : "Psamathe",
            "text" : "Psamathe",
            "link" : "?panel=body&body-tab=data&body=Psamathe",
            "createdAt" : 1557326990275,
            "updatedAt" : 1557327539340,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2ed02b7afde0017fb8822"),
            "approvalState" : 1,
            "operation" : 0,
            "subjectType" : 2,
            "subjectName" : "Neso",
            "text" : "Neso",
            "link" : "?panel=body&body-tab=data&body=Neso",
            "createdAt" : 1557327106113,
            "updatedAt" : 1557327542688,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2eeecb7afde0017fb8832"),
            "approvalState" : 1,
            "operation" : 3,
            "subjectType" : 5,
            "subjectName" : "Černý trpaslíkk",
            "text" : "Černý trpaslíkk",
            "link" : "?panel=db&db-tab=types",
            "createdAt" : 1557327596413,
            "updatedAt" : 1557327623440,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd2ef0eb7afde0017fb8834"),
            "approvalState" : 1,
            "operation" : 3,
            "subjectType" : 5,
            "subjectName" : "Hnědý trpaslík",
            "text" : "Hnědý trpaslík",
            "link" : "?panel=db&db-tab=types",
            "createdAt" : 1557327630715,
            "updatedAt" : 1557327634464,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd306516192c600178ef4c7"),
            "approvalState" : 2,
            "operation" : 3,
            "subjectType" : 5,
            "subjectName" : "Center",
            "text" : "Center",
            "link" : "?panel=db&db-tab=types",
            "createdAt" : 1557333585831,
            "updatedAt" : 1557333612456,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd33a742f1f8d001700aa20"),
            "approvalState" : 1,
            "operation" : 2,
            "subjectType" : 3,
            "subjectName" : "Země",
            "text" : "Hadaikum",
            "link" : "?panel=body&body-tab=timeline&body=Země",
            "createdAt" : 1557346932790,
            "updatedAt" : 1557347042695,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd33a7d2f1f8d001700aa22"),
            "approvalState" : 1,
            "operation" : 2,
            "subjectType" : 3,
            "subjectName" : "Země",
            "text" : "Prahory",
            "link" : "?panel=body&body-tab=timeline&body=Země",
            "createdAt" : 1557346941596,
            "updatedAt" : 1557347044283,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd33a852f1f8d001700aa24"),
            "approvalState" : 1,
            "operation" : 2,
            "subjectType" : 3,
            "subjectName" : "Země",
            "text" : "Starohory",
            "link" : "?panel=body&body-tab=timeline&body=Země",
            "createdAt" : 1557346949150,
            "updatedAt" : 1557347045839,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd33a8b2f1f8d001700aa26"),
            "approvalState" : 1,
            "operation" : 2,
            "subjectType" : 3,
            "subjectName" : "Země",
            "text" : "Rodinie",
            "link" : "?panel=body&body-tab=timeline&body=Země",
            "createdAt" : 1557346955313,
            "updatedAt" : 1557347047238,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd33a952f1f8d001700aa28"),
            "approvalState" : 1,
            "operation" : 2,
            "subjectType" : 3,
            "subjectName" : "Země",
            "text" : "Pannotie",
            "link" : "?panel=body&body-tab=timeline&body=Země",
            "createdAt" : 1557346965439,
            "updatedAt" : 1557347048917,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd33a9e2f1f8d001700aa2a"),
            "approvalState" : 1,
            "operation" : 2,
            "subjectType" : 3,
            "subjectName" : "Země",
            "text" : "Prvohory",
            "link" : "?panel=body&body-tab=timeline&body=Země",
            "createdAt" : 1557346974282,
            "updatedAt" : 1557347050312,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd33aa62f1f8d001700aa2c"),
            "approvalState" : 1,
            "operation" : 2,
            "subjectType" : 3,
            "subjectName" : "Země",
            "text" : "Druhohory",
            "link" : "?panel=body&body-tab=timeline&body=Země",
            "createdAt" : 1557346982301,
            "updatedAt" : 1557347051941,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd33aad2f1f8d001700aa2e"),
            "approvalState" : 1,
            "operation" : 2,
            "subjectType" : 3,
            "subjectName" : "Země",
            "text" : "Dinosauři",
            "link" : "?panel=body&body-tab=timeline&body=Země",
            "createdAt" : 1557346989511,
            "updatedAt" : 1557347053194,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd33ab52f1f8d001700aa30"),
            "approvalState" : 1,
            "operation" : 2,
            "subjectType" : 3,
            "subjectName" : "Země",
            "text" : "Třetihory",
            "link" : "?panel=body&body-tab=timeline&body=Země",
            "createdAt" : 1557346997355,
            "updatedAt" : 1557347054239,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd33abe2f1f8d001700aa32"),
            "approvalState" : 1,
            "operation" : 2,
            "subjectType" : 3,
            "subjectName" : "Země",
            "text" : "Čtvrtohory",
            "link" : "?panel=body&body-tab=timeline&body=Země",
            "createdAt" : 1557347006188,
            "updatedAt" : 1557347055064,
            "__v" : 0
        },
        {
            "_id" : ObjectId("5cd33ac72f1f8d001700aa34"),
            "approvalState" : 1,
            "operation" : 2,
            "subjectType" : 3,
            "subjectName" : "Země",
            "text" : "Vesuv",
            "link" : "?panel=body&body-tab=timeline&body=Země",
            "createdAt" : 1557347015869,
            "updatedAt" : 1557347055837,
            "__v" : 0
        }
    ]
)

db.getCollection('postvotes').drop()
db.getCollection('postvotes').insert(
    [ ]
)

db.getCollection('tokens').drop()
db.getCollection('tokens').insert(
    [ ]
)

db.getCollection('users').drop()
db.getCollection('users').insert(
    [
        {
            "_id" : ObjectId("5cd335222f1f8d001700a9fb"),
            "score" : {
                "gold" : 0,
                "silver" : 0,
                "bronze" : 0
            },
            "role" : 2,
            "isOnline" : false,
            "email" : "universis.root@gmail.com",
            "password" : "$2b$10$RG6qBnNW4jHAECui.vz4dO/RrejoolU2TPuRg14ogD4JWlR9un/6S",
            "name" : "Universis",
            "lastOnline" : 1557347787878,
            "createdAt" : ISODate("2019-05-08T19:59:30.192Z"),
            "updatedAt" : ISODate("2019-05-08T20:36:27.878Z"),
            "__v" : 0
        }
    ]
)
