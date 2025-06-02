const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateStoryText = async (prompt) => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: `Schreibe eine kindgerechte Seite im Bilderbuch-Stil basierend auf: ${prompt}`,
        },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    return chatCompletion.choices[0].message.content.trim();
  } catch (err) {
    console.error('❌ Fehler bei GPT-Anfrage:', err);
    throw new Error('Textgenerierung fehlgeschlagen');
  }
};

module.exports = { generateStoryText };
