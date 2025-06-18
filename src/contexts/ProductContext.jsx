
import {createContext, useState, useContext, useEffect} from "react"

const ProductContext = createContext()

export const useProductContext = () => useContext(ProductContext)

export const ProductProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")

        if (storedFavs) setFavorites(JSON.parse(storedFavs))
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (product) => {
        setFavorites(prev => [...prev, product])
    }

    const removeFromFavorites = (productId) => {
        setFavorites(prev => prev.filter(product => product.id !== productId))
    }
    
    const isFavorite = (productId) => {
        return favorites.some(product => product.id === productId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <ProductContext.Provider value={value}>
        {children}
    </ProductContext.Provider>
}
