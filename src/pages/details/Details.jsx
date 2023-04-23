import React from 'react'
import { useParams } from 'react-router-dom'
import HeroBanner from './HeroBanner'
import Cast from './Cast'
import Videos from './Videos'
import SimilarVideos from './SimilarVideos'

const Details = () => {
  const {mediaType,id}=useParams()

  return(
    <div className='h-[100%] w-[100%]'>
    <HeroBanner mediaType={mediaType} id={id}/>
    <Cast mediaType={mediaType} id={id}/>
    <Videos mediaType={mediaType} id={id}/>
    <SimilarVideos mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details
