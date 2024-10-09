import Image from "next/image"
import Link from "next/link"

export default function LoginProvider() {
  return (
    <div className='flex flex-col text-gray-500 space-y-4'>
        <button 
            className='border border-slate-600 p-4 relative rounded hover:bg-gray-600 transition duration-300 ease-in-out'
            //onClick={() => {}}
        >
            <Image 
                src={'/google-icon.svg'}
                alt="google"
                width={25}
                height={25}
                className="absolute"
            />
            <p className='text-center'>Login with Google</p>
        </button>
    </div>
  )
}
