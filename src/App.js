import logo from './logo.svg';
import './App.css';
import { TreeRegister } from './components/TreeRegister';
import { Routes, Route } from 'react-router-dom'
import { Login } from './components/Login';
import { Register } from './components/Register';
import { BottomNav } from './components/BottomNav';

function App() {
  return (
    <div className="App">
      <BottomNav />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/treeregister' element={<TreeRegister />} />
      </Routes>
    </div>
  );
}

export default App;
