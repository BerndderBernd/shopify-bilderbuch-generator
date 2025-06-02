import axios from 'axios';
import React, { useState } from 'react';
import PageEditor from './PageEditor';
import PreviewModal from './PreviewModal';

const BookEditor = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1];

      try {
        const response = await axios.post(
          'https://shopify-bilderbuch-generator.onrender.com/api/cartoonify',
          { image: base64Image }
        );

        console.log('✅ Cartoonify Antwort:', response.data);
        setImageUrl(response.data.image_url); // ✅ image_url ist das was vom Backend zurückkommt
      } catch (err) {
        console.error('❌ Cartoonify Fehler:', err.response?.data || err.message);
        alert('Cartoonisierung fehlgeschlagen');
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageUrl && <img src={imageUrl} alt="Cartoonisiertes Bild" style={{ maxWidth: '100%' }} />}
    </div>
  );
};

export default BookEditor;
