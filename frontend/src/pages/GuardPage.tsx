// react
import React from "react";

// redux
import { RootState } from "../store/store";
import { useAppSelector } from "../hooks/reduxHooks";

// plugins
import { Navigate } from "react-router-dom";

const GuardPage = ({ children }: { children: React.ReactNode }) => {
    const { user, status } = useAppSelector((state: RootState) => state.auth);

    if (status === "loading") return <div>Loading...</div>;
    return user ? children : <Navigate to="/login" />;
};

export default GuardPage;
