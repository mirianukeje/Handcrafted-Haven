"use server";

import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function readTrimmedString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function readOptionalString(formData: FormData, key: string) {
  const value = readTrimmedString(formData, key);
  return value.length ? value : null;
}

function validateUsername(username: string) {
  return /^[a-z0-9-]+$/i.test(username);
}

export async function registerSeller(formData: FormData) {
  const name = readTrimmedString(formData, "name");
  const username = readTrimmedString(formData, "username");
  const email = readTrimmedString(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");
  const bio = readOptionalString(formData, "bio");

  if (!name || !username || !email || !password) {
    throw new Error("Name, username, email, and password are required.");
  }

  if (!validateUsername(username)) {
    throw new Error("Username can only contain letters, numbers, and hyphens.");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingUser) {
    throw new Error("An account with that email already exists.");
  }

  const existingSeller = await prisma.seller.findUnique({
    where: { username },
    select: { id: true },
  });

  if (existingSeller) {
    throw new Error("That seller username is already taken.");
  }

  const passwordHash = await hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      passwordHash,
      seller: {
        create: {
          name,
          username,
          bio,
        },
      },
    },
  });

  redirect(
    `/sign-in?registered=1&email=${encodeURIComponent(email)}`
  );
}
