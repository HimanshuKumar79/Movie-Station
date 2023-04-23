import React, { useEffect, useState } from 'react'
import Carousel from '../../components/carousel/Carousel'
import { fetchDataFromApi } from '../../api/Api'

const TopRated = () => {
  const [topRated, setTopRated] = useState('movie')
  const [data, setData] = useState([])
  useEffect(() => {
    fetchDataFromApi(`/${topRated}/top_rated`).then(({results}) => {
      setData(results)
    })
  }, [topRated])

  const dayweekclickHandler = (name) => {
    if (name === "movie") {
      setTopRated("movie")
    }
    else {
      setTopRated("tv")
    }
  }
  return (
    <div>
      <div className='flex justify-between items-center w-[86%] mx-auto mt-6'>
      <div className='text-[29px] font-semibold text-white'>Top Rated</div>
      <div className='flex gap-3 w-[11.9rem] justify-between  h-full z-10 bg-white py-1 px-1 rounded-[2rem]'>
        <button className={`py-2 px-6 rounded-[2rem] ${topRated==="movie"?"switchtab":"text-black"}`} name='movie' onClick={(e) => { dayweekclickHandler(e.target.name) }}>Movies</button>
        <button className={`py-2 px-6 rounded-[2rem] ${topRated==="tv"?"switchtab":"text-black"}`} name='tv' onClick={(e) => { dayweekclickHandler(e.target.name) }}>Tv's</button>
      </div>
      </div>
      <Carousel data={data} mtype={topRated}/>
    </div>
  )
}

export default TopRated
