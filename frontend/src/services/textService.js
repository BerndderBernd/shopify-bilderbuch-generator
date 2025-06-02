const API_BASE = 'https://shopify-bilderbuch-generator.onrender.com'

export async function getTextSuggestion(prompt) {
  const res = await fetch(`${API_BASE}/api/text-suggest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt })
  })
  return await res.json()
}