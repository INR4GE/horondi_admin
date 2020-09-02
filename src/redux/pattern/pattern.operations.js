import { gql } from '@apollo/client';
import { client } from '../../utils/client';

import { patternTranslations } from '../../translations/pattern.translations';

export const getAllPatterns = async (skip, limit) => {
  const result = await client.query({
    variables: {
      skip,
      limit
    },
    query: gql`
      query($skip: Int, $limit: Int) {
        getAllPatterns(skip: $skip, limit: $limit) {
          items {
            _id
            name {
              lang
              value
            }
            material
            available
            images {
              thumbnail
            }
          }
          count
        }
      }
    `
  });
  client.resetStore();

  return result.data.getAllPatterns;
};

export const getPatternById = async (id) => {
  const result = await client.query({
    variables: { id },
    query: gql`
      query($id: ID!) {
        getPatternById(id: $id) {
          ... on Pattern {
            _id
            name {
              value
            }
            description {
              value
            }
            material
            handmade
            available
            images {
              large
              medium
              small
              thumbnail
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
  const { data } = result;
  if (data.getPatternById.message) {
    throw new Error(
      `${data.getPatternById.statusCode} ${
        patternTranslations[data.getPatternById.message]
      }`
    );
  }

  return data.getPatternById;
};

export const deletePattern = async (id) => {
  const result = await client.mutate({
    variables: { id },
    mutation: gql`
      mutation($id: ID!) {
        deletePattern(id: $id) {
          ... on Pattern {
            _id
            name {
              lang
              value
            }
            material
            available
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

  if (data.deletePattern.message) {
    throw new Error(
      `${data.deletePattern.statusCode} ${
        patternTranslations[data.deletePattern.message]
      }`
    );
  }

  return data.deletePattern;
};

export const createPattern = async (pattern) => {
  const result = await client.mutate({
    mutation: gql`
      mutation($pattern: PatternInput!) {
        addPattern(pattern: $pattern) {
          ... on Pattern {
            _id
            name {
              lang
              value
            }
            material
            available
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: { pattern }
  });
  client.resetStore();
  const { data } = result;

  if (data.addPattern.message) {
    throw new Error(
      `${data.addPattern.statusCode} ${
        patternTranslations[data.addPattern.message]
      }`
    );
  }

  return data.addPattern;
};

export const updatePattern = async (id, pattern) => {
  const result = await client.mutate({
    variables: {
      id,
      pattern
    },
    mutation: gql`
      mutation($id: ID!, $pattern: PatternInput!) {
        updatePattern(id: $id, pattern: $pattern) {
          ... on Pattern {
            _id
            name {
              lang
              value
            }
            material
            available
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

  if (data.updatePattern.message) {
    throw new Error(
      `${data.updatePattern.statusCode} ${
        patternTranslations[data.updatePattern.message]
      }`
    );
  }

  return data.updatePattern;
};