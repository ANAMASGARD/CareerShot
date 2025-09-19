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
        try {
            // Only attempt to create user if we have a valid user object with email
            if (!user?.primaryEmailAddress?.emailAddress) {
                console.log('User not ready yet or missing email');
                return;
            }

            const result = await axios.post('/api/user', {
                name: user.fullName || user.firstName || '',
                email: user.primaryEmailAddress.emailAddress
            });
            
            console.log('User created/found:', result.data);
        } catch (error: any) {
            console.error('Error creating user:', error.response?.data || error.message);
            
            // Don't throw error - just log it so app continues to work
            // The user experience shouldn't be broken if user creation fails
        }
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

