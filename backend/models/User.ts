const mongoose = require('mongoose');
const {isEmail}=require('validator')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter username!'],
      minlength: [3, 'Username is minimum 3 characters!'],
      maxlength: [50,'Max length is 50 characters!'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter email!'],
      maxlength: [50,'Max length is 50 characters!'],
      unique: true,
      lowercase:true,
      validate:[isEmail,'Please enter valid email!']
    },
    password: {
      type: String,
      required: [true, 'Please enter password!'], 
      minlength: [6, 'Password is minimum 6 characters!'],
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next){
  // genrate new password
  const salt =await  bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next();
})

module.exports = mongoose.model("User", UserSchema);
