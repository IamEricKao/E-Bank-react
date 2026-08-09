import { Navigate, useLocation } from "react-router-dom";
import { apiService } from "./api";
import { Component } from "react";

export const CustomerRoute = ({element: Component}) => {

    const location = useLocation();
    return apiService.isCustomer() ? ( 
        Component 
    ) : (
        <Navigate to="/login" replace state={{from: location}}/>
    )
}

export const AuditorRoute = ({element: Component}) => {

    const location = useLocation();
    return apiService.isAdmin() || apiService.isAuditor() ?  ( 
        Component 
    ) : (
        <Navigate to="/login" replace state={{from: location}}/>
    )
}