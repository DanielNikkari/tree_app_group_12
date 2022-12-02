import logo from './logo.svg';
import './App.css';
import { TreeRegister } from './components/TreeRegister';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/treeregister' element={<TreeRegister />} />
      </Routes>
    </div>
  );
}

export default App;
