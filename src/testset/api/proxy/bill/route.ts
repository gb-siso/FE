import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

import { createProxyMiddleware } from 'http-proxy-middleware';

export async function GET(request: NextRequest) {
  const baseUrl =
    'https://open.assembly.go.kr/portal/openapi/nzmimeepazxkubdpn';

  const url = new URL(request.url);
  const params = url.searchParams;

  const apiUrl = `${baseUrl}?${params.toString()}`;

  const res = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const data = await res.json();
  if (data['RESULT']) {
    return NextResponse.json({ row: [] });
  }

  return NextResponse.json({ ...data['nzmimeepazxkubdpn'][1] });
}

export async function POST(request: NextRequest) {
  const req = await request.json();
  const { body } = JSON.parse(req);
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

  return NextResponse.json({ data: result });
}
