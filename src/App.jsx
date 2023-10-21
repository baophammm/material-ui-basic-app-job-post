import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import SearchAppBar from './components/SearchAppBar';

import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobDetailPage from './pages/JobDetailPage';
import PaginationControlled from './components/PaginationControlled';
import { useState } from 'react';

const theme = createTheme({
  shape: { borderRadius: 32 },
  palette: { backgroundColor: 'black' },
});

function App() {
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="App">
      <SearchAppBar />
      <div style={{ marginTop: '40px' }}>
        <Routes className="routes-component">
          <Route
            path="/"
            element={
              <HomePage page={page} handlePageChange={handlePageChange} />
            }
          />
          <Route path="/job/:jobId" element={<JobDetailPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
