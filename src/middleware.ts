import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

const isDashboardRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  
  if (isDashboardRoute(req) && userId) {
    // Check if we've already verified this user in this session
    const userCheckCookie = req.cookies.get(`user_verified_${userId}`);
    
    if (!userCheckCookie) {
      try {
        // Import prisma here to avoid edge runtime issues
        const { prisma } = await import('./app/lib/prisma');
        
        // Check if user exists in database
        const dbUser = await prisma.user.findUnique({
          where: { id: userId }
        });
        
        if (!dbUser) {
          const user = await currentUser();
          if (user) {
            await prisma.user.create({
              data: {
                id: userId,
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                profilePicturePath: user.imageUrl || undefined,
              },
            });
          }
        }
        
        // Set cookie to avoid checking again for 24 hours
        const response = NextResponse.next();
        response.cookies.set(`user_verified_${userId}`, 'true', {
          maxAge: 60 * 60 * 24, // 24 hours
          httpOnly: true,
        });
        return response;
      } catch (error) {
        console.error('Error in user creation middleware:', error);
      }
    }
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};