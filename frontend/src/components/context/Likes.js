import React, { useState, createContext, useContext } from "react"

const LikeProvider = createContext({})

const Like = (props) => {
	const [like, setLike] = useState(0)

	return (
		<LikeProvider.Provider value={{ like, setLike }}>
			{props.children}
		</LikeProvider.Provider>
	)
}

const useLike = () => useContext(LikeProvider)

export { Like, useLike }