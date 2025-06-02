const cartoonifyImage = async (base64Image) => {
  const response = await axios.post(
    'https://api.deepai.org/api/toonify',
    { image: base64Image },
    { headers: { 'Api-Key': process.env.DEEP_AI_KEY } }
  );
  return response.data.output_url; // ✅ Das ist cartoonUrl oben
};
