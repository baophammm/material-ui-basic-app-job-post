import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../App';
import { IconButton, Menu, MenuItem } from '@mui/material';

const SearchAppBarBox = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  background: theme.palette.primary.dark,
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

const AccountBox = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  padding: 3,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer',
  },
}));

const StyledLoginInIcon = styled(LoginIcon)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  width: '36px',
  height: 'auto',
  padding: '5px',
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));
const StyledLogoutIcon = styled(LogoutIcon)(({ theme }) => ({
  width: '36px',
  height: 'auto',
  padding: '5px',
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

export default function SearchAppBar() {
  const {
    isSignedIn,
    setIsSignedIn,
    loginData,
    searchParams,
    setSearchParams,
    location,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSignOutButton = () => {
    setIsSignedIn(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <SearchAppBarBox>
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Grid item xs={10} sm={11} md={8.5} sx={{ flexGrow: 1 }}>
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
                id="search-input"
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                fullWidth
                value={searchParams.get('filter') || ''}
                onChange={event => {
                  let filter = event.target.value;
                  if (filter) {
                    setSearchParams({ filter });
                  } else {
                    setSearchParams({});
                  }
                }}
              />
            </Search>
          </Toolbar>
        </Grid>
        <Grid
          item
          md={3.5}
          sx={{
            display: { xs: 'none', sm: 'none', md: 'flex' },
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          {!isSignedIn ? (
            <Box
              sx={{
                width: '300px',
                pr: '10px',
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
              }}
            >
              <Link
                className="signin-modal-link"
                to="/sign-in"
                state={{ previousLocation: location }}
              >
                <AccountBox aria-label="open drawer" width={'110px'}>
                  <StyledLoginInIcon />
                  <Typography className="sign-in-text">Sign in</Typography>
                </AccountBox>
              </Link>
            </Box>
          ) : (
            <Box
              sx={{
                width: '300px',
                pr: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <AccountCircleIcon />
              <Typography>{loginData.username}</Typography>

              <AccountBox
                aria-label="open drawer"
                width={'110px'}
                onClick={handleSignOutButton}
              >
                <StyledLogoutIcon />
                <Typography>Sign out</Typography>
              </AccountBox>
            </Box>
          )}
        </Grid>
        <Grid
          item
          xs={2}
          sm={1}
          sx={{
            height: '100%',
            display: { sm: 'flex', md: 'none' },
            justifyContent: 'left',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          {!isSignedIn ? (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link
                  className="signin-modal-link"
                  to="/sign-in"
                  state={{ previousLocation: location }}
                >
                  <AccountBox aria-label="open drawer" width={'110px'}>
                    <StyledLoginInIcon />
                    <Typography className="sign-in-text">Sign in</Typography>
                  </AccountBox>
                </Link>
              </MenuItem>
            </Menu>
          ) : (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                onClick={handleClose}
                sx={{ color: 'primary.contrastText' }}
              >
                <AccountCircleIcon />
                <Typography>{loginData.username}</Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <AccountBox
                  aria-label="open drawer"
                  width={'110px'}
                  onClick={handleSignOutButton}
                >
                  <StyledLogoutIcon />
                  <Typography>Sign out</Typography>
                </AccountBox>
              </MenuItem>
            </Menu>
          )}
        </Grid>
      </Grid>
    </SearchAppBarBox>
  );
}
