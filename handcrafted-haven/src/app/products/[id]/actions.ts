"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function readTrimmedString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function createReview(formData: FormData) {
  const productId = readTrimmedString(formData, "productId");
  const buyerName = readTrimmedString(formData, "buyerName");
  const buyerEmail = readTrimmedString(formData, "buyerEmail").toLowerCase();
  const comment = readTrimmedString(formData, "comment");
  const rating = Number(readTrimmedString(formData, "rating"));

  if (!productId || !buyerName || !buyerEmail || !comment) {
    throw new Error("All review fields are required.");
  }

  if (!isValidEmail(buyerEmail)) {
    throw new Error("Please enter a valid email address.");
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5.");
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true },
  });

  if (!product) {
    throw new Error("Product not found.");
  }

  await prisma.review.create({
    data: {
      buyerName,
      buyerEmail,
      comment,
      rating,
      productId,
    },
  });

  revalidatePath(`/products/${productId}`);
}
