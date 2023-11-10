import { createContext, useEffect, useState } from "react";
import axiosClient from "../axios-client";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        axiosClient.get("/auth/getUser").then((response) => {
            setUser(response.data.user)
        }).catch((error) => {
            console.log(error);
        })
    }, [])


    return (
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    )

}


export default UserContext