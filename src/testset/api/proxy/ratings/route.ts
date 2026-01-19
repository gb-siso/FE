import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // CORS 헤더 설정
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Preflight 요청 처리
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  try {
    const body = await request.json();
    const accessToken = request.headers.get('Authorization')?.split(' ')[1];

    // 실제 백엔드 API 호출
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/ratings`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken && { Authorization: `Bearer ${accessToken}` })
        },
        body: JSON.stringify(body)
      }
    );

    const data = await response.json();

    return new NextResponse(JSON.stringify(data), {
      status: response.status,
      headers
    });
  } catch (error) {
    console.error('Error forwarding rating:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers }
    );
  }
}
