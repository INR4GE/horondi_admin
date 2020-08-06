import { gql } from 'apollo-boost';
import { client } from '../../utils/client';
import { config } from '../../configs';

const { errorsLanguage } = config;

const getAllNews = async () => {
  const result = await client.query({
    query: gql`
      {
        getAllNews {
          _id
          author {
            name {
              lang
              value
            }
            image {
              small
            }
          }
          title {
            lang
            value
          }
        }
      }
    `
  });
  const { data } = result;
  return data.getAllNews;
};

const getArticleById = async (id) => {
  const result = await client.query({
    variables: { id },
    query: gql`
      query($id: ID!) {
        getNewsById(id: $id) {
          ... on News {
            __typename
            title {
              lang
              value
            }
            text {
              lang
              value
            }
            images {
              primary {
                medium
              }
              additional {
                large
              }
            }
            video
            author {
              name {
                lang
                value
              }
              image {
                small
              }
            }
            date
          }
          ... on Error {
            __typename
            message
            statusCode
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  const { data } = result;

  if (data.getNewsById.message) {
    throw new Error(data.getNewsById.message[errorsLanguage].value);
  }

  return data.getNewsById;
};

const deleteArticle = async (id) => {
  const result = await client.mutate({
    variables: { id },
    mutation: gql`
      mutation($id: ID!) {
        deleteNews(id: $id) {
          ... on News {
            author {
              name {
                value
              }
            }
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  client.resetStore();
  const { data } = result;

  if (data.deleteNews.message) {
    throw new Error(data.deleteNews.message[errorsLanguage].value);
  }

  return data.deleteNews;
};

const createArticle = async (news) => {
  const result = await client.mutate({
    mutation: gql`
      mutation($news: NewsInput!) {
        addNews(news: $news) {
          ... on News {
            author {
              name {
                value
              }
            }
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: { news }
  });
  client.resetStore();
  const { data } = result;
  return data.addNews;
};

const updateArticle = async (id, news) => {
  const result = await client.mutate({
    variables: {
      id,
      news
    },
    mutation: gql`
      mutation($id: ID!, $news: NewsInput!) {
        updateNews(id: $id, news: $news) {
          ... on News {
            author {
              name {
                value
              }
            }
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  client.resetStore();
  const { data } = result;

  if (data.updateNews.message) {
    throw new Error(data.updateNews.message[errorsLanguage].value);
  }

  return data.updateNews;
};

export {
  getAllNews,
  deleteArticle,
  getArticleById,
  createArticle,
  updateArticle
};
