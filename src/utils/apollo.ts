import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from '@apollo/client/link/error';
import { AUTH_TOKEN } from "./constants";
import { Toast } from "antd-mobile";

const uri = '/graphql';
const httpLink = createHttpLink({
  // uri: `http://${window.location.hostname}:3000/graphql`
  uri
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    Toast.show({
      content: '請求參數或者返迴的數據格式不對',
    });

    graphQLErrors.forEach((item) => {
      if (item.message === 'Unauthorized') {
        Toast.clear();
        Toast.show({
          content: '登錄失敗，請重新登入',
          duration: 3000,
        });
      }
    });
  }
  if (networkError) {
    Toast.clear();
    Toast.show({
      content: networkError.message,
      duration: 3000,
    });
  }
});

export const client = new ApolloClient({
  // uri: 'http://localhost:3000/graphql',
  // link: authLink.concat(httpLink),
  link: errorLink.concat(authLink.concat(httpLink)),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
  cache: new InMemoryCache({
    addTypename: false // addTypename設置為false時，graphql返回到前端的物件資料裡就不會加帶__typenam的屬性
  })
})