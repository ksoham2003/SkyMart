import { createContext, useState } from "react";

export let Auth = createContext();

export let AuthProvider = ({children}) =>{
    const [registerUser, setRegisterUser] = useState(JSON.parse(localStorage.getItem("sm_users")) || []);
    const [loginUser, setLoginUser] = useState(() => {
        const session = localStorage.getItem("sm_session");
        return session ? JSON.parse(session) : null;
    });

    return(
        <Auth.Provider
        value={{
            loginUser,
            setLoginUser,
            registerUser,
            setRegisterUser
        }}
        >
            {children}
        </Auth.Provider>
    )
}