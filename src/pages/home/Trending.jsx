import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../../api/Api';
import Carousel from '../../components/carousel/Carousel';

const Trending = () => {
  const [trending, setTrending] = useState('day')
  const [data, setData] = useState([])
  useEffect(() => {
    fetchDataFromApi(`/trending/all/${trending}`).then(({results}) => {
      setData(results)
    })
  }, [trending])

  const dayweekclickHandler = (name) => {
    if (name === "day") {
      setTrending("day")
    }
    else {
      setTrending("week")
    }
  }


  return (
    <div>
      <div className='flex justify-between items-center w-[86%] mx-auto mt-6'>
      <div className='text-[29px] font-semibold text-white'>Trending</div>
      <div className='flex gap-3 w-[11.6rem] justify-between  h-full z-10 bg-white py-1 px-1 rounded-[2rem]'>
        <button className={`py-2 px-6 rounded-[2rem] ${trending==="day"?"switchtab":"text-black"}`} name='day' onClick={(e) => { dayweekclickHandler(e.target.name) }}>Day</button>
        <button className={`py-2 px-6  rounded-[2rem] ${trending==="week"?"switchtab":"text-black"}`} name='week' onClick={(e) => { dayweekclickHandler(e.target.name) }}>Week</button>
      </div>
      </div>
      <Carousel data={data}/>
    </div>
  )
}

export default Trending




