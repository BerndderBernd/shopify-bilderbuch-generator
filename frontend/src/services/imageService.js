const API_BASE = 'https://shopify-bilderbuch-generator.onrender.com'

export async function convertImageToCartoon(base64Image) {
  const res = await fetch(`${API_BASE}/api/image-transform`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ image: base64Image })
  })
  return await res.json()
}