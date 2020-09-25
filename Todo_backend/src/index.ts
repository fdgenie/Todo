import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import { createConnection } from 'typeorm'
import { buildSchema } from 'type-graphql'
import {
  CreateTodoResolver,
  DeleteTodoResolver,
  GetTodoByIdResolver,
  GetTodosResolver,
  UpdateTodoResolver,
  ChangeTodoStatusResolver,
} from './todo/Resolvers'

const main = async () => {
  await createConnection()

  const schema = await buildSchema({
    resolvers: [
      GetTodosResolver,
      GetTodoByIdResolver,
      CreateTodoResolver,
      DeleteTodoResolver,
      UpdateTodoResolver,
      ChangeTodoStatusResolver,
    ],
  })


  const apolloServer = new ApolloServer({ schema })

  const app = Express()

  apolloServer.applyMiddleware({ app })

  app.listen(process.env.PORT || 4000, () => {
    console.log('server started on port:4000')
  })
}

main()
