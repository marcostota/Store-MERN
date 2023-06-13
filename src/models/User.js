const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

UserSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        return next();
    }

    this.password = await bcrypt.hash(this.password, 4);
})

UserSchema.methods = {
    compareHash(password){
        return bcrypt.compare(password, this.password)
    }
}


UserSchema.plugin(mongoosePaginate)
module.exports=mongoose.model('User', UserSchema)