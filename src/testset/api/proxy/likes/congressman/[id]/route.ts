import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log(123123);
  const { id } = params;

  const body = await req.json();

  return NextResponse.json({ id, body });
}
