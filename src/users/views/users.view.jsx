// vendors
import React from "react";
import { useQuery, gql } from '@apollo/client';

const USERS = gql `
  query AllUsers {
    allUsers {
      _id
      fullName
      status
      email
    }
  }
`;

const Users = () => {
  const { data } = useQuery(USERS);

  return <>{!data ? <></> : data?.allUsers?.map(user => (
    <>
      <div key={user._id}>
        {user.fullName} -&nbsp;
        {user.email}&nbsp;
        {user.status === 'PENDING' ? <button>Aceptar</button> : <></>}
      </div>
    </>
  ))}</>
};

export default Users;