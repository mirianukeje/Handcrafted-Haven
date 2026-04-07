const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.seller.deleteMany();

  const liva = await prisma.seller.create({
    data: {
      username: "liva",
      name: "Liva Johnson",
      bio: "I create handmade crafts using sustainable materials.",
      story:
        "I started crafting as a passion and turned it into a business. Every product is made with care and love.",
      image: "/livaprofile.png",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        title: "Handmade Basket",
        description:
          "A beautiful woven basket made from natural fibers. Durable and eco-friendly.",
        price: 25,
        image: "/basket.avif",
        sellerId: liva.id,
      },
      {
        title: "Wooden Sculpture",
        description: "A unique hand-carved wooden sculpture.",
        price: 40,
        image: "/wood.jpg",
        sellerId: liva.id,
      },
    ],
  });

  const shared = await prisma.seller.create({
    data: {
      username: "shared",
      name: "Shared Lopez",
      bio: "I specialize in handmade crafts.",
      story:
        "Crafting has been a part of my life for years. I love creating unique pieces that bring joy to others.",
      image: "/serranoprofile.jfif",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        title: "Ceramic Mug",
        description: "Handcrafted ceramic mug, perfect for coffee lovers.",
        price: 20,
        image: "/ceramic-mug.jpg",
        sellerId: shared.id,
      },
      {
        title: "Macrame Wall Hanging",
        description: "Beautiful boho-style macrame decor.",
        price: 30,
        image: "/macrame-wall.webp",
        sellerId: shared.id,
      },
      {
        title: "Leather Wallet",
        description: "Durable handmade leather wallet.",
        price: 45,
        image: "/wallet-handmade.jpg",
        sellerId: shared.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Database seeded successfully");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });