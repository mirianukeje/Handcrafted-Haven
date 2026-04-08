export default function AboutPage() {
    return (
      <main className="min-h-screen bg-[#FFF8F0] px-6 py-12">
        <div className="mx-auto max-w-6xl space-y-10">
          <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="bg-gradient-to-r from-amber-700 via-orange-500 to-amber-300 px-8 py-12 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.25em]">
                About Handcrafted Haven
              </p>
              <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
                A Marketplace for Creativity, Craftsmanship, and Connection
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-amber-50 sm:text-lg">
                Handcrafted Haven is a digital platform designed to connect skilled
                artisans with people who value authentic handmade products. Our
                goal is to make it easier for creators to share their stories,
                showcase their talent, and reach a wider audience.
              </p>
            </div>
  
            <div className="grid gap-8 px-8 py-10 md:grid-cols-3">
              <div className="rounded-2xl bg-stone-50 p-6">
                <h2 className="text-xl font-semibold text-gray-900">Our Mission</h2>
                <p className="mt-3 text-sm leading-7 text-gray-700 sm:text-base">
                  We aim to support artisans by providing a modern, accessible, and
                  visually engaging space where handcrafted products can be
                  discovered and appreciated by customers everywhere.
                </p>
              </div>
  
              <div className="rounded-2xl bg-stone-50 p-6">
                <h2 className="text-xl font-semibold text-gray-900">Our Vision</h2>
                <p className="mt-3 text-sm leading-7 text-gray-700 sm:text-base">
                  We envision a thriving online community where creativity is
                  celebrated, local makers are empowered, and shoppers can connect
                  with meaningful, high-quality handmade goods.
                </p>
              </div>
  
              <div className="rounded-2xl bg-stone-50 p-6">
                <h2 className="text-xl font-semibold text-gray-900">Our Values</h2>
                <p className="mt-3 text-sm leading-7 text-gray-700 sm:text-base">
                  Handcrafted Haven values authenticity, craftsmanship,
                  sustainability, and human connection. We believe every handmade
                  item carries a story worth sharing.
                </p>
              </div>
            </div>
          </section>
  
          <section className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
                What We Offer
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-gray-900">
                Features That Support Buyers and Sellers
              </h2>
  
              <ul className="mt-6 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">
                <li>• Dedicated seller profiles that highlight artisan stories and products</li>
                <li>• Product listings with descriptions, pricing, and images</li>
                <li>• Clear navigation for browsing sellers and product collections</li>
                <li>• A responsive experience across desktop and mobile devices</li>
                <li>• A modern full-stack architecture built for future growth</li>
              </ul>
            </div>
  
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
                Project Focus
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-gray-900">
                Built with Strong Web Development Principles
              </h2>
  
              <p className="mt-6 text-sm leading-7 text-gray-700 sm:text-base">
                This project emphasizes clean design, intuitive navigation,
                responsive layouts, and a strong backend foundation. Handcrafted
                Haven has evolved from a mock-data prototype into a database-driven
                application using Next.js, Prisma, and Neon PostgreSQL.
              </p>
  
              <p className="mt-4 text-sm leading-7 text-gray-700 sm:text-base">
                As the platform grows, it can be extended with more advanced
                features such as authentication, reviews, cart functionality, and
                product management tools for sellers.
              </p>
            </div>
          </section>
  
          <section className="rounded-3xl bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
              Community & Craft
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-gray-900">
              More Than a Storefront
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-gray-700 sm:text-base">
              Handcrafted Haven is more than an online marketplace. It is a place
              where craftsmanship meets technology, where creators gain visibility,
              and where customers discover products with character, quality, and
              purpose.
            </p>
          </section>
        </div>
      </main>
    );
  }