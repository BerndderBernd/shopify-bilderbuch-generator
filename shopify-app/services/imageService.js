const axios = require('axios');

const cartoonifyImage = async (base64Image) => {
  const response = await axios.post(
    'https://api.deepai.org/api/toonify',
    { image: base64Image },
    {
      headers: {
        'Api-Key': process.env.DEEP_AI_KEY, // 🔐 DEEP_AI_KEY MUSS in Render konfiguriert sein!
      },
    }
  );

  return response.data.output_url; // ✅ Rückgabe-URL vom cartoonisierten Bild
};

module.exports = { cartoonifyImage };
