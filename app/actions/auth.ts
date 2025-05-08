"use server"
import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from "uuid"
import { z } from "zod"

import prisma from "@/lib/prisma"
import { sendVerificationEmail, sendPasswordResetEmail } from "@/lib/email"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function register(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const validatedFields = registerSchema.safeParse({
    name,
    email,
    password,
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { error: { email: ["User with this email already exists"] } }
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create verification token
  const token = uuidv4()
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  // Create verification token
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  })

  // Send verification email
  await sendVerificationEmail(email, token)

  return { success: true }
}

export async function verifyEmail(token: string) {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  })

  if (!verificationToken) {
    return { error: "Invalid token" }
  }

  if (verificationToken.expires < new Date()) {
    return { error: "Token expired" }
  }

  const user = await prisma.user.findUnique({
    where: { email: verificationToken.identifier },
  })

  if (!user) {
    return { error: "User not found" }
  }

  // Update user
  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: new Date() },
  })

  // Delete token
  await prisma.verificationToken.delete({
    where: { token },
  })

  return { success: true }
}

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get("email") as string

  if (!email) {
    return { error: "Email is required" }
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    // Don't reveal that the user doesn't exist
    return { success: true }
  }

  // Create reset token
  const token = uuidv4()
  const expires = new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hour

  // Update user with reset token
  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetPasswordToken: token,
      resetPasswordExpires: expires,
    },
  })

  // Send password reset email
  await sendPasswordResetEmail(email, token)

  return { success: true }
}

export async function resetPassword(formData: FormData) {
  const token = formData.get("token") as string
  const password = formData.get("password") as string

  if (!token || !password) {
    return { error: "Token and password are required" }
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters" }
  }

  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: {
        gt: new Date(),
      },
    },
  })

  if (!user) {
    return { error: "Invalid or expired token" }
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Update user
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
  })

  return { success: true }
}
