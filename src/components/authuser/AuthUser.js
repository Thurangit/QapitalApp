import axios from 'axios';
import axiosRetry from 'axios-retry';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthUser() {

    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }
    const getUser = () => {
        const userString = localStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }
    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());
    const saveToken = (user, token) => {
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setUser(user);
        navigate('/')
    }
    const logout = () => {
        localStorage.clear();
        navigate("/signin");
    };
    const http = axios.create({
        baseURL: "http://192.168.44.44:8000/api/",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    // Configure axios-retry
    axiosRetry(http, {
        retries: 99, // nombre de tentatives de réessai
        retryCondition: (error) => {
            // si la réponse est une erreur 429, alors on réessaie
            return error.response.status === 429;
        },
        retryDelay: (retryCount) => {
            // temps avant le prochain réessai
            return retryCount * 500;
        }
    });

    return {
        setToken: saveToken,
        token,
        user,
        getToken,
        http,
        logout,
    }
}

