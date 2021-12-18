// vendors
import React from "react";
import { useQuery, gql, useMutation } from '@apollo/client';

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

const UPDATE_USER = gql`
  mutation ActivateUser($userId: ID) {
    activateUser(userId: $userId) {
      _id
      status
    }
  }
`;

const Users = () => {
  const { data } = useQuery(USERS);
  const [activateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [ { query: USERS } ],
  });

  const handleActivate = (userId) => {
    activateUser({
      variables: {
        userId,
      }
    });
  };

  return <>{!data ? <></> : data?.allUsers?.map(user => (
    <>
      <div key={user._id}>
        {user.fullName} -&nbsp;
        {user.email}&nbsp;
        {user.status === 'PENDING' ? <button onClick={() => handleActivate(user._id)}>Aceptar</button> : <></>}
      </div>
    </>
  ))}</>
};

export default Users;