import { gql } from 'apollo-boost';
import { client } from '../../utils/client';

export const loginAdmin = async (user) => {
  const result = await client
    .mutate({
      mutation: gql`
        mutation($user: UserInput!) {
          loginAdmin(user: $user) {
            token
            id
            role
          }
        }
      `,
      variables: { user }
    })
    .then((res) => res.data.loginAdmin);
  return result;
};

export const getUserByToken = async (token) => {
  const result = await client
    .query({
      query: gql`
        query {
          getUserByToken {
            email
            firstName
            lastName
            phoneNumber
            purchasedProducts
            role
            orders
            wishlist
            credentials {
              source
            }
            address {
              country
              city
              street
              appartment
              buildingNumber
            }
          }
        }
      `,
      context: {
        headers: {
          token
        }
      }
    })
    .then((res) => res.data.getUserByToken);
  return result;
};
