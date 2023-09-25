import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "@prisma/client";

export const getUser = async ({ req }: { req: any }) => {
  const token = req.headers.authorization || "";
  const { user } = getUserFromToken(token);
  return { user };
};

export const getUserFromToken = (token: string) => {
  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);
    return { user: decodedToken as User };
  }
  return { user: null };
};
