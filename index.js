/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import MyApp from './App';
import {name as appName} from './app.json';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        launchesPast: {
          keyArgs: [],
          merge(existing, incoming, {args: {offset = 0}}) {
            // Slicing is necessary because the existing data is
            // immutable, and frozen in development.
            const merged = existing ? existing.slice(0) : [];
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i];
            }
            return merged;
          },
        },
      },
    },
  },
});

// Initialize Apollo Client
const client = new ApolloClient({
  // uri: 'https://api.graphql.guide/graphql',
  uri: 'https://api.spacex.land/graphql',
  cache: cache,
});

const App = () => (
  <ApolloProvider client={client}>
    <MyApp />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => App);
