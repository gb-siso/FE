import { NextRequest, NextResponse } from 'next/server';
import { createProxyMiddleware } from 'http-proxy-middleware';

export async function GET(request: NextRequest) {
  const baseUrl =
    'https://open.assembly.go.kr/portal/openapi/nauvppbxargkmyovh';

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

  return NextResponse.json({ ...data?.nauvppbxargkmyovh['1'] });
}

// export async function GET(request: NextRequest): Promise<NextResponse> {
//   const { searchParams } = new URL(request.url);
//   const targetUrl = searchParams.get('url');

//   if (!targetUrl) {
//     return NextResponse.json(
//       { error: 'URL parameter is missing' },
//       { status: 400 }
//     );
//   }

//   const res = await fetch(targetUrl, {
//     headers: {
//       'Content-Type': 'application/json',
//       'x-crm-origin': request.headers.get('origin') || ''
//     }
//   });

//   return new NextResponse(res.body, {
//     status: res.status,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization'
//     }
//   });
// }
