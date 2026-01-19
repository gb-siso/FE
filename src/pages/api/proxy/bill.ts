import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const baseUrl =
      'https://open.assembly.go.kr/portal/openapi/nzmimeepazxkubdpn';

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
      if (data['RESULT']) {
        return res.status(200).json({ row: [] });
      }

      return res.status(200).json({ ...data['nzmimeepazxkubdpn'][1] });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { body } = JSON.parse(JSON.stringify(req.body));
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      );

      const result = [];
      for (let i of body) {
        await page.goto(i.link, {
          waitUntil: 'domcontentloaded'
        });
        const content = await page.$eval(
          '#summaryContentDiv',
          (element: any) => element.innerText
        );
        i['bill'] = content;
        result.push(i);
      }

      await browser.close();
      return res.status(200).json({ data: result });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
