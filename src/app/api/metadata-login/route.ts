import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const METADATA_PASSWORD = process.env.METADATA_PASSWORD || 'af293';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === METADATA_PASSWORD) {
      // Create a session token
      const sessionToken = crypto.randomUUID();
      
      // Set HTTP-only cookie
      const cookieStore = await cookies();
      cookieStore.set('metadata_session', sessionToken, {
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
    console.error('Metadata login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Check if session exists
  const cookieStore = await cookies();
  const session = cookieStore.get('metadata_session');
  
  if (session) {
    return NextResponse.json({ authenticated: true });
  }
  
  return NextResponse.json({ authenticated: false }, { status: 401 });
}