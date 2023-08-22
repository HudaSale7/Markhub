import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { prisma } from '../../util/db.js';
import bcryptjs from 'bcryptjs';

export const userMutation = {
  signup: async (_: any, args: any) => {
    try {
      const hashedPassword: string = await bcryptjs.hash(args.user.password, 12);
      const user = await prisma.user.create({
        data: {
          name: args.user.name,
          email: args.user.email,
          password: hashedPassword,
        },
      });
      if (!user) {
        throw new Error('server error!');
      }
      const token: string = jwt.sign(
        { userId: user.id, userName: user.name },
        process.env.SECRET_KEY as string
      );
      return {
        token: token,
        id: user.id,
      };
    } catch (err) {
      console.log(err);
    }
  },
  login: async (_: any, args: any) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: args.user.email,
        },
      });
      if (!user) {
        throw new Error('user not found');
      }
      const valid = await bcryptjs.compare(args.user.password, user.password);
      if (!valid) {
        throw new Error('invalid password');
      }
      const token: string = jwt.sign(
        { userId: user.id, userName: user.name },
        process.env.SECRET_KEY as string
      );
      return {
        token: token,
        id: user.id,
      };
    } catch (err) {
      console.log(err);
    }
  },
};
