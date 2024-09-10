import User from '../models/userModel.js';
import bcrypt from 'bcrypt'
import mv from 'fs'
import { fileURLToPath } from 'url';
import path from 'path';


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

  if (!name || !password) return res.status(401).json({ message: "Usuario o constraseña no introducidos" })
  if (name.length < 4) return res.status(401).json({ message: "El usuario no puede ser menor de tres caracteres" })
  if (password.length < 8) return res.status(401).json({ message: "La contraseña tiene que ser de al menos ocho caracteres" })

  const hashedPassword = bcrypt.hashSync(password, 10)

  const user = new User({ name, password: hashedPassword });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = {
      name: req.user.name,
      description: req.user.description
    }
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const uploadProfilePic = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const image = req.files.image

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const uploadPath = './uploads/' + image.name

  image.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
}