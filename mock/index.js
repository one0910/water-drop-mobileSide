import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { faker } from '@faker-js/faker/locale/zh_TW';


const typeDefs = `#graphql
  type UserType {
  id: String!
  name: String!
  desc: String!
  tel: String!

  """用戶資料"""
  account: String!
}

type Query {
  """使用ID查詢用戶料"""
  find(id: String!): UserType!
}

type Mutation {
  """新增用戶"""
  create(params: UserInput!): Boolean!

  """更新用戶資料"""
  update(id: String!, params: UserInput!): Boolean!

  """刪除一個用戶"""
  delete(id: String!): Boolean!
}

input UserInput {
  name: String!
  desc: String!
}
`;

const resolvers = {
  UserType: {
    name: () => faker.person.fullName(),
    desc: () => faker.person.jobDescriptor(),
    id: () => faker.database.mongodbObjectId(),
    account: () => faker.finance.accountName()
  },
};

// highlight-start
const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => faker.address.city()
};
// highlight-end

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    mocks, // highlight-line
    preserveResolvers: true
  }),
});

const { url } = await startStandaloneServer(server, { listen: { port: 7777 } });

console.log(`🚀 Server listening at: ${url}`);