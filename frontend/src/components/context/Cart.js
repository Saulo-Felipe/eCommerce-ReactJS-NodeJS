import React, { createContext, useContext, useState } from 'react'

const CartProvider = createContext({})

const Cart = (props) => {
	const [cart, setCart] = useState(0)

	return (
		<CartProvider.Provider value={{ cart, setCart }}>
			{ props.children }
		</CartProvider.Provider>
	)
}

const useCart = () => useContext(CartProvider)

export { Cart, useCart }