import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import { searchProducts, getPopularProducts } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularProducts = async () => {
      try {
        const popularProducts = await getPopularProducts();
        setProducts(popularProducts);
      } catch (err) {
        console.log(err);
        setError("Failed to load products...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularProducts();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    if (loading) return

    setLoading(true)
    try {
        const searchResults = await searchProducts(searchQuery)
        setProducts(searchResults)
        setError(null)
    } catch (err) {
        console.log(err)
        setError("Failed to search products...")
    } finally {
        setLoading(false)
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for products..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

        {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;