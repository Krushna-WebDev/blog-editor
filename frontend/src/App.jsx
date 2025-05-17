import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EditBlog from './pages/EditBlog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import once in your app entry file

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<EditBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;