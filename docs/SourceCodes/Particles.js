for (let i = 0; i < 1000; i++) {
    const angle1 = Random.uniform(0, 2 * Math.PI)
    const angle2 = Random.uniform(0, 2 * Math.PI)

    geometry.vertices.push(new THREE.Vector3(
        radius * Math.sin(angle1) * Math.cos(angle2),
        radius * Math.sin(angle1) * Math.sin(angle2),
        radius * Math.cos(angle1)
    ))
}
