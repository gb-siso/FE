import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const baseUrl = 'https://sisso-api.shop/api/v1';

  const url = new URL(request.url);

  const params = url.searchParams;
  const apiUrl = `${baseUrl}/congressman?${params.toString()}`;

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
  return NextResponse.json({ ...data });
}
