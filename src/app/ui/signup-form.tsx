'use client'

import { useFormState, useFormStatus } from "react-dom"
import { signup } from "../actions/signup"
import { useState } from "react";

export function SignupForm() {
   const [state, action] = useFormState(signup, undefined)

   const [focus, setFocus] = useState({
      name: false,
      email: false,
      password: false,
   });

   const handleFocus = (field: string) => {
      setFocus({ ...focus, [field]: true });
   };

   const handleBlur = (field: string, value: string) => {
      setFocus({ ...focus, [field]: value.length > 0 });
   };

   return (
      
      <form 
         className="flex flex-col gap-6"
         action={action}
         autoComplete="off"
      >
         <div>
            <div className="flex flex-col border-b border-slate-600 relative">
               <label 
                  htmlFor="name"
                  className={`absolute top-3 transition-all ${focus.name ? '-translate-y-6 text-xs' : 'text-gray-500'}`}
               >
                  Name
               </label>
               <input 
                  id="name"
                  name="name"
                  className="py-2"
                  onFocus={() => handleFocus('name')}
                  onBlur={(e) => handleBlur('name', e.target.value)}
               />
            </div>
            {state?.errors?.name && <p className="text-red-600 text-xs">{state.errors.name}</p>}
         </div>

         <div>
            <div className="flex flex-col border-b border-slate-600 relative">
               <label
                  htmlFor="email"
                  className={`absolute top-3 transition-all ${focus.email ? '-translate-y-6 text-xs' : 'text-gray-500'}`}
               >
                  Email
               </label>
               <input
                  id="email"
                  name="email"
                  type="email"
                  className="py-2"
                  onFocus={() => handleFocus('email')}
                  onBlur={(e) => handleBlur('email', e.target.value)}
               />
            </div>
            {state?.errors?.email && <p className="text-red-600 text-xs">{state.errors.email}</p>}
         </div>

         <div>
            <div className="flex flex-col border-b border-slate-600 relative">
               <label
                  htmlFor="password"
                  className={`absolute top-3 transition-all ${focus.password ? '-translate-y-6 text-xs' : 'text-gray-500'}`}
               >
                  Password
               </label>
               <input
                  id="password"
                  name="password"
                  type="password"
                  className="py-2"
                  onFocus={() => handleFocus('password')}
                  onBlur={(e) => handleBlur('password', e.target.value)}
               />
            </div>
            {state?.errors?.password && <p className="text-red-600 text-xs">{state.errors.password[0]}</p>}
         </div>

         {state?.message && <p className="font-semibold font italic text-center text-gray-500">{state.message}</p>}

         <SubmitButton/>
      </form>
  )
}

function SubmitButton() {
   const { pending } = useFormStatus()
   const disable = pending

   return (
      <button 
         disabled={disable}
         type="submit"
         className={`mt-6 border border-slate-600 p-4 text-xl font-bold text-gray-200 rounded hover:bg-gray-600 transition duration-300 ease-in-out ${pending && "bg-gray-600"}`}    
      >
         {disable ? "..." : "Sign Up"}
     </button>
   )
}