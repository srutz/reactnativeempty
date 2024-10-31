import { createContext, ReactNode, useContext, useState } from "react"
import { Product } from "../components/Types"


export type ProductCartItem = {
    product: Product
    count: number
}

export type CartContextType = {
    items: ProductCartItem[]
    addToCart: (item: Product) => void
    removeFromCart: (item: Product) => void
    getItemCount: () => number
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartContextProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<ProductCartItem[]>([])

    const addToCart = (item: Product) => {
        const existingItem = items.find(i => i.product.id === item.id)
        if (existingItem) {
            existingItem.count++
            setItems([...items])
        } else {
            setItems([...items, { product: item, count: 1 }])
        }
    }

    const removeFromCart = (item: Product) => {
        const existingItem = items.find(i => i.product.id === item.id)
        if (existingItem) {
            if (existingItem.count > 1) {
                existingItem.count--
                setItems([...items])
            } else {
                setItems(items.filter(i => i.product.id !== item.id))
            }
        }
    }

    const getItemCount = () => {
        return items.reduce((acc, item) => acc + item.count, 0)
    }

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, getItemCount }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCartContext() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCartContext must be used within a CartContextProvider')
    }
    return context
}

