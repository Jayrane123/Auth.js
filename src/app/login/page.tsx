'use client';
import {  useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function LoginPage () {
const router = useRouter()
const [user,setUser]= useState({
    email :"",
    password : "",
})
const [buttonDisable,setButtonDisable] = useState(false)
const [loading,setLoading]=useState(false)

const onLogin =async ()=>{
try {
    setLoading(true)
    const response = await axios.post("/api/users/login",user)
    console.log("Login SUccesfully" , response.data)
    router.push('/profile')
} catch (error) {
    console.log("SignUp Failed");
    toast.error((error as Error).message);
}

}

useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0){
        setButtonDisable(false)
    }else{
        setButtonDisable(true)
    }
},[user])
return(
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>{loading ? "Processing": "SignUp"}</h1>
        <hr />
        <label htmlFor="email">Email</label>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" 
        id="email"
        value={user.email}
        onChange={(e)=>setUser({...user, email:e.target.value})}
        placeholder="email"
        type='email' />
        <label htmlFor="password">Password</label>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" 
        id="password"
        value={user.password}
        onChange={(e)=>setUser({...user, password:e.target.value})}
        placeholder="password"
        type='password' />
        <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
            {buttonDisable ? "No Login" : "Login"}
        </button>
        <Link href="/signup">Visit login page</Link>
    </div>
)

}