'use client'
import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export default function ProfilePage() {
  const router =useRouter();
  const[data ,setData]=useState("nothing")

  const getUserDetails=async ()=>{
    try {
      const res=await axios.post("/api/users/me")
      console.log(res.data.data._id)
      setData(res.data.data._id)
    }  catch (error) {
      console.log((error as Error).message)  
    }

  }

  const logout=async()=>{
    try {
      await axios.get("/api/users/logout")
      toast.success("Logout Success")
      router.push("/login")
    } catch (error) {
      console.log((error as Error).message)
      toast.error((error as Error).message)
      
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'> <h1>Profile Page</h1>
    <hr />
    <h2>{data==="Nothing"? "Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
    <hr />
    <button
    className="p-2 border border-width-16 border-orange-300 rounded-lg mb-4 focus:outline-none focus:border-yellow-600 bg-blue-600"
    onClick={logout}
    >LogOut</button>
    <button
    className="p-2 border border-width-16 border-orange-300 rounded-lg mb-4 focus:outline-none focus:border-yellow-600 bg-blue-600"
    onClick={getUserDetails}
    >Get User Detailed</button>
    </div>
  )
  
}

