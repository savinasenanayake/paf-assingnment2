import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import CreateTicketPage from './CreateTicketPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateTicketPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
