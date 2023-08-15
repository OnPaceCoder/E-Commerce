import mongoose from 'mongoose';
import bcrypt from 'bcrypt'


//User schema creation using mongoose.Schema
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: [2, 'Too few characters'],
            max: [20, 'Max limit achieved']
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            min: [8, "Minimum 8 character requried"],
            max: [20, "Maximum 20 characters limit achieved"]
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
    }, {
    timestamps: true,
}
);

//Method to compare old and new password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


//pre middleware to hash password
userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(11);
    this.password = await bcrypt.hash(this.password, salt);

})


//User model creation using mongoose.model
const User = mongoose.model("User", userSchema);


//Exporting User Model as default
export default User;