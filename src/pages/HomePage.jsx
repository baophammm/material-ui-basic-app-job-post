import { Container } from '@mui/system';
import { styled } from '@mui/material/styles';
import React, { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import JobCard from '../components/JobCard';
import jobs from '../jobs.json';
import PaginationControlled from '../components/PaginationControlled';
import { AppContext } from '../App';

const CenterArea = styled(Container)(({ theme }) => ({
  background: 'inherit',
  width: '100%',
  marginBottom: 24,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

function HomePage() {
  const { page, searchParams } = useContext(AppContext);
  const [currentJobs, setCurrentJobs] = useState([]);

  useEffect(() => {
    setCurrentJobs(
      jobs
        .filter(job => {
          let filter = searchParams.get('filter');
          if (!filter) return true;
          let title = job.title.toLowerCase();
          return title.includes(filter.toLowerCase());
        })
        .slice((page - 1) * 5, page * 5)
    );
  }, [page, searchParams]);

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
      <PaginationControlled />
    </>
  );
}

export default HomePage;
