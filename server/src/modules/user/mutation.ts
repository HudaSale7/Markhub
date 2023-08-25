import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { prisma } from '../../util/db.js';
import bcryptjs from 'bcryptjs';
import { GraphQLError } from 'graphql';

export const userMutation = {
  signup: async (_: any, args: any) => {
    const hashedPassword: string = await bcryptjs.hash(args.user.password, 12);
    const user = await prisma.user.create({
      data: {
        name: args.user.name,
        email: args.user.email,
        password: hashedPassword,
      },
    });
    if (!user) {
      throw new GraphQLError('Server Error.', {
        extensions: {
          code: 422,
        },
      });
    }
    const token: string = jwt.sign(
      { id: user.id, name: user.name },
      process.env.SECRET_KEY as string
    );
    return {
      token: token,
      id: user.id,
    };
  },
  login: async (_: any, args: any) => {
    const user = await prisma.user.findUnique({
      where: {
        email: args.user.email,
      },
    });
    if (!user) {
      throw new GraphQLError('Wrong Email.', {
        extensions: {
          code: 422,
        },
      });
    }
    const valid = await bcryptjs.compare(args.user.password, user.password);
    if (!valid) {
      throw new GraphQLError('Wrong Password.', {
        extensions: {
          code: 422,
        },
      });
    }
    const token: string = jwt.sign(
      { id: user.id, name: user.name },
      process.env.SECRET_KEY as string
    );
    return {
      token: token,
      id: user.id,
    };
  },
};
