import * as Yup from "yup";

export const SignUpSchema=Yup.object({
    name:Yup.string().min(2).max(25).required("Required"),
    email:Yup.string().email().required("Required"),
    password:Yup.string().min(6).required("Required"),
})

export const LogInSchema = Yup.object({
    email:Yup.string().email().required("Required"),
    password:Yup.string().min(6).required("Required"),
})
