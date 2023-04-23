import React, { useRef } from 'react'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import CarouselCard from './CarouselCard'

const Carousel = (props) => {
    const corouselContainer = useRef()

    const navigation = (dir) => {
      const container = corouselContainer.current
      const scrollAmount =
      dir === "left"
      ? container.scrollLeft - (container.offsetWidth + 5)
      : container.scrollLeft + (container.offsetWidth + 5);

      container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  return (
      <div>
    <div className='flex justify-center mx-9 items-center cursor-pointer'>
      <BsFillArrowLeftCircleFill
      className='text-[29px] mr-3'
        onClick={() => navigation("left")}
      />

      <div ref={corouselContainer} className='grid grid-flow-col w-[91%] h-[29rem] z-10 pt-9 overflow-x-hidden gap-3 overflow-y-hidden'>
        {props.data.length > 0 ? props.data.map((res, index) => {
          return <CarouselCard res={res} key={index} mtype={props.mtype}/>
        }) : (
          <div className='flex justify-center items-center h-full w-full'><div className="custom-loader"></div></div>
        )}
      </div>
      <BsFillArrowRightCircleFill
        className='text-[29px] ml-1 cursor-pointer'
        onClick={() => navigation("right")}
      />
      </div>
    </div>
  )
}

export default Carousel
