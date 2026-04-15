export default function AboutPage() {
    return (
      <main className="min-h-screen bg-[#FFF8F0] px-6 py-12">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-md">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#A0522D]">
            About Us
          </p>
  
          <h1 className="mt-2 font-serif text-4xl font-bold text-[#333333]">
            About Handcrafted Haven
          </h1>
  
          <p className="mt-6 text-lg leading-8 text-gray-700">
            Handcrafted Haven is a digital marketplace created to connect artisans
            with people who appreciate unique handmade products. Our platform
            helps sellers showcase their creativity and allows customers to browse
            authentic handcrafted items with ease.
          </p>
  
          <p className="mt-4 text-lg leading-8 text-gray-700">
            This project focuses on strong design, clear navigation, responsive
            layout, and a full-stack architecture using Next.js, Prisma, and Neon
            PostgreSQL.
          </p>
        </div>
      </main>
    );
  }