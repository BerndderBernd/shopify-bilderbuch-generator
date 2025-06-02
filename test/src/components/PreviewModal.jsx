import React from 'react';

const PreviewModal = ({ pages, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-4/5 max-h-[90vh] overflow-y-auto p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">📖 Vorschau deines Buchs</h2>

        {pages.map((page, index) => (
          <div key={index} className="mb-6 border-b pb-4">
            <h3 className="text-lg font-semibold mb-2">Seite {index + 1}</h3>
            {page.cartoonImage && (
              <img src={page.cartoonImage} alt={`Seite ${index + 1}`} className="max-w-md mb-2" />
            )}
            <p className="text-gray-800 whitespace-pre-line">{page.text}</p>
          </div>
        ))}

        <div className="text-center mt-6">
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            ❌ Vorschau schließen
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
