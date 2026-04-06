import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Truck, ShieldCheck, RefreshCcw, Star, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
  const { product, relatedProducts } = useLoaderData();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product?.id]);

  if (!product) {
    return <div className="text-white text-center py-20">Product not found.</div>;
  }

  const handlePrev = () => {
    if (product.id > 1) {
      navigate(`/products/${product.id - 1}`);
    }
  };

  const handleNext = () => {
    navigate(`/products/${product.id + 1}`);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 space-y-12">

        <div className="text-sm text-gray-500 font-medium">
          <Link to="/shop" className="hover:text-white transition">Products</Link>
          <span className="mx-2">/</span>
          <span className="capitalize hover:text-white transition cursor-pointer">{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-white">{product.title}</span>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">

          <div className="bg-white rounded-3xl p-10 flex items-center justify-center min-h-[400px] md:min-h-[500px]">
            <img 
              src={product.images?.[0] || product.thumbnail} 
              alt={product.title} 
              className="w-full max-h-[400px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>


          <div className="space-y-6">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#c8f400] border border-[#c8f400] rounded-full">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-black font-heading leading-tight">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current opacity-50" />
                </div>
                <span className="text-white">{product.rating}</span>
                <span className="text-gray-500">({product.reviews?.length || Math.floor(Math.random() * 100) + 10} reviews)</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h2 className="text-4xl font-black text-[#c8f400] tracking-tight">
                ${product.price.toFixed(2)}
              </h2>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed border-b border-white/10 pb-6">
              {product.description}
            </p>

            <div className="flex gap-4">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 bg-[#c8f400] hover:bg-[#d6ff33] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition active:scale-95 shadow-[0_0_20px_rgba(200,244,0,0.2)]"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-4 border border-white/10 rounded-xl transition ${isFavorite ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 hover:bg-white/10'}`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-6">
              <div className="p-4 border border-white/10 rounded-xl bg-white/5 text-center flex flex-col items-center justify-center gap-2">
                <Truck className="w-5 h-5 text-[#c8f400]" />
                <div>
                  <div className="text-[10px] font-bold text-white uppercase tracking-wider">Free Delivery</div>
                  <div className="text-[9px] text-gray-500">On orders $50+</div>
                </div>
              </div>
              <div className="p-4 border border-white/10 rounded-xl bg-white/5 text-center flex flex-col items-center justify-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#c8f400]" />
                <div>
                  <div className="text-[10px] font-bold text-white uppercase tracking-wider">Secure Pay</div>
                  <div className="text-[9px] text-gray-500">256-bit SSL</div>
                </div>
              </div>
              <div className="p-4 border border-white/10 rounded-xl bg-white/5 text-center flex flex-col items-center justify-center gap-2">
                <RefreshCcw className="w-5 h-5 text-[#c8f400]" />
                <div>
                  <div className="text-[10px] font-bold text-white uppercase tracking-wider">Easy Returns</div>
                  <div className="text-[9px] text-gray-500">30-day policy</div>
                </div>
              </div>
            </div>


            <div className="flex gap-4 pt-6">
              <button
                onClick={handlePrev}
                disabled={product.id <= 1}
                className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={handleNext}
                className="flex-1 bg-[#c8f400] text-black hover:bg-[#d6ff33] font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>


        {relatedProducts && relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-white/10 space-y-8">
            <h2 className="text-2xl font-black font-heading">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {relatedProducts.filter(p => p.id !== product.id).slice(0, 5).map(rp => (
                <div 
                  key={rp.id}
                  onClick={() => navigate(`/products/${rp.id}`)}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 group cursor-pointer hover:border-[#c8f400]/50 transition"
                >
                  <div className="bg-white rounded-xl p-4 flex items-center justify-center h-32 relative overflow-hidden">
                     <span className="absolute left-2 top-2 px-2 py-0.5 rounded-full bg-black/70 text-white text-[8px] font-bold uppercase tracking-wider z-10">
                        {rp.category}
                     </span>
                    <img src={rp.thumbnail} alt={rp.title} className="max-h-full object-contain group-hover:scale-110 transition duration-300" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-gray-200 truncate">{rp.title}</h3>
                    <div className="flex items-center gap-1 text-[10px] text-yellow-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-gray-400">({rp.rating})</span>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-[#c8f400] font-black">${rp.price.toFixed(2)}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(rp);
                      }}
                      className="bg-[#c8f400] text-black text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 opacity-0 group-hover:opacity-100 transition translate-y-2 group-hover:translate-y-0"
                    >
                      <Plus className="w-3 h-3" /> Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetails;
