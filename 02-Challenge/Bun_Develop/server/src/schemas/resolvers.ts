import { AuthenticationError } from 'apollo-server-express';
import User from '../models/User';
import { signToken } from '../services/auth';

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        const userData = await User.findById(context.user._id).populate('savedBooks');
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    login: async (_parent: any, { email, password }: { email: string; password: string }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
        const token = signToken(user.username, user.email, user._id as string);
        return { token, user };
      } catch (error) {
        throw new Error('Error logging in');
      }
    },
    addUser: async (_parent: any, { username, email, password }: { username: string; email: string; password: string }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user.username, user.email, user._id as string);
        return { token, user };
      } catch (error) {
        console.log(error)
        throw new Error('Error creating user');
      }
    },
    saveBook: async (_parent: any, { authors, description, title, bookId, image, link }: { authors: string[]; description: string; title: string; bookId: string; image: string; link: string }, context: any) => {
      try {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            { $addToSet: { savedBooks: { authors, description, title, bookId, image, link } } },
            { new: true }
          );
          return updatedUser;
        }
        throw new AuthenticationError('You need to be logged in!');
      } catch (error) {
        throw new Error('Error saving book');
      }
    },
    removeBook: async (_parent: any, { bookId }: { bookId: string }, context: any) => {
      try {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            { $pull: { savedBooks: { bookId } } },
            { new: true }
          );
          return updatedUser;
        }
        throw new AuthenticationError('You need to be logged in!');
      } catch (error) {
        throw new Error('Error removing book');
      }
    },
  },
};

export default resolvers;