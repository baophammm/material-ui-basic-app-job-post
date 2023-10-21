import { Container } from '@mui/system';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/system/Unstable_Grid/Grid';
import JobCard from '../components/JobCard';
import jobs from '../jobs.json';
import PaginationControlled from '../components/PaginationControlled';

const CenterArea = styled(Container)(({ theme }) => ({
  background: theme.palette.primary.main,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

function HomePage({ page, handlePageChange }) {
  const [currentJobs, setCurrentJobs] = useState([]);
  useEffect(() => {
    setCurrentJobs(jobs.slice((page - 1) * 5, page * 5));
  }, [page]);

  return (
    <>
      <CenterArea>
        <Grid container spacing={3} mt={2}>
          {currentJobs.map(job => (
            <Grid key={job.id} item xs={12} sm={6} md={4}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>
      </CenterArea>
      <PaginationControlled page={page} handlePageChange={handlePageChange} />
    </>
  );
}

export default HomePage;
