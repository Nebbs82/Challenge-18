import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schemas/typeDefs';
import resolvers from './schemas/resolvers';
import { authenticateToken } from './services/auth';
import db from "./config/connection"
import path from "node:path"

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  persistedQueries: false,
  context: ({ req }) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = authenticateToken(token);
      console.log("Token:", token);
      if(user){
        req.user = user;
      }
      // attach the user object to the req as context
      
      
      return req;
    } catch(err) {
      console.log(err);
      return req;
    }
  },
});

await server.start()

server.applyMiddleware({ app: app as any });

const PORT = process.env.PORT || 4000;

db.once("open", () => {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  }).on('error', (err) => {
    console.error(`🚨 Error starting server: ${err.message}`);
    process.exit(1);
  });
})
