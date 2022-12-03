import './App.css';
import { TreeRegister } from './components/TreeRegister';
import { Routes, Route } from 'react-router-dom'
import { Login } from './components/Login';
import { Register } from './components/Register';
import { BottomNav } from './components/BottomNav';
import { TreeList } from './components/TreeList';
import logo from './images/logo/logo.svg'

function App() {
  return (
    <div className="App">
      <img className='App-logo' src={logo} style={{height:'70px'}} alt='' />
      <BottomNav />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/treeregister' element={<TreeRegister />} />
        <Route path='/treelist' element={<TreeList />} />
      </Routes>
    </div>
  );
}

export default App;
