// components/layout/Footer.jsx
export default function Footer() {
  return (
    <footer className="text-center py-6 bg-white mt-10 border-t text-sm">
      <p>© {new Date().getFullYear()} Handcrafted Haven. All rights reserved.</p>
    </footer>
  );
}