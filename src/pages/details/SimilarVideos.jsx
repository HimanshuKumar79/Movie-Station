import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../../api/Api'
import Carousel from '../../components/carousel/Carousel'

const SimilarVideos = ({mediaType,id}) => {
    const[data,setData]=useState([])
    useEffect(()=>{
        fetchDataFromApi(`/${mediaType}/${id}/similar`).then(({results}) =>{
            setData(results)
        })
    },[mediaType,id])
  return (
    <div className="overflow-x-auto overflow-y-hidden w-[66rem] mx-auto py-[1rem] mt-3">
        <p className='text-white  text-[2.5rem] font-semibold'>Similar Videos</p>
      <Carousel data={data} mediaType={mediaType}/>
    </div>
  )
}

export default SimilarVideos
