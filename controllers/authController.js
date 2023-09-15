import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
const registerController = async (req, res) => {
  try {
    const { name, email, password, address, phone, answer } = req.body;
    if (!name) {
      return res.send({
        message: "Name is Required",
      });
    }
    if (!email) {
      return res.send({
        message: "email is Required",
      });
    }
    if (!password) {
      return res.send({
        message: "password is Required",
      });
    }
    if (!address) {
      return res.send({
        message: "address is Required",
      });
    }
    if (!answer) {
      return res.send({
        message: "Answer is Required",
      });
    }
    if (!phone) {
      return res.send({
        message: "phone is Required",
      });
    }
    //existing user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.send({
        success: false,
        message: "Already registered user, Please Login",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      address,
      phone,
      password: hashedPassword,
      answer,
    }).save();

    res.status(200).send({
      success: true,
      message: "User Registereg Successfully",
      user,
    });
  } catch (error) {
    console.log(`Error received ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in Regestration",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(404).send({
        error: "Email Field empty",
      });
    }
    if (!password) {
      return res.status(404).send({
        error: "password Field empty",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Login Failed",
      error,
    });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email) {
      return res.status(400).send({
        error: "Email Field empty",
      });
    }
    if (!newPassword) {
      return res.status(400).send({
        error: "password Field empty",
      });
    }
    if (!answer) {
      return res.status(400).send({
        error: "Answer Field empty",
      });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "Wrong Credentials",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

//test

const test = (req, res) => {
  res.send("Protected Path");
};

const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const user = await userModel.findById(req.user._id);
    if (password && password.length < 6) {
      return res.json({
        error: "Password required of atleast 6 letters",
      });
    }
    const hashedPassword = hashPassword
      ? await hashPassword(password)
      : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating profile",
    });
  }
};

export {
  registerController,
  loginController,
  test,
  forgotPasswordController,
  updateProfileController,
};
