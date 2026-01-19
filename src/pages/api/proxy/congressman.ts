import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const baseUrl = 'https://sisso-api.shop/api/v1';
  const params = new URLSearchParams(req.query as Record<string, string>);
  const apiUrl = `${baseUrl}/congressman?${params.toString()}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json({ ...data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
