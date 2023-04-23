import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { fetchDataFromApi } from '../api/Api'

const VideoPlayer = ({mediaType,id, clickHandler}) => {
  const[key,setKey]=useState(null)

  useEffect(()=>{
    fetchDataFromApi(`/${mediaType}/${id}/videos`).then((res)=>{
      setKey(res.results[0].key)
    })
  })
    return (



         <div className='absolute top-0 left-0 bottom-0 right-0 scale-100  bg-[rgba(0,0,0,0.25)] flex items-center justify-center backdrop-blur-[3.5px] ' onClick={()=>clickHandler()}>
        <div className={`h-fit w-fit bg-white z-10 popupanimation`}>
        <div className='relative'>
        <button className='underline text-white absolute text-[20px] right-0 -top-6'>Close</button>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${key}`}
              className='h-full w-full'
            />
        </div>
          </div>
          </div>


  )
}

export default VideoPlayer

