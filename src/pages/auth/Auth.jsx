import React, { useEffect, useState } from 'react'
import { useFirebase } from '../../firebase/Firebaseinit'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { SignUpSchema,LogInSchema } from '../../schemas/Schema'
import { toast } from "react-hot-toast";

const SignUpinitialValues={
  email:'',
  password:'',
  name:''
}
const LogIninitialValues={
  password:'',
  email:''
}
const Signup = () => {
  const [authType,setAuthType]=useState("SignUp")
  const [initalvalue,setInitialValue]=useState(SignUpinitialValues)
  const [schema,setSchema]=useState(SignUpSchema)
  useEffect(()=>{
    setInitialValue(authType==="SignUp"?SignUpinitialValues:LogIninitialValues)
    setSchema(authType==="SignUp"?SignUpSchema:LogInSchema)
  },[authType])


  const {values,errors,handleBlur,touched,handleChange,handleSubmit}= useFormik({
      initialValues:initalvalue,
      validationSchema:schema,
      onSubmit:(value) => {
        console.log(value)
        let email=value.email
        let password=value.password
        let name=value.name
        authType==="SignUp"?signup(email,password,name):LogIn(email,password)

      }
    })
    const navigate=useNavigate()
    const useFunction=useFirebase()



    const signup=(email,password,name)=>{

     return useFunction.signUpwithEmailandPassword(email,password,name).then(()=>{
       toast.success(`${authType} successfully`,{
        duration:9000
       })
       setTimeout(()=>{
        navigate('/')
        window.location.reload()
      },1000)
      }).catch((error)=>{
        toast.error("Something went wrong")
      })

    }

    const LogIn=(email,password)=>{

      return useFunction.LoginwithEmailAndPassword(email,password).then(()=>{
        toast.success(`${authType} successfully`,{
          duration:9000
         })
        setTimeout(()=>{
          navigate('/')
          window.location.reload()
        },1000)
      }).catch((error)=>{
          toast.error(error.message)
        })

    }


  return (
    <form onSubmit={handleSubmit}>
      <div className='h-[26rem] w-[21rem] border-[#c4bfbf] border-2 rounded-xl bg-transparent pt-6 mx-auto my-9'>
        <div className='flex flex-col w-fit mx-auto items-center justify-center gap-3'>
             {
              authType==="SignUp" && <div className='flex flex-col items-start'>
             <input type='text' className='h-[3rem] w-[16rem] bg-[#4b4e58] border-[1px] text-white pl-3 border-[#ffffff] rounded-xl outline-none' id='name' name='name' value={values.name} onChange={handleChange} onBlur={handleBlur}  placeholder='Enter Name' />
              {
                errors.name && touched.name?
                <p className='text-red-200'>{errors.name}</p>:''
              }
             </div>
             }
              <br/>
              <div className='flex flex-col items-start'>
              <input type='email'  className='h-[3rem] w-[16rem] bg-[#4b4e58] border-[1px] text-white pl-3 border-[#ffffff] rounded-xl outline-none' id='email' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Mail' />
              {
                errors.email && touched.email?
                <p className='text-red-200'>{errors.email}</p>:''
              }
              </div>
              <br/>
              <div className='flex flex-col items-start'>
              <input type='password'  className='h-[3rem] w-[16rem] bg-[#4b4e58] border-[1px] text-white pl-3 border-[#ffffff] rounded-xl outline-none' id='password' name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Password' />
              {
                errors.password && touched.password?
                <p className='text-red-200'>{errors.password }</p>:''
              }
              </div>
              <br/>
              <input type='submit' className='hover:bg-[#252323] transition-colors duration-150 cursor-pointer w-fit text-white text-[19px] bg-[#363333] py-1 px-6 rounded-xl' value={authType==='SignUp'?"SignUp":"LogIn"}/>
              {
                authType==="SignUp"?<p className='text-red-200 text-[19px] cursor-pointer underline' onClick={()=>setAuthType("LogIn")}>Already have an account</p>:<p className='text-red-200 text-[19px] cursor-pointer underline' onClick={()=>setAuthType("SignUp")}>Don't have an account</p>
              }
        </div>
      </div>
   </form>
  )
}

export default Signup
