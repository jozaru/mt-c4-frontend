// vendors
import React from "react";
import { useQuery, gql } from '@apollo/client';

const USERS = gql `
  query AllUsers {
    allUsers {
      fullName
    }
  }
`;

const Users = () => {
  const { data, loading } = useQuery(USERS);
  console.log(data);

  return <>{loading ? <></> : 'Usuarios'}</>
};

export default Users;