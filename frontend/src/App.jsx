import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookEditor from './components/BookEditor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
