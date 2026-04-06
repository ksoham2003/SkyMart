import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  ShoppingBag,
  TrendingUp,
  Star,
  Tag,
  ArrowRight,
  Truck,
  ShieldCheck,
  Plus,
  Monitor,
  Package,
  Armchair,
  Home as HomeIcon,
  Trophy,
  Watch
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllProducts } from '../api/ProductApi';
import { Auth } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Home = () => {
  const { loginUser } = useContext(Auth);
  const { addToCart, totalItems, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');

  const topRated = products.filter(p => p.rating >= 4.5).slice(0, 6);
  const newArrivals = products.slice(0, 10);
  const totalCategories = new Set(products.map(p => p.category).filter(Boolean)).size;

  const categories = (() => {
    if (!products || products.length === 0) return [];
    
    const categoryCounts = products.reduce((acc, product) => {
      if (product.category) {
        acc[product.category] = (acc[product.category] || 0) + 1;
      }
      return acc;
    }, {});

    const getIconForCategory = (category) => {
      const lowerCat = String(category).toLowerCase();
      if (lowerCat.includes('electronic') || lowerCat.includes('smartphone') || lowerCat.includes('laptop')) return <Monitor />;
      if (lowerCat.includes('cloth') || lowerCat.includes('dress') || lowerCat.includes('shirt') || lowerCat.includes('shoe') || lowerCat.includes('top')) return <Package />;
      if (lowerCat.includes('furniture')) return <Armchair />;
      if (lowerCat.includes('home') || lowerCat.includes('decoration')) return <HomeIcon />;
      if (lowerCat.includes('sport')) return <Trophy />;
      if (lowerCat.includes('watch') || lowerCat.includes('jewel') || lowerCat.includes('accessory') || lowerCat.includes('bag')) return <Watch />;
      if (lowerCat.includes('beauty') || lowerCat.includes('fragrance') || lowerCat.includes('skin')) return <Star />;
      if (lowerCat.includes('grocer')) return <ShoppingBag />;
      return <Tag />;
    };

    return Object.entries(categoryCounts)
      .map(([category, count], index) => ({
        id: index + 1,
        title: category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        icon: getIconForCategory(category),
        count: count,
      }))
      .slice(0, 6);
  })();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 18) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
    };

    fetchHomeData();
    updateGreeting();
  }, []);

  const dashboardCards = [
    { id: 1, icon: <ShoppingBag className="w-5 h-5 text-yellow-500" />, title: "Cart Items", value: totalItems.toString(), subtitle: "In your bag", bg: "bg-yellow-500/10" },
    { id: 2, icon: <TrendingUp className="w-5 h-5 text-blue-500" />, title: "Cart Value", value: `$${totalPrice.toFixed(2)}`, subtitle: "Ready to checkout", bg: "bg-blue-500/10" },
    { id: 3, icon: <Star className="w-5 h-5 text-orange-500" />, title: "Top Products", value: products.filter(p => p.rating >= 4.5).length.toString(), subtitle: "Highly rated", bg: "bg-orange-500/10" },
    { id: 4, icon: <Tag className="w-5 h-5 text-purple-500" />, title: "Categories", value: totalCategories.toString(), subtitle: "To explore", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-10 max-w-7xl mx-auto selection:bg-[#c8f400] selection:text-black">

      <section
        className="relative border border-white rounded-[40px] bg-[#0A0A0A] p-8 md:p-12 overflow-hidden"
      >

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-[#c8f400]/5 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full capitalize text-primary">
              {greeting} 👋
            </div>

            <h1 className="text-xl md:text-5xl font-heading tracking-tight leading-[0.9]">
              Welcome back, <br />
              <span className="text-[#c8f400] drop-shadow-[0_0_15px_rgba(200,244,0,0.3)]">
                {loginUser?.name?.split(' ')[0] || "Soham"}!
              </span>
            </h1>

            <p className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed">
              Discover today's picks — hand-curated products across electronics, fashion, and more.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/shop" className="px-8 py-4 bg-[#c8f400] text-black font-bold rounded-2xl transition hover:scale-105 active:scale-95 flex items-center gap-2 group shadow-[0_10px_30px_rgba(200,244,0,0.2)]">
                Shop Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </Link>
              <Link to="/shop" className="px-8 py-4 bg-white/5 border border-white/10 font-bold rounded-2xl transition hover:bg-white/10 active:scale-95">
                View All Products
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4 shrink-0">
            <div className="p-6 rounded-2xl bg-[#c8f400]/10 border border-white/10 shadow-2xl relative group overflow-hidden">
              <h2 className="text-3xl font-heading font-black text-[#c8f400] mb-1">20+</h2>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Products Available</p>
            </div>

            <div className="p-6 rounded-2xl border border-white shadow-2xl relative group overflow-hidden">
              <h2 className="text-xl font-heading font-black text-white mb-1">Free</h2>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Delivery on ₹999+</p>
            </div>
          </div>
        </div>
      </section>


      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardCards.map((card) => (
          <div
            key={card.id}
            className={`p-6 rounded-3xl border border-white bg-white/5 flex items-center gap-6 group hover:border-white/20 transition-all`}
          >
            <div className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
              {card.icon}
            </div>
            <div>
              <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{card.title}</div>
              <div className="text-xl font-heading font-black">{card.value}</div>
              <div className="text-[10px] text-gray-600">{card.subtitle}</div>
            </div>
          </div>
        ))}
      </div>


      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-heading font-black">Shop by Category</h2>
          <Link to="/shop" className="text-[#c8f400] text-xs font-bold flex items-center gap-1 hover:underline group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -5 }}
              className="p-6 rounded-[24px] bg-white border border-white/10 flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-14 h-14 bg-black/5 rounded-2xl flex items-center justify-center text-black mb-4 group-hover:scale-110 transition">
                {cat.icon}
              </div>
              <div className="text-black font-heading font-bold text-xs mb-0.5">{cat.title}</div>
              <div className="text-gray-400 text-[9px] font-bold uppercase">{cat.count} items</div>
            </motion.div>
          ))}
        </div>
      </section>


      <div className="grid lg:grid-cols-2 gap-10">

        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />
              <h2 className="text-xl font-heading font-black">Top Rated</h2>
            </div>
            <Link to="/shop" className="text-[#c8f400] text-xs font-bold flex items-center gap-1 hover:underline">
              See all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {loading ? (
              [1, 2, 3].map(i => <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse" />)
            ) : (
              topRated.map(p => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/products/${p.id}`)}
                  className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group cursor-pointer hover:border-[#c8f400]/20"
                >
                  <div className="flex items-center gap-4">
                    <img src={p.thumbnail} alt="" className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="text-xs font-bold truncate max-w-[150px]">{p.title}</div>
                      <div className="text-[#c8f400] font-black text-xs">${p.price}</div>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p);
                    }}
                    className="p-2.5 rounded-xl bg-[#c8f400]/10 text-[#c8f400] group-hover:bg-[#c8f400] group-hover:text-black transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>


        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Zap className="text-[#c8f400] w-5 h-5 fill-[#c8f400]" />
              <h2 className="text-xl font-heading font-black">New Arrivals</h2>
            </div>
            <Link to="/shop" className="text-[#c8f400] text-xs font-bold flex items-center gap-1 hover:underline">
              See all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {loading ? (
              [1, 2, 3].map(i => <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse" />)
            ) : (
              newArrivals.slice(0, 6).map(p => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/products/${p.id}`)}
                  className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group cursor-pointer hover:border-[#c8f400]/20"
                >
                  <div className="flex items-center gap-4">
                    <img src={p.thumbnail} alt="" className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="text-xs font-bold truncate max-w-[150px]">{p.title}</div>
                      <div className="text-[#c8f400] font-black text-xs">${p.price}</div>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p);
                    }}
                    className="p-2.5 rounded-xl bg-[#c8f400]/10 text-[#c8f400] group-hover:bg-[#c8f400] group-hover:text-black transition"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>


      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
        {[
          { icon: <Zap className="w-5 h-5" />, title: "Fast Delivery", desc: "Same day on select items" },
          { icon: <ShieldCheck className="w-5 h-5" />, title: "Secure Payments", desc: "100% encrypted checkout" },
          { icon: <Tag className="w-5 h-5" />, title: "Best Prices", desc: "Price match guarantee" },
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-3xl border border-white/10 bg-[#0A0A0A] flex items-center gap-5">
            <div className="p-3 rounded-2xl bg-[#c8f400]/10 text-[#c8f400]">
              {item.icon}
            </div>
            <div>
              <div className="font-heading font-black text-xs">{item.title}</div>
              <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{item.desc}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
