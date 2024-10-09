import React from 'react'
import Link from 'next/link'
import { LoginForm } from '../ui/login-form'
import LoginProvider from '../ui/login-provider'

export default function page() {
  return (
    <div className="p-6 h-screen flex flex-col items-center">
      <h1 className="flex-none font-bold text-4xl text-center mt-6">
        notariq<span className="text-base align-baseline">©</span>
      </h1>
      <div className="w-screen tablet:w-[50vw] flex-grow flex flex-col justify-center items-center space-y-6">
        <div className='w-full space-y-3'>
          <LoginForm />
        </div>
        <Link
          href={'/signup'}
          className="w-full text-start text-gray-400 text-sm tablet:text-base hover:text-slate-700 transition duration-300 ease-in-out"
        >
          create an account?
        </Link>
        <p className='text-gray-600'>or</p>
        <div className='w-full'>
            <LoginProvider />
        </div>
      </div>
    </div>
  )
}
