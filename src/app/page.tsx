import { lucia, validateRequest } from '@/lib/auth'
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import React from 'react'
import Link from 'next/link';

export default async function Home() {
  const user = (await validateRequest()).user;

  return (
    <div className='flex flex-col justify-center items-center h-screen space-y-6'>
      <h1 className='text-5xl font-bold tablet:text-9xl'>{`Welcome!`}</h1>
      {user?.name && <p className='text-2xl tablet:text-5xl'>{user.name}</p>}
      {user ?
        <form action={logout} className="absolute bottom-0 p-4">
          <button className='border border-slate-700 py-2 px-10 rounded hover:bg-slate-700'>Log Out</button>
        </form> :
        <div className="absolute bottom-0 p-4">
          <Link href={'/login'}>
            <button className='border border-slate-700 py-2 px-10 rounded hover:bg-slate-700'>Log In</button>
          </Link>
        </div>
      }
    </div>
  )
}

async function logout(): Promise<any> {
	"use server";
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized"
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	//return redirect("/login", );
}