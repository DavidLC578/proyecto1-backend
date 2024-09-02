import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Obtener token del encabezado Authorization

    if (!token) {
        return res.status(401).json({ message: "No se proporcionó token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        req.user = user; // Agregar información del usuario al objeto req
        next(); // Pasar al siguiente middleware o función de ruta
    } catch (error) {
        res.status(401).json({ message: "Token inválido" });
    }
};

export default authMiddleware;
