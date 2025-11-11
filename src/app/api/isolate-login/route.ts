import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ISOLATE_PASSWORD = process.env.ISOLATE_PASSWORD || 'fumi';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === ISOLATE_PASSWORD) {
      // Create a session token
      const sessionToken = crypto.randomUUID();
      
      // Set HTTP-only cookie
      const cookieStore = await cookies();
      cookieStore.set('isolate_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Invalid password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Isolate login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Check if session exists
  const cookieStore = await cookies();
  const session = cookieStore.get('isolate_session');
  
  if (session) {
    return NextResponse.json({ authenticated: true });
  }
  
  return NextResponse.json({ authenticated: false }, { status: 401 });
}