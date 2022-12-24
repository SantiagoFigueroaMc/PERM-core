import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Container } from '@mui/material';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import { useState } from 'react';
import Welcome from './components/Welcome';

function App() {
  const [page, setPage] = useState("tasks")

  return (
    <BrowserRouter>
    <NavBar currentPage={page}/>
      <Container>
      <Routes>
        <Route path='/' element={<Welcome setPage={setPage}/>}/>
        <Route path='/tasks' element={<TaskList  setPage={setPage}/>}/>
        <Route path='/task/new' element={<TaskForm/>}/>
        <Route path='/task/:id/edit' element={<TaskForm/>}/>
        <Route path='/users/' element={<UserList setPage={setPage}/>}/>
        <Route path='/user/new' element={<UserForm/>}/>
        <Route path='/user/:id/edit' element={<UserForm/>}/>
      </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
