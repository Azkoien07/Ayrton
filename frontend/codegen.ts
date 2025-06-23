import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:8081/graphql', // Endpoint GraphQL de Spring Boot
  documents: ['src/app/Graphql/**/*.ts'],
  generates: {
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        skipTypename: true,
        omitTypename: true,
      },
    },
  },
};

export default config;