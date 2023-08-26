import { userSchema } from '../Validation/UserValidation';
import { useFormik } from 'formik';
import { useState } from 'react';

const Register = () => {

    const [registerMessage, setRegisterMessage] = useState("");

    const formik = useFormik({
        initialValues: {
            userName: "",
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: userSchema,
        onSubmit: async (values) => {
            try {
                const resp = await fetch('http://localhost:3000/register', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userName: values.userName,
                        email: values.email,
                        password: values.password
                    })
                })
                const data = await resp.json();
                setRegisterMessage(data.message);
            } catch (err) {
                console.log(err);
            }

        }
    });


    return (

        <div className="register">
            <form className="registerForm" onSubmit={formik.handleSubmit}>
                <input
                    placeholder="username"
                    id="userName"
                    name="userName"
                    type="userName"
                    value={formik.values.userName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                <input
                    placeholder="email"
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}
                <input
                    placeholder="password"
                    id="password"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : null}
                <input
                    placeholder="confirm password"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p>{formik.errors.confirmPassword}</p> : null}
                {/* {!formik.isValid && JSON.stringify(formik.errors)}; */}
                <button type="submit">Submit</button>
            </form>
            {registerMessage && <p>{registerMessage}</p>}
        </div>

    )
}

export default Register;