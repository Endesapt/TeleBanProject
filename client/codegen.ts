import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [process.env.REACT_APP_GRAPHQL_URL??'http://localhost:5095/graphql','./client-schema.graphql'],
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;
