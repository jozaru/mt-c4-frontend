// vedors
import React, { useCallback, useEffect, useState } from "react";
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
  const [addStar] = useMutation(ADD_START, {
    refetchQueries: [ REPOSITORIES_QUERY ]
  });
  const [removeStar] = useMutation(REMOVE_START, {
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
      <section className="grid" style={{"--bs-columns": 4, "--bs-gap": '10px 0'}}>
        <span>{'Repository name'}</span>
        <span className="g-col-3">{'Stars count'}</span>
        {data?.viewer?.repositories?.nodes?.map(({ name, stargazers, id, viewerHasStarred }) => (
        <>
          <span>{name}</span>
          <span>{stargazers.totalCount}</span>
          <span className="g-col-2">
            {viewerHasStarred ? <button className="btn btn-dark" onClick={() => removeStar({ variables: { starrableId: id } })}>Remove star</button> 
            : <button className="btn btn-dark" onClick={() => addStar({ variables: { starrableId: id } })}>Add star</button>}
          </span>
        </>
        ))}
      </section>
      <button className="btn btn-primary" onClick={() => setFirst(first + 1)}>Load more</button>
    </>
  )
};

export default Projects;