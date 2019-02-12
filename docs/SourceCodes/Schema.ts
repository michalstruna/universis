const UserSchema = new Mongoose.Schema({
    email: { 
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        validate: { validator: Strings.isEmail }
    },
    ...
})
