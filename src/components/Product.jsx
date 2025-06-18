import "../css/ProductCard.css"
import { useProductContext } from "../contexts/ProductContext"

function Product({product}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useProductContext()
    const favorite = isFavorite(product.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(product.id)
        else addToFavorites(product)
    }

    return <div className="product-card">
        <div className="product-poster">
            <img src={product.poster_path} alt={product.title}/>
            <div className="product-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
            </div>
        </div>
        <div className="product-info">
            <h3>{product.title}</h3>
            <p>{product.release_date?.split("-")[0]}</p>
        </div>
    </div>
}

export default Product