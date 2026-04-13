"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSellerSession } from "@/lib/auth";

function readTrimmedString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function readOptionalString(formData: FormData, key: string) {
  const value = readTrimmedString(formData, key);
  return value.length ? value : null;
}

function parsePrice(rawPrice: string) {
  const price = Number(rawPrice);

  if (!Number.isFinite(price) || price <= 0) {
    throw new Error("Price must be a positive number.");
  }

  return Number(price.toFixed(2));
}

function validateUsername(username: string) {
  return /^[a-z0-9-]+$/i.test(username);
}

function revalidateSellerViews({
  username,
  productId,
}: {
  username: string;
  productId?: string;
}) {
  revalidatePath("/products");
  revalidatePath("/sellers");
  revalidatePath(`/sellers/${username}`);
  revalidatePath("/seller/dashboard");
  revalidatePath("/seller/dashboard/profile");
  revalidatePath("/seller/dashboard/products/new");

  if (productId) {
    revalidatePath(`/products/${productId}`);
    revalidatePath(`/seller/dashboard/products/${productId}/edit`);
  }
}

export async function updateSellerProfile(formData: FormData) {
  const { seller } = await requireSellerSession("/seller/dashboard/profile");

  const username = readTrimmedString(formData, "username");
  const name = readTrimmedString(formData, "name");
  const bio = readOptionalString(formData, "bio");
  const story = readOptionalString(formData, "story");
  const image = readOptionalString(formData, "image");

  if (!username || !name) {
    throw new Error("Username and name are required.");
  }

  if (!validateUsername(username)) {
    throw new Error("Username can only contain letters, numbers, and hyphens.");
  }

  await prisma.seller.update({
    where: { id: seller.id },
    data: {
      username,
      name,
      bio,
      story,
      image,
    },
  });

  revalidateSellerViews({ username, productId: undefined });
  redirect("/seller/dashboard");
}

export async function createProduct(formData: FormData) {
  const { seller } = await requireSellerSession("/seller/dashboard/products/new");

  const title = readTrimmedString(formData, "title");
  const description = readOptionalString(formData, "description");
  const image = readOptionalString(formData, "image");
  const price = parsePrice(readTrimmedString(formData, "price"));

  if (!title) {
    throw new Error("Product title is required.");
  }

  const product = await prisma.product.create({
    data: {
      title,
      description,
      image,
      price,
      sellerId: seller.id,
    },
  });

  revalidateSellerViews({ username: seller.username, productId: product.id });
  redirect("/seller/dashboard");
}

export async function updateProduct(formData: FormData) {
  const { seller } = await requireSellerSession("/seller/dashboard");
  const productId = readTrimmedString(formData, "productId");
  const title = readTrimmedString(formData, "title");
  const description = readOptionalString(formData, "description");
  const image = readOptionalString(formData, "image");
  const price = parsePrice(readTrimmedString(formData, "price"));

  if (!productId || !title) {
    throw new Error("Product id and title are required.");
  }

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      sellerId: seller.id,
    },
  });

  if (!product) {
    throw new Error("Product not found.");
  }

  await prisma.product.update({
    where: { id: product.id },
    data: {
      title,
      description,
      image,
      price,
    },
  });

  revalidateSellerViews({ username: seller.username, productId: product.id });
  redirect("/seller/dashboard");
}

export async function deleteProduct(formData: FormData) {
  const { seller } = await requireSellerSession("/seller/dashboard");
  const productId = readTrimmedString(formData, "productId");

  if (!productId) {
    throw new Error("Product id is required.");
  }

  const deleted = await prisma.product.deleteMany({
    where: {
      id: productId,
      sellerId: seller.id,
    },
  });

  if (!deleted.count) {
    throw new Error("Product not found.");
  }

  revalidateSellerViews({ username: seller.username, productId });
  redirect("/seller/dashboard");
}
