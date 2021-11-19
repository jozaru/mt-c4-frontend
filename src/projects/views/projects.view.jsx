// vedors
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useMutation, useQuery, gql } from '@apollo/client';

const REPOSITORIES_QUERY = gql`
  query MyRepositories ($first: Int!){
    viewer { 
      name
      repositories (first: $first){
        nodes {
          id
          name
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;

const ADD_START = gql`
  mutation AddStart($starrableId: ID!) {
    addStar(input: {
      starrableId: $starrableId
    }) {
      starrable {
        stargazers {
          totalCount
        }
      }
    }
  }
`;

const REMOVE_START = gql`
  mutation RemoveStart($starrableId: ID!) {
    removeStar(input: {
      starrableId: $starrableId
    }) {
      starrable {
        stargazers {
          totalCount
        }
      }
    }
  }
`;

const Projects = () => {
  const [first, setFirst] = useState(1);
  const [starrableId, setStarrableId] = useState();
  const [starrableIdRemove, setStarrableIdRemove] = useState();
  const { data, loading, refetch } = useQuery(REPOSITORIES_QUERY, { variables: { first } });
  const [addStart] = useMutation(ADD_START, {
    variables: {
      starrableId
    },
    refetchQueries: [
      REPOSITORIES_QUERY,
      'MyRepositories'
    ]
  });
  const [removeStart] = useMutation(REMOVE_START, {
    variables: {
      starrableId: starrableIdRemove
    },
    refetchQueries: [
      REPOSITORIES_QUERY,
      'MyRepositories'
    ]
  });

  useEffect(() => {
    refetch()
  }, [first]);

  useEffect(() => {
    if(starrableId) {
      addStart();
    }
  }, [starrableId]);

  useEffect(() => {
    if(starrableIdRemove) {
      removeStart();
    }
  }, [starrableIdRemove]);

  return (
    <>
      {loading ? '' : data.viewer.name}
      <ul>
        {data?.viewer?.repositories?.nodes?.map(({ name, stargazers, id }) => (
          <li>{name} - <span>Starts: {stargazers.totalCount}</span> <button onClick={() => setStarrableId(id)}>add start</button> <button onClick={() => setStarrableIdRemove(id)}>Remove start</button>
          </li>
        ))}
      </ul>
      <button onClick={() => setFirst(first + 1)}>Load more</button>
      <Link to="/">{'Go back home'}</Link>
    </>
  )
};

export default Projects;