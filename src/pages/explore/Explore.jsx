import React, { useEffect, useState } from 'react'
import { fetchDataFromApi, fetchSearchDataFromApi } from '../../api/Api'
import { useParams } from 'react-router-dom'
import CarouselCard from '../../components/carousel/CarouselCard'
import InfiniteScroll from 'react-infinite-scroll-component'

const Explore = () => {
  const [data, setData] = useState([])
  const [loading,setLoading] = useState(false)
  const[page,setPage]=useState(1)
  const[pages,setPages]=useState(0)
  const {mediaType}=useParams()

  useEffect(() => {
    initData()
  }, [mediaType])

  const initData=()=>{
    setData([])
    setLoading(true)
    fetchDataFromApi(`/discover/${mediaType}`,page).then((res) => {
      console.log(res)
      setData(res?.results)
      setPage((pre)=>pre+1)
      setPages(res.total_pages)
    }).then(()=>{
      setLoading(false)
    })
  }


  const datasetNextPage=()=>{
    setLoading(true)
    fetchDataFromApi(`/discover/${mediaType}`,page).then((res)=>{
      console.log("Chutiya banaya tumko")
      console.log(res)
      setData((pre)=>[...pre,...res?.results])
      setPage((pre)=>pre+1)
    }).then(()=>{
      setLoading(false)
    })
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='my-6 h-fit w-[90%]'>
      <div className='flex gap-6 flex-wrap'>
        {
          (loading || (data.length)===0 || data===undefined || data===null)?(<div className='flex justify-center items-center h-[100vh] w-[100vw]'><div className="custom-loader"></div></div>):
          <InfiniteScroll
            className='flex flex-wrap justify-center items-center gap-6 w-full py-6'
            dataLength={data?.length || []}
            next={datasetNextPage}
            hasMore={page <= pages}
            loader={<div className='custom-loader'></div>}
            >
              {
                data.map((data)=>{
                return <CarouselCard key={data.id} res={data}/>
              })
              }
            </InfiniteScroll>
        }
      </div>
    </div>
    </div>
  )
}

export default Explore
