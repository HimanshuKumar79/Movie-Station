import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {FiSearch} from 'react-icons/fi'
import profile from '../assets/profile.png'
import { useFirebase } from '../firebase/Firebaseinit'
import { toast } from 'react-hot-toast'

const NavBar = () => {
  const[query,setQuery]=useState('')
  const[user,setUser] = useState('')
  const useFunction=useFirebase()
  const[sidebar,setSidebar] = useState(false)
  const navigate=useNavigate()
  useEffect(()=>{
    setUser(localStorage.getItem('uid'))
  },[user])

  const logout=()=>{
    useFunction.Signout().then(()=>{
      localStorage.removeItem('uid')
      localStorage.removeItem('email')
      localStorage.removeItem('password')
      toast.success('LogOut Successfully')
      setTimeout(()=>window.location.reload(),1000)
    }).then(()=>{
      navigate('/')
    }).catch((error)=>{
      toast.error("Something went wrong")
    })
  }

  return (
    <div className='bg-[#252833] w-full px-16 py-2 flex justify-between items-center shadow-md sticky top-0 z-30 '>
      <Link to={'/'} className='font-mono bg-red-400 text-white font-semibold flex justify-center items-center px-6 py-2 rounded-lg shadow-md'>
      Movie Station
      </Link>
      <div className='flex gap-x-6'>
        <NavLink to={'/'} className='text-[#8c95ae] text-[23px] font-semibold '>Home</NavLink>
        <NavLink to={'/explore/tv'} className='text-[#8c95ae] text-[23px] font-semibold'>TV</NavLink>
        <NavLink to={'/explore/movie'} className='text-[#8c95ae] text-[23px] font-semibold'>Movie</NavLink>
      </div>
        <div className='flex gap-3 items-center justify-center'>
          <div className='border-[#202227] flex justify-start  items-center gap-x-3 px-3 h-10 shadow-md rounded-lg  border-[0.01rem]'>
          <NavLink to={(query?`/search/${query}`:'')}>
          <FiSearch  className='text-[#cccaca]'/>
          </NavLink>
          <input prefix={<FiSearch/>} className='outline-none text-white bg-[#252833]' type='text' placeholder='Movies, Showes and more' value={query} onChange={(e)=>{setQuery(e.target.value)}}/>
          </div>
          {
            user?<img src={profile} onClick={()=>setSidebar(!sidebar)} className='h-[39px] w-[39px] rounded-full' alt='profile'/>:<Link to={'/login/user'} className='text-white text-[19px] bg-[#363333] py-1 px-6 rounded-xl'>SignUp</Link>
          }
          {
            sidebar && <div className='absolute h-[190px] w-[160px] bg-[#d8d9dd] right-2 top-14 rounded-md' >
              <div className='flex flex-col justify-between h-full w-full py-3 px-2'>
              <div>
              <p>Hi,{localStorage.getItem('userName')}</p>
              <Link to={'/favourite'}>Favourite</Link>
              </div>
              <p onClick={()=>logout()}>Log Out</p>
              </div>
            </div>
          }
        </div>
    </div>
  )
}

export default NavBar
