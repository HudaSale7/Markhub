import jwt from "jsonwebtoken";
import "dotenv/config";
export const getUser = async ({ req }) => {
    const token = req.headers.authorization || "";
    if (token) {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        return { user: decodedToken };
    }
    return { user: null };
};
