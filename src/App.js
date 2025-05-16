import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import UserPage from './components/UserPage';
import AdminPage from './components/AdminPage';
import './App.css';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Excel 함수 생성 도우미
          </Typography>
          <Button color="inherit" component={Link} to="/">
            사용자 페이지
          </Button>
          <Button color="inherit" component={Link} to="/admin">
            관리자 페이지
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container>
        <Box mt={4}>
          <Routes>
            <Route path="/" element={<UserPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App; 