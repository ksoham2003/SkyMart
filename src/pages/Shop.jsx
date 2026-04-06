import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext , useState } from "react";
import { CartContext } from "../context/CartContext";

const Shop = () => {
  const { products, total } = useLoaderData();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const categories = (() => {
    if (!products) return [];
    return ["", ...Array.from(new Set(products.map((product) => product.category)))];
  })();

  const activeFilters = (() => {
    const items = [];
    if (searchTerm) items.push(`Search: "${searchTerm}"`);
    if (category) items.push(category);
    if (sortBy === "price-asc") items.push("Price: Low → High");
    if (sortBy === "price-desc") items.push("Price: High → Low");
    if (sortBy === "rating") items.push("Top Rated");
    return items;
  })();

  const filteredProducts = (() => {
    if (!products) return [];

    const normalizedSearch = searchTerm.trim().toLowerCase();
    let filtered = products.filter((product) => {
      const title = String(product.title || "").toLowerCase();
      const searchMatch =
        !normalizedSearch ||
        title.includes(normalizedSearch);
      const categoryMatch = !category || String(product.category || "") === category;
      return searchMatch && categoryMatch;
    });

    if (sortBy === "price-asc") {
      filtered = filtered.slice().sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered = filtered.slice().sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered = filtered.slice().sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  })();

  return (
    <main className="min-h-screen bg-[#020202] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-white">All Products</h1>
            <p className="text-sm text-white/50">{filteredProducts.length} products found</p>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-4 shadow-[0_25px_80px_-50px_rgba(0,0,0,0.75)] backdrop-blur-xl mb-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-3 rounded-full border border-white/10 bg-[#090909] px-5 py-3 flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white/50"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full bg-transparent text-white placeholder:text-white/30 outline-none"
              />
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end sm:w-auto lg:gap-2">
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="min-w-[12rem] w-full rounded-full border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
              >
                <option value="">All Categories</option>
                {categories.map((categoryValue) =>
                  categoryValue ? (
                    <option key={categoryValue} value={categoryValue}>
                      {categoryValue}
                    </option>
                  ) : null
                )}
              </select>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="min-w-[12rem] w-full rounded-full border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
              >
                <option value="">Featured</option>
                <option value="price-asc">Price: Low - High</option>
                <option value="price-desc">Price: High - Low</option>
                <option value="rating">Top Rated</option>
              </select>
              {activeFilters.length > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setCategory("");
                    setSortBy("");
                  }}
                  className="rounded-full border border-red-500/40 bg-red-500/10 px-6 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
                >
                  ✕ Clear
                </button>
              ) : null}
            </div>
          </div>

          {activeFilters.length > 0 ? (
            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <span
                    key={filter}
                    className="rounded-full border border-[#cef00f] bg-[#cef00f]/10 px-3 py-2 text-xs font-semibold text-[#cef00f]"
                  >
                    {filter}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-5">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white/40 mb-6"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              <h2 className="text-3xl font-bold text-white mb-2">No products found</h2>
              <p className="text-sm text-white/50 mb-8">
                No results for "{searchTerm}"
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setCategory("");
                  setSortBy("");
                }}
                className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredProducts?.map((product, index) => (
              <article
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
                className="group flex flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_25px_80px_-50px_rgba(0,0,0,0.75)] transition-all duration-300 hover:-translate-y-1 hover:border-[#cef00f] hover:shadow-[0_0_20px_rgba(206,240,15,0.3)] cursor-pointer"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <div className="relative overflow-hidden bg-white px-4 py-4">
                  <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white">
                    {product.category}
                  </div>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="mx-auto h-52 w-full max-w-[260px] object-contain transition-transform duration-500 group-hover:scale-125"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5 text-white">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">{product.category}</p>
                  <h2 className="text-base font-semibold text-white/90 leading-tight">{product.title}</h2>
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <span>★ {product.rating.toFixed(1)}</span>
                    <span>({product.stock})</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-lg font-bold text-[#cef00f]">${product.price.toFixed(2)}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="rounded-full bg-[#cef00f] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#d6ff1f]"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
};

export default Shop;
