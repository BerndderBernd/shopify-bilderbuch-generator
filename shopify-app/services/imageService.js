const axios = require('axios');

const cartoonifyImage = async (base64Image) => {
  try {
    const response = await axios.post(
      'https://api.deepai.org/api/toonify',
      {
        image: base64Image,
      },
      {
        headers: {
          'Api-Key': process.env.DEEP_AI_KEY,
        },
      }
    );

    return response.data.output_url;
  } catch (error) {
    console.error('❌ DeepAI Fehler:', error.response?.data || error.message);
    throw new Error('Cartoonify fehlgeschlagen');
  }
};

module.exports = { cartoonifyImage };
