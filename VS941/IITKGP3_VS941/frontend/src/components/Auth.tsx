import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../hooks/useThemeContext";
import { NavbarMinimal } from "./NavbarMinimal";

function Auth({children}: any) {

    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const navigate = useNavigate();
    const {colorMode} = useThemeContext()

    useEffect(() => {
        if(!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])

    return(
        <div className="layout">
            <NavbarMinimal />
            <div className={`main-area ${colorMode}`}>
                {children}
            </div>
        </div>
    )
}

export default Auth;