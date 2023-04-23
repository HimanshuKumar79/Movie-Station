import React, { useEffect, useState } from 'react'
import { fetchSearchDataFromApi } from '../../api/Api'
import { useParams } from 'react-router-dom'
import CarouselCard from '../../components/carousel/CarouselCard'
import InfiniteScroll from 'react-infinite-scroll-component'

const SearchResults = () => {
  const [searchData,setSearchData]=useState([])
  const [loading,setLoading]=useState(false)
  const [page,setPage] = useState(1)
  const [pages,setPages]=useState(1)
  const {query}=useParams()

  useEffect(()=>{
    setSearchData([])
    setPage(1)
    datasetInitial()
  },[query])


  const datasetInitial=()=>{
    setLoading(true)
    fetchSearchDataFromApi(`&query=${query}&page=${page}`).then((res)=>{
      setSearchData(res?.results)
      setPage((pre)=>pre+1)
      console.log(res)
      setPages(res?.total_pages)
    }).then(()=>{
      setLoading(false)
    })
  }

  const datasetNextPage=()=>{
    setLoading(true)
    fetchSearchDataFromApi(`&query=${query}&page=${page}`).then((res)=>{
      console.log(page)
      setSearchData((pre)=>[...pre,...res?.results])
      setPage((pre)=>pre+1)
    }).then(()=>{
      setLoading(false)
    })
  }



  return (
      <div>
          {
            loading?(
              <div className='flex justify-center items-center h-[100vh] w-[100vw]'><div className="custom-loader"></div></div>

            ):(((searchData.length)===0 || searchData===undefined || searchData===null)?<div> Sorry, Results not found!</div>:
            <InfiniteScroll
            className='flex flex-wrap justify-center items-center gap-6 w-full py-6'
            dataLength={searchData?.length || []}
            next={datasetNextPage}
            hasMore={page <= pages}
            loader={<div className='custom-loader'></div>}
            >
              {
                searchData.map((data)=>{
                return <CarouselCard key={data.id} res={data}/>
              })
              }
            </InfiniteScroll>
            )
          }

    </div>
  )
}

export default SearchResults

