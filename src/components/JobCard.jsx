import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const CardContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  width: '100%',
  height: '100%',
  bgcolor: 'background.paper',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  background: theme.palette.secondary.dark,
  color: theme.palette.primary.contrastText,
  p: '1px',
  fontSize: '14px',
  lineHeight: '16px',
  height: 'auto',

  '&:hover': {
    background: theme.palette.secondary.light,
  },
}));

const LearnMoreButton = styled(Button)(({ theme }) => ({
  background: theme.palette.success.light,
  '&:hover': {
    background: theme.palette.success.dark,
    color: theme.palette.success.contrastText,
  },
}));

export default function JobCard({ job }) {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const navigate = useNavigate();

  return (
    <CardContainer>
      <Box sx={{ mt: 3, width: 0.9 }}>
        <Grid container alignItems="center">
          <Typography gutterBottom variant="h6" component="div">
            {job.title}
          </Typography>
        </Grid>
        <Divider variant="fullWidth" />
      </Box>

      <Box
        sx={{
          mt: 1,
          mx: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'left',
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            width: 1,
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
          }}
        >
          {job.skills.slice(0, 4).map((skill, index) => (
            <SkillChip key={index} label={skill} onClick={handleClick} />
          ))}
        </Stack>
        <Typography
          color="text.secondary"
          variant="body2"
          sx={{
            color: 'white',
            mt: 3,
          }}
        >
          {job.description}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 3,
          ml: 1,
          mb: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LearnMoreButton onClick={() => navigate(`/job/${job.id}`)}>
          LEARN MORE
        </LearnMoreButton>
      </Box>
    </CardContainer>
  );
}
