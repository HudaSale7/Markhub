import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { GraphQLError } from 'graphql';
import service from './service.js';

export const userMutation = {
  signup: async (
    _: any,
    args: { user: { name: string; email: string; password: string } }
  ) => {
    const ifUserExist = await service.findUser(args.user.email);
    if (ifUserExist) {
      throw new GraphQLError('User Already Exist.', {
        extensions: {
          code: 422,
        },
      });
    }
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const isValidEmail = emailRegex.test(args.user.email);
    if (!isValidEmail) {
      throw new GraphQLError('Please enter a valid email .', {
        extensions: {
          code: 422,
        },
      });
    }
    const hashedPassword: string = await bcryptjs.hash(args.user.password, 12);
    const user = {
      name: args.user.name,
      email: args.user.email,
      password: hashedPassword,
    };

    const createdUser = await service.createUser(user);
    if (!createdUser) {
      throw new GraphQLError('Server Error.', {
        extensions: {
          code: 422,
        },
      });
    }
    const token: string = jwt.sign(
      { id: createdUser.id, name: createdUser.name },
      process.env.SECRET_KEY as string
    );
    return {
      token: token,
      id: createdUser.id,
    };
  },

  login: async (
    _: any,
    args: { user: { email: string; password: string } }
  ) => {
    const user = await service.findUser(args.user.email);
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
