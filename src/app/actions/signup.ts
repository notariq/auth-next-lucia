'use server'

import { PrismaClient } from '@prisma/client';
import { SignupFormSchema } from '@/schema/schema';
import { FormState } from '@/types/d';
import bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { redirect } from 'next/navigation';
import { lucia } from '@/lib/auth';
import { generateId } from 'lucia';
import { cookies } from 'next/headers';

export async function signup(state: FormState, formData: FormData) {    
    const prisma = new PrismaClient()
    
    // 1. Validate fields
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    // 2. Prepare data for insertion
    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    //console.log(email, name, password)

    // 3. Insert the user into database
    try {
      const user = await prisma.user.create({
          data: {
              email: email,
              name: name,
              password: hashedPassword,
          }
        });

        // 4. Create session
        const userId = user.id;
        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        
        // 5. Redirect
        return redirect("/");
        //return redirect("/login");
    } catch (error) {
      // add more if neccessary
      if (error instanceof PrismaClientKnownRequestError) {
        return { message: 'Email has been registered!' }
      } else {
        console.log(error)
      }
    }
}