// BodyModel.ts
export default new ItemModel<Body, Body.Simple, Body.New>(
    dbModel: DatabaseModel.BODY,
    get: {
        selectAll: ['name', 'orbit'],
        joinAll: ['typeId']
    },
    add: { approval: true, notification: true }
    update: { approval: true, onAfter: console.log }
    remove: { notification: true, onBefore: onBeforeCallback }
)
