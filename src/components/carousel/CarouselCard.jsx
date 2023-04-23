import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import {HiStar} from 'react-icons/hi'
import { Link, useParams } from 'react-router-dom'

const CarouselCard = ({res,mtype}) => {
  const[info,setInfo]=useState(false)
  const[media,setMedia]=useState('')
  const[id,setId]=useState(null)
  const {mediaType}=useParams()

  useEffect(()=>{
    setMedia(res?.media_type || mediaType || mtype)
    setId(res?.id)
  },[media,res?.media_type,mtype,res?.id,mediaType])
  const handleMouseOver=()=>{
    setInfo(true)
  }
  const handleMouseOut=()=>{
    setInfo(false)
  }
  const imgPath=process.env.REACT_APP_IMG_BASE_URL
  return (
    <Link to={`/${media}/${id}`}>
      {
        ((res?.poster_path)!==undefined) && ((res?.poster_path)!==null)? (<div
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className='w-[16rem] h-fit rounded-xl relative hover:scale-110 transition-all duration-500'>
          {
            info?(<div className='flex flex-col absolute h-full w-full justify-end'>
              <div className='h-[50%] w-full bg-gradient-to-t from-[#4b4a4a] to-transparent rounded-t-xl transition-all duration-500'></div>
              <div className='relative flex flex-col items-start justify-end w-full h-fit bg-[#1b1a1a] to-transparent rounded-b-xl pl-3 py-2'>
                <p className='text-white font-semibold'>{res?.title?res?.title:res?.name}</p>
                <p className='text-white'>{dayjs(res?.release_date).format("MMM D, YYYY")}</p>
                <div className='flex gap-1 justify-start items-center '>
                <HiStar className='text-[#ffeb33] text-[23px]'/>
                <p className='text-white'>{res?.vote_average}/10</p>
                </div>
                </div>
            </div>):''
          }
         <img loading='lazy' src={`${imgPath}/${res?.poster_path}`} className=' object-contain h-fit  w-fit rounded-xl shadow-lg ' alt='Poster'/>
      </div>):''
      }
    </Link>

  )
}

export default CarouselCard
