// vedors
import React, { useCallback, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useMutation, useQuery, gql } from '@apollo/client';

// styles
import 'projects/styles/projects.styles.scss';

const REPOSITORIES_QUERY = gql`
  query MyRepositories ($first: Int!){
    viewer { 
      name
      repositories (first: $first){
        nodes {
          id
          name
          viewerHasStarred
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
  const { data, refetch } = useQuery(REPOSITORIES_QUERY, { variables: { first } });
  const [addStart] = useMutation(ADD_START, {
    refetchQueries: [ REPOSITORIES_QUERY ]
  });
  const [removeStart] = useMutation(REMOVE_START, {
    refetchQueries: [ REPOSITORIES_QUERY ]
  });

  const memoizedRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if(first > 1) {
      memoizedRefetch();
    }
  }, [first, memoizedRefetch]);

  return (
    <>
      <section className="list-container">
        <span>{'Repository name'}</span>
        <span>{'Starts count'}</span>
        <span></span>
        {data?.viewer?.repositories?.nodes?.map(({ name, stargazers, id, viewerHasStarred }) => (
        <>
          {name}
          <span>{stargazers.totalCount}</span>
          {viewerHasStarred ? <button onClick={() => removeStart({ variables: { starrableId: id } })}>Remove start</button> 
          : <button onClick={() => addStart({ variables: { starrableId: id } })}>add start</button>}
        </>
        ))}
      </section>
      <button onClick={() => setFirst(first + 1)}>Load more</button>
      <Link to="/">{'Go back home'}</Link>
    </>
  )
};

export default Projects;