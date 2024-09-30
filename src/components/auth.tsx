"use client"

import { useEffect, useState } from "react";
import jwt from 'jsonwebtoken';

export default function Auth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        setIsAuthenticated(() => checkAuth());
    }, []);

    return isAuthenticated;
}

function checkAuth(): boolean {
    const token = localStorage.getItem('userToken');
    if (!token || isTokenExpired(token)) {
        return false;
    }
    return true;

}


const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwt.decode(token) as { exp?: number };

        if (!decoded || typeof decoded.exp !== 'number') {
            return true; // Invalid token or no exp claim
        }

        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime; // true if expired, false otherwise
    } catch {
        return true; // Assume expired on error
    }
};