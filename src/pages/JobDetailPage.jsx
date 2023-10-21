import React from 'react';
import jobs from '../jobs.json';
import { useParams } from 'react-router-dom';
import { styled, Container, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import TagIcon from '@mui/icons-material/Tag';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import { Box, Stack } from '@mui/system';

const JobContainer = styled(Container)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  background: theme.palette.primary.light,
  fontSize: '1.4rem',
  width: '100%',
  maxWidth: '1200px',
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  background: theme.palette.secondary.dark,
  color: theme.palette.secondary.contrastText,
  height: '100%',
  marginLeft: '5px',
  '&:hover': {
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText,
    cursor: 'pointer',
  },
}));

function JobDetailPage({ handleClick }) {
  const params = useParams();
  const jobId = params.jobId;
  const job = jobs.find(job => job.id === jobId);

  return (
    <JobContainer>
      <Typography variant="h2">{job.title}</Typography>
      <Box margin={3} display={'flex'}>
        <TagIcon />
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'left',
            alignItems: 'center',
          }}
        >
          {job.skills.map((skill, index) => (
            <SkillChip key={index} label={skill} onClick={handleClick} />
          ))}
        </Stack>
      </Box>
      <Box margin={3}>
        <BusinessIcon />
        {job.companyId}
      </Box>
      <Box margin={3}>
        <LocationOnIcon /> {job.city}
      </Box>
      <Box margin={3}>
        <AttachMoneyIcon /> {job.salaryLow} VND - {job.salaryHigh} VND
      </Box>
      <Box margin={3}>
        <DescriptionIcon /> Job Description:
        <br />
        {job.description}
      </Box>
    </JobContainer>
  );
}

export default JobDetailPage;
