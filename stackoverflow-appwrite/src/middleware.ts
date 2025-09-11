import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createOrGetDB from './models/server/dbsetup'
import createOrGetStorage from './models/server/storage.collection'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  await Promise.all([
    createOrGetDB(),
    createOrGetStorage()
  ])
  return NextResponse .next()
}
 
export const config = {
  matcher: '/about/:path*',
} 