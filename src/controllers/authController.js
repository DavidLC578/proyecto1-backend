import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const loginUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name: name });

    // Check if user exists
    if (!user) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    // Generate token
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // If authentication is successful
    res
      .status(200)
      .json({ message: "Usuario autenticado correctamente", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
