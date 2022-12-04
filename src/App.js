import './App.css';
import { TreeRegister } from './components/TreeRegister';
import { Routes, Route } from 'react-router-dom'
import { Login } from './components/Login';
import { Register } from './components/Register';
import { BottomNav } from './components/BottomNav';
import { TreeList } from './components/TreeList';
import logo from './images/logo/logo.svg'
import { TreeProfile } from './components/TreeProfile';

function App() {
  
  return (
    <div className="App">
      <div className='App-upper-block'>
        <img className='App-logo' src={logo} style={{height:'70px'}} alt='' />
      </div>
      <BottomNav />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/treeregister' element={<TreeRegister />} />
        <Route path='/treelist/:id' element={<TreeProfile />} />
        <Route path='/treelist' element={<TreeList />} />
      </Routes>
    </div>
  );
}

export default App;
