const  mongoose= require('mongoose')


const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age:Number,
    image: String,
})
    
    const UserModels = mongoose.model('user',UserSchema);
    module.exports=UserModels

    

