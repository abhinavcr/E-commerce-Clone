const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

app.listen(port, () => {
  console.log("Server is running on port: 8000");
});

mongoose
  .connect(
    "mongodb+srv://AbhinavJha:AbhinavJha@cluster0.mnofkyf.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error occure while connecting to MongoDB", error);
  });

//End point to resgister in app
const User = require("./models/user");
const Order = require("./models/order");

//function to send verification mail to the user
const sendVerificationEmail = async (email, verificationToken) => {
  //create nodemailer transport

  const transporter = nodemailer.createTransport({
    //configure the email server
    service: "gmail",
    auth: {
      user: "jhaabhinav736@gmail.com",
      pass: "Abhi8287@",
    },
  });

  //Compose the email message
  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify the email : http://localhost:8000/verify/${verificationToken}`,
  };

  //Send mail
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending verification email", error);
  }
};

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //Check if the email is already register or not
    const exitingUser = await User.findOne(email);
    if (exitingUser) {
      return res.status(400).json({ message: "Email already Registered" });
    }

    //Create a new user
    const newUser = new User({ name, email, password });

    //Generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //Save the user in the Database
    await newUser.save();

    //Send verification email to the user
    sendVerificationEmail(newUser.email, newUser.verificationToken);
  } catch (error) {
    return res.status(500).json({ message: "Registration Failed" });
  }
});

//Endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    //Find the user without the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verified token" });
    }

    //Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Registration Failed" });
  }
});

//Generate secratekey for user
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

//Endpoint to login the user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check the user exits or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email and password" });
    }

    //Check the password is correct or not
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //Generate a token
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Login Failed" });
  }
});

//Endpoint to store a new address to beckend
app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;
    //Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //Add new user addresss to user's address array
    user.addresses.push(address);

    //Save the updated user in backend
    await user.save();
    return res.status(200).json({ message: "Address create successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error adding address" });
  }
});

//Endpoint to get all address of particular user
app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    const addresses = user.addresses();
    res.status(200).json({ addresses });
  } catch (error) {
    return res.status(500).json({ message: "Error retriving the address" });
  }
});

//Endpoint to store all the Order
app.post("/orders", async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    //Create an array of product objects from the cart Items
    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      image: item?.image,
    }));

    //create a new Order
    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });

    await order.save();
    res.status(200).json({ message: "Order create successfully" });
  } catch (error) {
    console.log("error creating order", error);
    return res.status(500).json({ message: "Error creating order" });
  }
});

//Get the user profile
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retriving the user profile" });
  }
});

//Get the user order
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId }).populate("user");
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No order found for this user" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: "Error retriving the user order" });
  }
});
