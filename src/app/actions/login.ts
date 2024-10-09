"use server"

import { lucia } from "@/lib/auth";
import { LoginFormSchema } from "@/schema/schema";
import { FormState } from "@/types/d";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(state: FormState, formData: FormData) { 
  const prisma = new PrismaClient()

  // 1. Get form field
  const validatedFields = LoginFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 2. Validate credentials
  const {email, password} = validatedFields.data;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (!user) {
    return {errors: { email: ["Email is not registered"] }}
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return {errors: { password: ["Invalid password"] }};
  }

  //return { message: `Login successful as ${user.name}` };
  // id: sessionId, userId: userId, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  // 3. Create session
  const userId = user.id;
  const sessionId = generateId(15)
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  // 4. Redirect
  return redirect("/");
}

export async function loginGoogleProvider() { }