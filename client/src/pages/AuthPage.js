import React from 'react'
import AuthContainer from '../components/AuthContainer'
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

export default function AuthPage() {
    const { isAuth } = useSelector((store) => store.userSlice);

    if (isAuth) {
        return (<Navigate to="/home/"/>)
    }

    return(
       <AuthContainer>
       </AuthContainer>
    )
}