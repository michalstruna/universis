const scene = new Scene({
    backgroundColor: 0x000000,
    controllable: true,
    element: document.querySelector('.universe'),
    logaritmicDepth: true,
    objects: this.rootBodies.map(this.bodyFactory.create),
    onRender: this.updateBodies,
    target: 'Slunce'
})

scene.setCameraPosition({ x: 10, y: 20, z: 30 })
scene.setCameraTarget('VY Canis Majoris')
