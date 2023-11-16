import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetAllData {
    user {
      id
      name
      email
      password
    }
  }
`;

export const INSERT_USER = gql`
  mutation TambahUser( $name: String!, $email: String!, $password: String!) {
    insert_user(objects: { name: $name, password: $password, email: $email}) {
      returning {
        name
        email
        password
      }
    }
  }
`;

export const CHECK_USER_EXISTS = gql`
  query CheckUserExists($email: String!) {
    user(where: { email: { _eq: $email } }) {
      id
    }
  }
`;

export const LOGIN_USER = gql`
  query LoginUser($email: String!, $password: String!) {
    user(where: { email: { _eq: $email }, password: { _eq: $password } }) {
      id
      name
      email
    }
  }
`;
