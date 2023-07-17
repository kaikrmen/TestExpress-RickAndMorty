
# Pruba rick and morty, hecho en express y typescript

Se inicia el servidor en modo de prueva con npm run dev

Definición del esquema:
const schema = buildSchema(`
  type Character {
    id: ID!
    name: String!
    status: String!
    species: String!
    image: String!
    type: String!
  }

  type CharacterPage {
    characters: [Character!]!
    total: Int!
  }

  type Query {
    characters(page: Int!, pageSize: Int!): CharacterPage!
    character(id: ID!): Character
  }
`);

Aquí se implementa el servidor GraphQL utilizando app, una instancia de Express. Se define una ruta de '/graphql' y se utiliza graphqlHTTP para manejar las solicitudes entrantes. Se especifica el esquema y el rootValue definidos anteriormente, y graphiql se establece en true para habilitar la herramienta GraphiQL.

Implementación del servidor:
app.use('/graphql', cors(), graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));


Para realizar la consulta en GraphiQL

query {
  characters(page: 1, pageSize: 10) {
    characters {
      id
      name
      species
      status
      image
    }
    total
  }
}
