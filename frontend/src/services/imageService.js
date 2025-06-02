const axios = require('axios');

const cartoonifyImage = async (base64Image) => {
  const response = await axios.post(
    'https://api.deepai.org/api/toonify',
    { image: base64Image },
    {
      headers: {
        'Api-Key': process.env.DEEP_AI_KEY,
      },
    }
  );
  return response.data.output_url;
};

module.exports = { cartoonifyImage };
