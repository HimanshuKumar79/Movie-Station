import React from 'react'
import {ImFacebook2} from 'react-icons/im'
import {FaTwitterSquare,FaLinkedin,FaInstagramSquare} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='w-full h-[16rem] bg-[#333232] pt-6 '>
    <div className='w-[54rem] mx-auto flex flex-col gap-9  items-center'>
    <div className='flex gap-6 w-fit'>
      <p className='text-white text-[19px] hover:text-[#8c8686] transition-color duration-200'>Terms Of Use</p>
      <p className='text-white text-[19px] hover:text-[#8c8686] transition-color duration-200'>Privacy-Policy</p>
      <p className='text-white text-[19px] hover:text-[#8c8686] transition-color duration-200'>About</p>
      <p className='text-white text-[19px] hover:text-[#8c8686] transition-color duration-200'>Blog</p>
      <p className='text-white text-[19px] hover:text-[#8c8686] transition-color duration-200'>FAQ</p>
    </div>
    <p className='text-[#999090] text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    <div className='flex gap-6 items-baseline'>
      <ImFacebook2 className='text-white text-[26px] hover:text-[#8c8686] transition-color duration-150'/>
      <FaInstagramSquare className='text-white text-[27px] hover:text-[#8c8686] transition-color duration-150'/>
      <FaTwitterSquare className='text-white text-[26px] hover:text-[#8c8686] transition-color duration-150'/>
      <FaLinkedin className='text-white text-[26px] hover:text-[#8c8686] transition-color duration-150'/>
    </div>
    </div>

    </div>
  )
}

export default Footer
