const scene = new Scene({
    controllable: true,
    element: this.container,
    logaritmicDepth: true,
    objects: this.rootBodies.map(this.bodyFactory.create),
    onRender: this.updateBodies,
    target: 'Slunce'
})

scene.setCameraPosition({ x: 10, y: 20, z: 30 })
scene.setCameraTarget('VY Canis Majoris')
