import React from 'react';
import BookEditor from './components/BookEditor';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📘 Dein KI-Bilderbuch</h1>
      <BookEditor />
    </div>
  );
}

export default App;
