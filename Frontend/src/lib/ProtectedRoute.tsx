import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

// This component accepts 'children' which are the protected pages
export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    // 1. Check if token exists in local storage
    const token = localStorage.getItem("token");

    // 2. If no token, redirect to signin
    if (!token) {
        return <Navigate to="/signin" replace />;
    }

    // 3. If token exists, render the protected component (e.g., Dashboard)
    return children;
};