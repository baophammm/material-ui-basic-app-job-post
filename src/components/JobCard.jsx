import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import { AppContext } from '../App';

const CardContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  height: '100%',
  paddingLeft: '10px',
  paddingRight: '10px',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  background: theme.palette.secondary.dark,
  color: theme.palette.primary.contrastText,
  padding: '1px',
  fontSize: '14px',
  lineHeight: '16px',
  height: 'auto',

  '&:hover': {
    background: theme.palette.secondary.light,
  },
}));

const LearnMoreContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.success.light,
  color: theme.palette.success.contrastText,
  padding: '5px',
  borderRadius: theme.shape.borderRadius,
  fontSize: '0.8rem',
  fontWeight: 'bold',
  '&:hover': {
    background: theme.palette.success.dark,
    color: theme.palette.success.contrastText,
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
  const { isSignedIn, location } = useContext(AppContext);
  return (
    <CardContainer>
      <Box sx={{ mt: 3, width: 0.9 }}>
        <Grid container alignItems="center">
          <Typography gutterBottom variant="h6" component="div">
            {job.title}
          </Typography>
        </Grid>
        <Divider variant="fullwidth" />
      </Box>

      <Box
        sx={{
          mt: 1,
          mx: 2,
          width: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'left',
        }}
      >
        <Stack direction="row" spacing={1} maxWidth useFlexGap flexWrap="wrap">
          {job.skills.slice(0, 4).map((skill, index) => (
            <SkillChip key={index} label={skill} />
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
        <Link
          className="job-modal-link"
          // to={isSignedIn ? `/job/${job.id}` : '/sign-in'}
          to={`/job/${job.id}`}
          // state={
          //   isSignedIn
          //     ? { previousLocation: location }
          //     : { previousLocation: location, from: `/job/${job.id}` }
          // }
          state={{ previousLocation: location }}
        >
          <LearnMoreContainer>LEARN MORE</LearnMoreContainer>
        </Link>
      </Box>
    </CardContainer>
  );
}
