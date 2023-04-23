import React, { useEffect, useState } from 'react'
import { useFirebase } from '../../firebase/Firebaseinit'
import CarouselCard from '../../components/carousel/CarouselCard'

const Favourite = () => {
  const[data,setData]=useState([])
  const firebaseFunction=useFirebase()

  useEffect(()=>{
    fetchUserDatafromDataBase()
  },[])
  const fetchUserDatafromDataBase=()=>{
    let initial=[]
    let idname=[]
      firebaseFunction.getFavouriteData().then((snap)=>{
         snap.forEach((data)=>{
          idname.push({
            docid:data.id,
            name:data.data().title
          })
          initial.push(
            {
              docId:data.id,
              id: data.data().id,
              title: data.data().title,
              release_date: data.data().release_date,
              poster_path: data.data().poster_path,
              mtype:data.data().type,
              vote_average:data.data().vote_average
            }
          )
        })
        firebaseFunction.setDocid(idname)
        setData(initial)
      })

  }
  return (
    <div className='w-full'>
   <div className='w-[80%] mx-auto flex gap-3 flex-wrap my-6'>
   {
    data.map((item)=>{
     return <CarouselCard res={item} mtype={item?.mtype}/>
    })
   }
   </div>
    </div>
  )
}

export default Favourite


