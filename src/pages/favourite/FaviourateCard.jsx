// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useFirebase } from '../../firebase/Firebaseinit'

// const FaviourateCard = ({res,mtype}) => {
//     const[path,setPath]=useState('')
//     const firebaseFunction=useFirebase()
//     const imgPath=process.env.REACT_APP_IMG_BASE_URL
//     useEffect(()=>{
//         console.log(res?.poster_path?.stringValue)
//         res?.poster_path.stringValue?setPath(res?.poster_path.stringValue):setPath(res?.backdrop_path.stringValue)
//     },[])
//   return (
//     <Link //to={`/${mtype}/${res?.id?.integerValue}`}
//     onClick={()=>{

//       // firebaseFunction.setDocid()
//     }}
//     >
//     <div className='my-16'>
//     <img className='h-[21rem] bg-red-500 hover:scale-110 transition-transform duration-300 rounded-lg' src={`${imgPath}${res?.poster_path.stringValue}`} alt='Poster'/>
//     </div>
//     </Link>
//   )
// }

// export default FaviourateCard
