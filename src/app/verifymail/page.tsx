'use client'
import React, { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
// import { useRouter } from 'next/router'
import Link from 'next/link';

export default function Verifymail() {
    // const router = useRouter();
   const [token,setToken]= useState("")
   const [varified,setVarified]= useState(false)
   const [error,setError]= useState(false)
   const varifiedmail =async()=>{
    try {
        await axios.post("/api/users/verifymail",{token})
        setVarified(true)
    } catch (error) {
        setError(true);

        // Check if the error is an AxiosError and handle accordingly
        if (error instanceof AxiosError) {
           console.log("Verification failed:", error.response?.data);
        } else {
           console.log("Unexpected error:", (error as Error).message);
        }
    }
   }

   useEffect(()=>{
    const urlToken=window.location.search.split("=")[1]
    setToken(urlToken || "")
    // const {query} =router;
    // const urlTokentwo =query.token
   }, [])
   useEffect(()=>{
    if (token.length > 0){
        varifiedmail()
    }
   },[token])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-4xl'>Verify Email</h1>
        <h2 className='p-2 bg-orange-500 text-black'>
            {token ? `${token}` :"no token"}
        </h2>
        {varified && (
            <div>
                <h2>Verified</h2>
                <Link href="/login">Login</Link>
            </div>
        )}
        {error &&(
            <div>
                <h2>Error</h2>
            </div>
        )}
        </div>
  )
}

