/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../../api/Api'
import avatar from '../../assets/profile.png'

const Cast = ({mediaType,id}) => {
    const[data,setData] =useState([])
    useEffect(()=>{
        fetchDataFromApi(`/${mediaType}/${id}/credits`).then(({cast})=>{
            setData(cast)
        })
    },[mediaType,id])
    const imgPath=process.env.REACT_APP_IMG_BASE_URL
  return (
    <div className="overflow-x-auto w-[66rem] mx-auto py-[1rem] mt-9">
    <p className='text-white text-[2.5rem] font-semibold'>Top Cast</p>
    <div className='w-[100%] flex gap-9 items-baseline'>
    {data?.map((item) => {
        let imgUrl = item.profile_path?imgPath + item.profile_path:avatar

        return (
            <div key={item.id} className='flex flex-col items-center justify-center h-fit'>
                    <div className='w-[10rem] h-[10rem]'>
                    <img className='rounded-full object-cover h-[100%] w-[100%] bg-[#757586]' src={imgUrl} />
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                    <div className="text-[white] font-semibold text-[19px] text-center">{item.name}</div>
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

export default Cast
