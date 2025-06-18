
import "../css/Favorites.css";
import { useProductContext } from "../contexts/ProdcutContext";
import ProductCard from "../components/ProductCard";

function Favorites() {
  const { favorites } = useProductContext();

  if (favorites) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {favorites.map((product) => (
            <ProductCard movie={product} key={product.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No Favorite Products Yet</h2>
      <p>Start adding products to your favorites and they will appear here!</p>
    </div>
  );
}

export default Favorites;
