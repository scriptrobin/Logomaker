const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: "Full name cant be empty"
    },
    email: {
        type: String,
        required: "Email cant be empty",
        unique: true
    },
    password: {
        type: String,
        required: "Password name cant be empty"
    },
    saltSecret: String
});

userSchema.path('email').validate((val)=>{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
}, 'Invalid email');

userSchema.pre('save', function(next){
   bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
        this.password = hash;
        this.saltSecret = salt;
        next(); 
    });
   });
});


userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateJwt = function() {
    return jwt.sign({_id: this.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXP}); 
}

mongoose.model('User', userSchema);