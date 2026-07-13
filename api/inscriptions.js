const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyxkQZeY_8hpvjr4n58hiUuzkUFHaeR5rpl9XaeSOGBskjhYZUlxhd1rIr2reSpCPa4FA/exec';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const params = new URLSearchParams(req.query).toString();
    const response = await fetch(`${APPS_SCRIPT_URL}?${params}`, { redirect: 'follow' });
    const text = await response.text();
    const data = JSON.parse(text);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(200).json({ status: 'success' });
  }
}
