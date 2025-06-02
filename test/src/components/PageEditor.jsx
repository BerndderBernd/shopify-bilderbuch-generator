import React, { useState } from 'react';

const PageEditor = ({ index, page, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/cartoonify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64Image: base64 }),
        });
        const data = await res.json();
        onUpdate({ image: base64, cartoonImage: data.cartoonImage });
      } catch (err) {
        console.error('Fehler bei Cartoonify:', err);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTextChange = (e) => {
    onUpdate({ text: e.target.value });
  };

  const suggestText = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/textgen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `Seite ${index + 1}` }),
      });
      const data = await res.json();
      onUpdate({ text: data.suggestion });
    } catch (err) {
      console.error('Fehler bei Textvorschlag:', err);
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded mb-6">
      <h2 className="font-semibold mb-2">🖼️ Seite {index + 1}</h2>

      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {loading && <p className="text-sm text-gray-500 mt-2">⏳ Umwandlung läuft...</p>}

      {page.cartoonImage && (
        <img src={page.cartoonImage} alt="Cartoon" className="mt-3 max-w-sm" />
      )}

      <textarea
        className="w-full p-2 mt-4 border rounded"
        placeholder="Text für diese Seite..."
        rows={4}
        value={page.text}
        onChange={handleTextChange}
      />

      <button
        onClick={suggestText}
        className="mt-2 bg-purple-600 text-white px-3 py-1 rounded"
      >
        ✨ Textvorschlag
      </button>
    </div>
  );
};

export default PageEditor;
