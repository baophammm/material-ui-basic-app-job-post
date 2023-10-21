import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/system/Unstable_Grid/Grid';

const SearchAppBarBox = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  background: theme.palette.primary.light,
  width: '100%',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const navigate = useNavigate();

  return (
    <SearchAppBarBox>
      {/* <AppBar position="fixed" sx={{ display: 'flex', flexDirection: 'row' }}> */}
      <Grid container spacing={2}>
        <Grid item xs={7.5} sm={9} md={10}>
          <Toolbar sx={{ width: '100%' }}>
            <Typography
              onClick={() => navigate(`/`)}
              variant="h6"
              noWrap
              component="div"
              sx={{
                cursor: 'pointer',
                flexGrow: 0,
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Job Routing
            </Typography>
            <Search sx={{ flexGrow: 1 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                width={1}
              />
            </Search>
          </Toolbar>
        </Grid>
        <Grid item xs={4.5} sm={3} md={2}>
          <Box
            color="inherit"
            aria-label="open drawer"
            sx={{
              p: 3,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <LoginIcon /> {'  |  '} Sign in
          </Box>
        </Grid>
      </Grid>
    </SearchAppBarBox>
  );
}
