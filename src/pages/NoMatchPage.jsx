import { Box, styled } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const StyledBox = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  padding: '2rem',
}));

function NoMatchPage() {
  return (
    <StyledBox>
      <h2>There's nothing here</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </StyledBox>
  );
}

export default NoMatchPage;
