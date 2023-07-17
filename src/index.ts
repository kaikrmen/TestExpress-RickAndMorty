import app from "./app";
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import axios from 'axios';
import cors from 'cors';

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

const root = {
  characters: async ({ page, pageSize }: { page: number, pageSize: number }) => {
    try {
      const response = await axios.get('https://rickandmortyapi.com/graphql', {
        params: {
          query: `
            query {
              characters(page: ${page}, filter: {species: "Human"}) {
                info {
                  count
                }
                results {
                  id
                  name
                  status
                  species
                  image
                }
              }
            }
          `
        }
      });

      const { count } = response.data.data.characters.info;
      const characters = response.data.data.characters.results;

      return {
        characters,
        total: count,
      };
    } catch (error) {
      console.error(error);
      return {
        characters: [],
        total: 0,
      };
    }
  },
  character: async ({ id }: { id: number }) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/graphql`, {
        params: {
          query: `
            query {
              character(id: ${id}) {
                id
                name
                status
                species
                image
              }
            }
          `
        }
      });

      return response.data.data.character;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
  
  app.use('/graphql', cors(), graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  }));

const main = () => { 
    try {
        app.listen(app.get('port'));
        console.log("server listening on port", app.get('port'));
    } catch (error) {
        console.log(error);
    }
}

main();