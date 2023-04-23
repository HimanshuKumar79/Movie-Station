/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../../api/Api'
import ReactPlayer from 'react-player'

const Videos = ({mediaType,id}) => {
    const[data,setData] =useState([])
    useEffect(()=>{
        fetchDataFromApi(`/${mediaType}/${id}/videos`).then(({results})=>{
            setData(results)
        })
    },[id,mediaType])
  return (
    <div className="overflow-x-auto overflow-y-hidden w-[66rem] mx-auto py-[1rem] mt-3">
    <p className='text-white text-[2.5rem] font-semibold'>Official Videos</p>
    <div className='w-[100%] flex gap-9 items-baseline'>
    {data?.map((item) => {
        return (
            <div key={item.id} className='flex flex-col gap-3  items-start justify-center h-fit'>
                    <ReactPlayer height={'15rem'} width={'29rem'} url={`https://www.youtube.com/watch?v=${item?.key}`}/>
                    <div className='flex flex-col items-center justify-center'>
                    <div className="text-[white] text-[19px]">{item.name}</div>
                    <div className="text-[#b5b4b4] text-[16px] text-center">
                    {item.character}
                    </div>
                    </div>
            </div>
        );
    })}
    </div>
</div>
  )
}

export default Videos
