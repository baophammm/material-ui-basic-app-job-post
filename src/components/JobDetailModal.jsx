import React, { useRef } from 'react';
import jobs from '../jobs.json';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { styled, Container, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import TagIcon from '@mui/icons-material/Tag';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import { Box, Stack } from '@mui/system';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useEffect } from 'react';

const ModalWrapperBox = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,

  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  WebkitOverflowScrolling: 'touch',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ModalBox = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
  width: '95%',
  maxWidth: '800px',
  height: '90%',
  maxHeight: '500px',
  padding: 10,
}));

const JobContainer = styled(Container)(({ theme }) => ({
  fontSize: '0.9rem',
  lineHeight: '1rem',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
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

function JobDetailModal() {
  const modalRef = useRef();
  const navigate = useNavigate();
  const params = useParams();
  const jobId = params.jobId;
  const job = jobs.find(job => job.id === jobId);
  const jobDetailLocation = useLocation();

  useEffect(() => {
    const observeRefValue = modalRef.current;
    disableBodyScroll(observeRefValue);
    return () => {
      if (observeRefValue) {
        enableBodyScroll(observeRefValue);
      }
    };
  }, []);
  return (
    <ModalWrapperBox ref={modalRef} onClick={() => navigate('/')}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <JobContainer>
          <Typography variant="h5" sx={{ width: '100%' }}>
            {job.title}
          </Typography>
          <Box margin={3} display={'flex'} sx={{ width: '100%' }}>
            <TagIcon />
            <Stack
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'left',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              {job.skills.map((skill, index) => (
                <SkillChip key={index} label={skill} />
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
      </ModalBox>
    </ModalWrapperBox>
  );
}

export default JobDetailModal;
