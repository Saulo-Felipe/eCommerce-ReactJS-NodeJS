import React, {useState, createContext, useContext} from 'react'

const RatingProvider = createContext({ })

const Rating = (props) => {
	const [allRating, setAllRating] = useState({ note: 0, totalRating: 0 })

	return (
		<RatingProvider.Provider value={{ allRating, setAllRating }}>
			{props.children}
		</RatingProvider.Provider>
	)
}

const useRating = () => useContext(RatingProvider)



export { Rating, useRating }