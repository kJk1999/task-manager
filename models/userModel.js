const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required : true,

    },
    password :{
        type:String,
        required:true
    }
})

// This pre-save hook hashes the password before saving the user document
userSchema.pre('save', async function (next) {
    const user = this;
  
    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
  
    try {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
      
      // Hash the password along with our new salt
      const hash = await bcrypt.hash(user.password, salt);
      
      // Override the plain-text password with the hashed one
      user.password = hash;
  
      next();
    } catch (err) {
      next(err);
    }
  });
  
  // Method to compare a given password with the database hash
  userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

const User = mongoose.model("User",userSchema)

module.exports = User