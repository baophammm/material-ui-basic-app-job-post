import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import jobs from '../jobs.json';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import { AppContext } from '../App';

const PaginationStack = styled(Stack)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const PaginationSection = styled(Pagination)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  background: theme.palette.primary.lighter,
  borderRadius: '8px',
  height: '2.3rem',
  padding: '3px',
}));

export default function PaginationControlled() {
  const { page, handlePageChange, searchParams } = useContext(AppContext);

  return (
    <PaginationStack spacing={2}>
      <Typography>Page: {page}</Typography>
      <PaginationSection
        count={Math.ceil(
          jobs.filter(job => {
            let filter = searchParams.get('filter');
            if (!filter) return true;
            let title = job.title.toLowerCase();
            return title.includes(filter.toLowerCase());
          }).length / 5
        )}
        page={page}
        color="secondary"
        onChange={handlePageChange}
      />
    </PaginationStack>
  );
}
