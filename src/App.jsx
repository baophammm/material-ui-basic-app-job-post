import './App.css';
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useState, createContext } from 'react';
import { styled, Box } from '@mui/material';
import SearchAppBar from './components/SearchAppBar';
import JobDetailModal from './components/JobDetailModal';
import SignInModal from './components/SignInModal';
import HomePage from './pages/HomePage';
import NoMatchPage from './pages/NoMatchPage';
import { useContext } from 'react';
import { fakeAuthProvider } from './auth';

export const AppContext = createContext();
export const AuthContext = createContext();

function App() {
  const [page, setPage] = useState(1);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  function useAuth() {
    return useContext(AuthContext);
  }

  const [loginData, setLoginData] = useState({
    username: 'web virgil learner',
    password: '123456',
  });
  let [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  const previousLocation = location.state?.previousLocation;

  return (
    <Box>
      <AppContext.Provider
        value={{
          page,
          setPage,
          handlePageChange,
          isSignedIn,
          setIsSignedIn,
          loginData,
          setLoginData,
          location,
          searchParams,
          setSearchParams,
          useAuth,
        }}
      >
        <SearchAppBar />
        <Box sx={{ height: '100%', marginTop: '40px' }}>
          <Routes
            location={previousLocation || location}
            styled={{ height: '100%' }}
            className="routes-component"
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<NoMatchPage />} />
          </Routes>
          {previousLocation && (
            <Routes>
              <Route
                path="/job/:jobId"
                element={
                  <RequireAuth>
                    <JobDetailModal />
                  </RequireAuth>
                }
              />
              <Route path="/sign-in" element={<SignInModal />} />
            </Routes>
          )}
        </Box>
      </AppContext.Provider>
    </Box>
  );
}

export default App;

function AuthProvider({ children }) {
  const [user, setUser] = useState('');
  // const [password, setPassword] = useState('');

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      // setPassword(newPassword);
      callback();
    });
  };

  let signout = callback => {
    return fakeAuthProvider.signout(() => {
      setUser('');
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// function RequireAuth({ children }) {
//   const auth = useContext(AuthContext);
//   let location = useLocation();

//   if (!auth.user) {
//     // Redirect them to the /login page, but save the current location they were
//     // trying to go to when they were redirected. This allows us to send them
//     // along to that page after they login, which is a nicer user experience
//     // than dropping them off on the home page.
//     return <Navigate to="/sign-in" state={{ from: location }} replace />;
//   }

//   return children;
// }
function RequireAuth({ children }) {
  const { isSignedIn, location } = useContext(AppContext);
  const jobLocation = useLocation();
  if (!isSignedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return (
      <Navigate
        to="/sign-in"
        state={{
          previousLocation: location.state.previousLocation,
          from: jobLocation,
        }}
        replace
      />
    );
  }

  return children;
}
