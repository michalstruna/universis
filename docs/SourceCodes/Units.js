Units.convert(Units.ANGLE.RADIAN, Units.ANGLE.DEGREE, Math.PI) // 180
Units.convert(Units.MASS.KG, Units.MASS.G, 2.5) // 2500
Units.toFull(1234567890, Units.SIZE.KM) // 1 234 567 890 km
Units.toShort(1234567890, Units.SIZE.KM) // 1.23G km
Units.toExponential(1234567890, Units.SIZE.KM) // 1.23e9 km
Units.toFull(123456780, Units.SIZE.KM, Units.SIZE) // 8.25 AU
