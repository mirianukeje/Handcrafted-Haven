import SellerProfile from "@/components/SellerProfile";

type PageProps = {
  params: Promise<{
    username: string;
  }>;
};

export default async function SellerPage({ params }: PageProps) {
  const { username } = await params;

  return <SellerProfile username={username} />;
}