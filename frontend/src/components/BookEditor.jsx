import React, { useState } from '../services/textService';
import PageEditor from './PageEditor';
import PreviewModal from './PreviewModal';

const BookEditor = () => {
  const [pages, setPages] = useState([{ image: '', text: '', cartoonImage: '' }]);
  const [showPreview, setShowPreview] = useState(false);

  const addPage = () => {
    setPages([...pages, { image: '', text: '', cartoonImage: '' }]);
  };

  const updatePage = (index, data) => {
    const newPages = [...pages];
    newPages[index] = { ...newPages[index], ...data };
    setPages(newPages);
  };

  const exportToPDF = async () => {
    const res = await fetch('http://localhost:5000/api/export/pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pages, title: 'Mein Bilderbuch' }),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Bilderbuch.pdf');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      {pages.map((page, index) => (
        <PageEditor
          key={index}
          index={index}
          page={page}
          onUpdate={(data) => updatePage(index, data)}
        />
      ))}

      <div className="flex gap-4 mt-6">
        <button onClick={addPage} className="bg-green-600 text-white px-4 py-2 rounded">
          ➕ Neue Seite
        </button>

        <button onClick={() => setShowPreview(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
          📖 Vorschau
        </button>

        <button onClick={exportToPDF} className="bg-black text-white px-4 py-2 rounded">
          📥 Als PDF exportieren
        </button>
      </div>

      {showPreview && (
        <PreviewModal pages={pages} onClose={() => setShowPreview(false)} />
      )}
    </div>
  );
};

export default BookEditor;
