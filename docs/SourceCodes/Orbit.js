const a = (apsis + periapsis) / 2
const b = Math.sqrt(-Math.pow(a, 2) * eccentricity + Math.pow(a, 2))
const path = new THREE.EllipseCurve(0, 0, a, b, ...)
const geometry = new THREE.Geometry()
geometry.setFromPoints(path.getPoints(ORBIT_SEGMENTS))
