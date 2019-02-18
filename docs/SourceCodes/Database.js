const User = this.db.getModel(DatabaseModels.USER)

// User's names, which starts with 'a' and doesn't contain any number.
User.find({ name: /^a[^0-9]*$/ }}).select('name').skip(5).limit(10)

// Create new user.
new User({ email: 'email@domail.cz', password: 'heslo' }).save()

// Update user by ID.
User.findByIdAndUpdate(
    '5ba0bef7df0fca0bf99305c1',
    { email: 'newEmail@domain.cz', name: 'newName' }
)

// Delete all users with names in array, but only if they are adult.
const names = ['michal', 'username', 'admin']
User.deleteMany({ name: { $in: names }, age: { $gte: 18 } }})
