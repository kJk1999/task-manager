const User = require("../models/userModel");
const jwt = require('jsonwebtoken')

const checkExistingUser = async (email) => {
    return await User.findOne({ email })
};

exports.signUpUser = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;
    const existingUser =await checkExistingUser(email);
    if (existingUser) {
        console.log(existingUser,"existingUser")
      return res
        .status(200)
        .json({ status: "fail", message: "User Already Exist!" });
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ Status: "Success", data: { user: newUser } });
  } catch (err) {
    res
      .status(500)
      .json({
        Status: "fail",
        message: "Internal Server Error",
        err: err.message,
      });
  }
};

exports.signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await checkExistingUser(email);
    if (!user) {
      return res.status(400).json({
        Status: "fail",
        message: "User Not Registerd!",
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (isPasswordValid) {
        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: '24h' });
      res.status(200).json({
        Status: "Success",
        message: "SignIn Successfull",
        token:token
      });
    } else {
      return res
        .status(400)
        .json({ Status: "fail", message: "Invalid Credentials" });
    }
  } catch (err) {
    res
      .status(500)
      .json({
        Status: "fail",
        message: "Internal Server Error!",
        err: err.message,
      });
  }
};

exports.authUser = async(req,res,next)=>{
  
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log(token,"token")
 

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      const user = await User.findById(decoded.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Token is not valid' });
    }
   

}