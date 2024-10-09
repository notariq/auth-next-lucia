import { SignupForm } from "../ui/signup-form";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="p-6 h-screen flex flex-col items-center">
      <h1 className="flex-none font-bold text-4xl text-center mt-6">
        notariq<span className="text-base align-baseline">©</span>
      </h1>
      <div className="flex-grow flex flex-col justify-center items-center space-y-4">
        <div className="w-screen tablet:w-[50vw]">
          <SignupForm />
        </div>
        <Link
          href={'/login'}
          className="w-full text-start text-sm text-gray-400 tablet:text-base hover:text-slate-700 transition duration-300 ease-in-out"
        >
          already got an account?
        </Link>
      </div>
    </div>
  );
}