'use client'

import React from 'react'


interface PageProps {
    params: {
      id: string;
    };
  }
export default function page({params}:PageProps) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>
            Profile Page
        </h1>
        <h2 className='p-3 bg-gray-500 rounded text-black'>{params.id}</h2>
        </div>
  )
}

