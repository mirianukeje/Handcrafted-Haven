import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      sellerId: string;
    };
  }

  interface User {
    sellerId: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sellerId?: string;
  }
}
