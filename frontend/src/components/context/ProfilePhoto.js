import React, { useState, createContext, useContext } from "react"
import {isAuthenticated} from '../../services//isAuthenticated'


const photoProvider = createContext() 


const ProfilePhoto = (props) => {

	const [profilePhoto, setProfilePhoto] = useState();

	return (

		<photoProvider.Provider value={{profilePhoto, setProfilePhoto}}>
			{props.children}
		</photoProvider.Provider>

	)
}

const useProfilePhoto = () => useContext(photoProvider)


export { ProfilePhoto, useProfilePhoto }