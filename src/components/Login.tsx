import { useState } from "react";
import { useFormik } from 'formik'
import { loginSchema } from '../Validation/UserValidation';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            console.log(JSON.stringify(values));

            try {
                const resp = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": 'application/json'
                    },
                    body: JSON.stringify({ email: values.email, password: values.password })
                })
                let data = await resp.json();
                if (data.message = "Successfully logged in. Redirecting.") {
                    navigate('/posts');
                } else {
                    //write logic for any reason as to why tokens are not received.
                }

            } catch (err) {
                console.log(err);
            }

        },
    })


    return (
        <div className="login">
            <form className="loginForm" onSubmit={formik.handleSubmit}>
                <input
                    placeholder="email"
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                <input
                    placeholder="password"
                    id="password"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login;