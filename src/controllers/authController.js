import User from "../models/userModel.js";
import bcrypt from "bcrypt";

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

    // If authentication is successful
    res.status(200).json({ message: "Usuario autenticado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
