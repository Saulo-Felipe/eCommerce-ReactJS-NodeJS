import React, { useState, createContext, useContext } from "react"

const photoProvider = createContext() 


const ProfilePhoto = (props) => {

	const [profilePhoto, setProfilePhoto] = useState(`${process.env.REACT_APP_SERVER_DEVELOPMENT}/images/user.png/null/profile`);

	return (
		<photoProvider.Provider value={{profilePhoto, setProfilePhoto}}>
			{props.children}
		</photoProvider.Provider>
	)
}

const useProfilePhoto = () => useContext(photoProvider)


export { ProfilePhoto, useProfilePhoto }