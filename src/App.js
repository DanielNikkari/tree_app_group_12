import './App.css';
import { TreeRegister } from './components/TreeRegister';
import { Routes, Route } from 'react-router-dom'
import { Login } from './components/Login';
import { Register } from './components/Register';
import { BottomNav } from './components/BottomNav';
import { TreeList } from './components/TreeList';
import { TreeProfile } from './components/TreeProfile';
import { Home } from './components/Home';
import { TopNav } from './components/TopNav';
import { useEffect, useState } from 'react';
import { UserProfile } from './components/UserProfile';
import logo from './images/logo/logo.svg'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    console.log("loggedInUser", JSON.stringify(loggedInUser))
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser)
      setUser(foundUser);
    }
  }, []);
  
  return (
    <div className="App">
      <div className='logo-container'>
        <img src={logo} id="App-logo" alt='logo' />
      </div>
      <BottomNav />
      {/* <TopNav user={user} /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/treeregister' element={<TreeRegister />} />
        <Route path='/treelist/:id' element={<TreeProfile />} />
        <Route path='/treelist' element={<TreeList />} />
        <Route path='/userprofile' element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
