// components/product/ProductCard.jsx
export default function ProductCard() {
  return (
    <div className="card transform hover:-translate-y-1">
      <div className="h-44 bg-gray-300 rounded-lg mb-4" role="img" aria-label="Product image placeholder" />
      <h4 className="font-semibold mb-2 text-lg">Handmade Item</h4>
      <p className="text-sm mb-2">Beautiful handcrafted product.</p>
      <p className="font-bold mb-4">$25.00</p>
      <button className="w-full btn-primary">View Details</button>
    </div>
  );
}