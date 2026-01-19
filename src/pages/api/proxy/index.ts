import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const baseUrl =
    'https://open.assembly.go.kr/portal/openapi/nauvppbxargkmyovh';

  const params = new URLSearchParams(req.query as Record<string, string>);
  const apiUrl = `${baseUrl}?${params.toString()}`;

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

    if (!data?.nauvppbxargkmyovh) {
      return res.status(404).json({ row: [] });
    }

    return res.status(200).json({ ...data?.nauvppbxargkmyovh['1'] });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
