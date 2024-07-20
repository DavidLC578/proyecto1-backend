import User from '../models/userModel.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, password } = req.body;

  if ( !name || !password ) return res.status(401).json({message: "Usuario o constraseña no introducidos"})
  if (name.length < 4) return res.status(401).json({message: "El usuario no puede ser menor de tres caracteres"})
  if (password.length < 8) return res.status(401).json({message: "La contraseña tiene que ser de al menos ocho caracteres"})


  const user = new User({ name,password });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
