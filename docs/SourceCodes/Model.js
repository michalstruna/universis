// BodyModel.ts
export default new ItemModel<Universis.Universe.Body, Universis.Universe.Body.Simple, Universis.Universe.Body.New>(
    dbModel: DatabaseModels.BODY,
    get: {
        selectAll: ['name', 'orbit'],
        joinOne: ['typeId'],
        joinAll: ['typeId']
    },
    add: { approval: true, notification: true }
    update: { approval: true, onAfter: console.log }
    remove: { notification: true, onBefore: onBeforeCallback }
)
