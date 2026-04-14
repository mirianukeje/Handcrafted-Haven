/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function createSellerAccount({
  email,
  password,
  username,
  name,
  bio,
  story,
  image,
  products,
}) {
  const passwordHash = await bcrypt.hash(password, 12);

  return prisma.user.create({
    data: {
      email,
      passwordHash,
      seller: {
        create: {
          username,
          name,
          bio,
          story,
          image,
          products: {
            create: products,
          },
        },
      },
    },
    include: {
      seller: {
        include: {
          products: true,
        },
      },
    },
  });
}

async function main() {
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.seller.deleteMany();
  await prisma.user.deleteMany();

  const livaAccount = await createSellerAccount({
    email: "liva@handcraftedhaven.test",
    password: "demo12345",
    username: "liva",
    name: "Liva Johnson",
    bio: "I create handmade crafts using sustainable materials.",
    story:
      "I started crafting as a passion and turned it into a business. Every product is made with care and love.",
    image: "/livaprofile.png",
    products: [
      {
        title: "Handmade Basket",
        category: "Home Decor",
        material: "Natural fibers",
        description:
          "A beautiful woven basket made from natural fibers. Durable and eco-friendly.",
        price: 25,
        image: "/basket.avif",
      },
      {
        title: "Wooden Sculpture",
        category: "Art",
        material: "Carved wood",
        description: "A unique hand-carved wooden sculpture.",
        price: 40,
        image: "/wood.jpg",
      },
    ],
  });

  const sharedAccount = await createSellerAccount({
    email: "shared@handcraftedhaven.test",
    password: "demo12345",
    username: "shared",
    name: "Shared Lopez",
    bio: "I specialize in handmade crafts.",
    story:
      "Crafting has been a part of my life for years. I love creating unique pieces that bring joy to others.",
    image: "/serranoprofile.jfif",
    products: [
      {
        title: "Ceramic Mug",
        category: "Kitchenware",
        material: "Ceramic",
        description: "Handcrafted ceramic mug, perfect for coffee lovers.",
        price: 20,
        image: "/ceramic-mug.jpg",
      },
      {
        title: "Macrame Wall Hanging",
        category: "Home Decor",
        material: "Cotton cord",
        description: "Beautiful boho-style macrame decor.",
        price: 30,
        image: "/macrame-wall.webp",
      },
      {
        title: "Leather Wallet",
        category: "Accessories",
        material: "Leather",
        description: "Durable handmade leather wallet.",
        price: 45,
        image: "/wallet-handmade.jpg",
      },
    ],
  });

  await prisma.review.createMany({
    data: [
      {
        buyerName: "Amara Nwosu",
        buyerEmail: "amara@example.com",
        rating: 5,
        comment:
          "Beautiful finish and sturdy craftsmanship. It looks even better in person.",
        productId: livaAccount.seller.products?.[0]?.id ?? "",
      },
      {
        buyerName: "Tayo Bello",
        buyerEmail: "tayo@example.com",
        rating: 4,
        comment:
          "Lovely handmade piece and fast delivery. I would buy from this seller again.",
        productId: sharedAccount.seller.products?.[0]?.id ?? "",
      },
    ].filter((review) => review.productId),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Database seeded successfully");
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
