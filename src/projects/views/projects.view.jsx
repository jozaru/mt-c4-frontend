// vedors
import React from "react";
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const VIEWER_QUERY = gql`
  query {
    viewer { 
      name
    }
  }
`;

const Projects = () => {
  const { data } = useQuery(VIEWER_QUERY);

  return (
    <>
      {data?.viewer.name}
      <Link to="/">{'Go back home'}</Link>
    </>
  )
};

export default Projects;