"use client"; // If you're using Next.js 13 or later with app directory

import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            {children}
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick    
                pauseOnHover
                draggable
                theme="light"
            />
        </>
    );
};

export default ToastProvider;