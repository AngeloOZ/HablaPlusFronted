import { NextResponse } from 'next/server'

export async function middleware(request) {
   const currentUrl = request.nextUrl.pathname;
   if (currentUrl.startsWith('/auth')) {
      const currentUser = await isValidSession(request);
      if (currentUser) {
         switch (currentUser.id_type) {
            case 1: return NextResponse.redirect(new URL('/admin', request.url));
            case 2: return NextResponse.redirect(new URL('/paciente', request.url));
         }
      }
      return NextResponse.next();
   }
   else if (currentUrl.startsWith('/paciente')) {
      const currentUser = await isValidSession(request);
      if (currentUser) {
         if(currentUser.id_type == 1){
            return NextResponse.redirect(new URL('/admin', request.url));
         }else{
            return NextResponse.next();
         }
      }
      return NextResponse.redirect(new URL(`/auth/login`, request.url));
   }
   else if (currentUrl.startsWith('/admin')) {
      const currentUser = await isValidSession(request);
      if (currentUser) {
         if(currentUser.id_type == 1){
            return NextResponse.next();
         }else{
            return NextResponse.redirect(new URL('/paciente', request.url));
         }
      }
      return NextResponse.redirect(new URL(`/auth/login`, request.url));
   }
}

function existSession(request = NextRequest) {
   const session = request.cookies.get('SESSION_ID');
   if (session) {
      return session;
   } else {
      undefined;
   }
}

async function isValidToken(token) {
   try {
      const url = `${process.env.NEXT_PUBLIC_URL_API}/auth/verify-token`;
      const response = await fetch(url, {
         method: "POST",
         body: JSON.stringify({ token }),
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         }
      });

      const user = await response.json();
      if(user?.status >= 400) throw Error(user);
      return user;
   } catch (error) {
      console.error(error);
      NextResponse.next().cookies.delete('SESSION_ID');
      return undefined;
   }
}

async function isValidSession(request = NextRequest) {
   const token = existSession(request);
   if (token) {
      const payloadToken = await isValidToken(token);
      return payloadToken;
   }
   return undefined;
}