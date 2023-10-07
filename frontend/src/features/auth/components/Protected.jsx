import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export function Protected({children}){
    const user = useSelector(state=>state.auth.loggedInUserToken);

    if(!user){
        return <Navigate to="/login" replace={true}></Navigate>
    }
    return children
}