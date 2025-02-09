import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json(
      { error: 'URL parameter is missing' },
      { status: 400 }
    );
  }

  const res = await fetch(targetUrl, {
    headers: {
      'Content-Type': 'application/json',
      'x-crm-origin': request.headers.get('origin') || ''
    }
  });

  return new NextResponse(res.body, {
    status: res.status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
