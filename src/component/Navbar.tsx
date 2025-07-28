'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Link from 'next/link'
const Navbar = () => {
  const [input ,setinput]=useState("")
  const router=useRouter()
  const searchMovie=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    router.push(`?movie=${input}`);
    setinput("");
  }
  return (
    <div className='bg-black text-white py-5 px-0 pt-3'>
      <div className='container mx-auto flex justify-between items-center'>
      <div><Link className='text-3xl font-extrabold' href="./">M-S</Link></div>  
  <form onSubmit={searchMovie}>
    <div>
      <input className='bg-gray-200 text-black h-9 rounded-2xl p-1' placeholder='Search movie here...' type="text" 
      onChange={(e)=>
       ( e.target.value)}/>
       <button type='submit' className='bg-gray-100 py-2 px-4 ml-3 rounded-3xl text-black hover:opacity-50'>Search</button>
    </div>
  </form>
      </div>
      
    </div>

  )
}

export default Navbar
