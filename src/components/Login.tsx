import { useState } from "react";
import { useFormik } from 'formik'
import { loginSchema } from '../Validation/UserValidation';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Bars } from 'react-loading-icons'

const Login = () => {

    const [authenticating, setAuthenticating] = useState<any>(false);
    const [authenticationError, setAuthenticationError] = useState<any>("");

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
                setAuthenticating(true);
                setAuthenticationError("");
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
                if (data.message == "Successfully logged in. Redirecting.") {
                    setAuthenticating(false);
                    navigate('/posts');
                } else {
                    console.log(data.message);
                    setAuthenticating(false);
                    setAuthenticationError(data.message);
                    //write logic for any reason as to why tokens are not received.
                }

            } catch (err: unknown) {
                setAuthenticating(false);
                setAuthenticationError("Network or app error, please try again later");
            }

        },
    })

    return (
        <div className="login">
            {authenticating ? <Bars /> : null}
            <p className="loginUserNotification">{authenticationError ? authenticationError : null}</p>
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
            <p>don't have an account?</p>
            <img />
            <Link className="loginRegisterButton" to="/register">register</Link>
        </div>
    )
}

export default Login;