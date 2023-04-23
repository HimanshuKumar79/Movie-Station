import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../../api/Api'
import VideoPlayer from '../../components/VideoPlayer'
import "react-circular-progressbar/dist/styles.css";
import dayjs from 'dayjs';
import { HiStar } from 'react-icons/hi';
import { useFirebase } from '../../firebase/Firebaseinit'
import {IoAddCircle, IoRemoveCircle} from 'react-icons/io5'
import { CheckmarkIcon, toast } from 'react-hot-toast';


const HeroBanner = ({mediaType,id}) => {
    const[data,setData]=useState([])
    const[loader,setLoader]=useState(false)
    const[activatepopup,setActivatePopup] = useState(false)
    const[star,setStar]=useState([])
    const[liked,setLiked] = useState(false)
    const firebaseFunction=useFirebase()
    const[name,setmyname]=useState(false)
    const imgPath=process.env.REACT_APP_IMG_BASE_URL
    const[documentId,setDocumentId]=useState('')
    useEffect(()=>{
      setLoader(true)
      fetchDataFromApi(`/${mediaType}/${id}`).then((results)=>{
        setData(results)
          firebaseFunction.docid.map((res)=>{
            if(res.name===results.title){
             setDocumentId(res.docid)
            }
          })
        setRating(results?.vote_average)
          setLoader(false)
        }).catch((error)=>{
          console.log(error)
        })
        checkLikedorNot()
    },[id,mediaType,documentId,name])


    const checkLikedorNot=()=>{
      setLiked(false)
        firebaseFunction.getFavouriteData().then(async(snap)=>{
           await snap.forEach((data)=>{
            console.log(typeof(data.data().id))
            console.log(typeof(id))
            if(data.data().id==id){
              console.log((`${data.data().id}===${id}`))
              console.log("Matched")
              setLiked(true)
            }
          })

        })

    }



    const clickHandler=()=>{
      setActivatePopup(!activatepopup)
    }

    const toHoursAndMinutes = (totalMinutes) => {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const setRating=(vote_average)=>{
    let stars=[]
    for(let i=0; i<10;i++){
      if(i<=vote_average){
       stars.push(<HiStar className='text-[#ffeb33] text-[33px]'/>)
      }
      else{
        stars.push(<HiStar className='text-[#ffffff6b] text-[33px]'/>)
      }
    }
    setStar(stars)
  }
  return (
    <div>
      {
        loader?<div className='h-[100vh] w-[100vw] flex justify-center items-center'><div className='custom-loader'></div></div>:
        <div className='flex gap-6 w-[66rem] mx-auto mt-9'>
        <img src={`${imgPath}/${data?.poster_path}`} className='h-[33rem] w-[22rem] rounded-xl' alt='poster'/>
        <div className='flex flex-col justify-evenly'>
          <div>
          <p className='text-[white] text-[39px] font-semibold'>{data?.title || data?.name}</p>
          <p className='text-[19px] italic text-[#b2aeae]'>{data?.tagline}</p>
          </div>
          <div className='flex gap-3'>
            {
              data?.genres && data?.genres.map((res,index)=>{
                return <p key={index} className='py-1 rounded-lg h-fit w-fit px-2 bg-red-600 text-white'>{res?.name}</p>
              })
            }
          </div>

          <div className='flex gap-1 h-fit'>
            {
              star.map((star,index)=>{
              return <div key={index}>{star}</div>
              })
            }
          </div>
        <div className='text-white'>
          <p className='text-[29px]'>Overview</p>
          <p className='text-[17px]'>{data?.overview}</p>
        </div>
        <div className='flex text-[#c3bbbb] text-[19px] gap-9 items-center'>
          <p><span className='font-semibold text-white'>Status :</span> {data?.status}</p>
          <div className='h-6 w-[0.16rem] bg-[#bcb7b7] rounded-xl'></div>
          <p><span className='font-semibold text-white'>ReleaseDate :</span> {dayjs(data?.release_date).format("MMM D, YYYY")}</p>
          <div className='h-6 w-[0.16rem] bg-[#bcb7b7] rounded-xl'></div>
          <p><span className='font-semibold text-white'>Runtime :</span> {toHoursAndMinutes(data?.runtime)}</p>
        </div>
        <div className='flex gap-3'>
        <div onClick={()=>clickHandler()} className='w-fit bg-white text-black px-4 py-2 rounded-lg cursor-pointer font-semibold'>Watch Trailer</div>
        {
          localStorage.getItem('uid') &&
         ( liked?<div className='bg-[white] py-3 px-5 rounded-lg cursor-pointer'
         onClick={async()=>{
          documentId && await firebaseFunction.deleteFavouriteData(documentId)
          setmyname(!name)
          toast.success('Item Removed Successfully')
         }}
         >{
          documentId?<IoRemoveCircle/>:<CheckmarkIcon/>
         }</div>:<div className='bg-[white] py-3 px-5 rounded-lg cursor-pointer' onClick={()=>{
                  firebaseFunction.setFavouriteData({...data,type:mediaType})
                  setLiked(true)
                  toast.success('Item Added Successfully')
                }}><IoAddCircle/></div>
        )
        }

        </div>
        </div>
        </div>
      }
      {
        activatepopup && <VideoPlayer mediaType={mediaType} id={id} clickHandler={clickHandler}/>
      }
    </div>
  )
}

export default HeroBanner
