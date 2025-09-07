"use client"

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { ThemeProvider } from 'next-themes'


function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { user } = useUser();
    useEffect(() => {
        user && createNewUser();
    }, [user]);

    const createNewUser = async () => {
        const result = await axios.post('/api/user');
    }

    return (
        <ThemeProvider 
            attribute="class" 
            defaultTheme="system" 
            enableSystem={true}
            disableTransitionOnChange={false}
            storageKey="careershot-theme"
        >
            {children}
        </ThemeProvider>
    )
}



export default Provider

