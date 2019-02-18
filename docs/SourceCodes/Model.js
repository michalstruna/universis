// BodyModel.ts
export default new ItemModel<IBody, ISimpleBody, INewBody>(
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
