import * as yup from 'yup';

export const userSchema = yup.object().shape({
    userName: yup.string().min(3).required(),
    email: yup.string().email("Please enter a valid email").required(),
    password: yup.string()
        .matches(/\d+/, "Atleast 1 number required")
        .matches(/[a-z]+/, "Atleast 1 lowercase letter required")
        .matches(/[A-Z]+/, "1 Uppercase letter required")
        .matches(/[!@#$%^&*()-+]+/, "Atleast 1 special character required")
        .min(7).required(),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
});