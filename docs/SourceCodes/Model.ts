// BodyModel.ts
export default new EntityModel<IBody, ISimpleBody, INewBody>(
    dbModel: DatabaseModels.BODY,
    joinAll: ['typeId'],
    joinOne: ['typeId'],
    selectAll: ['name', 'diameter', 'mass', 'temperature', 'orbit'],
    unapprovedDbModel: DatabaseModels.UNAPPROVED_BODY
)
