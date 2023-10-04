import { useFormik } from 'formik';
import { blogSchema } from '../Validation/BlogValidation';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom';

const SubmitBlog = () => {

    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const [image, setImage] = useState<File | null>(null);
    const formik = useFormik({
        initialValues: {
            blogTitle: "",
            blogBody: "",
        },

        validationSchema: blogSchema,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("blogTitle", values.blogTitle);
            formData.append("blogBody", values.blogBody);
            if (image) {
                formData.append("blogImage", image, image.name);
                console.log('formData is', Array.from(formData));
            }
            let resp = await fetch('http://localhost:3000/newblogentry', {
                method: 'POST',
                credentials: "include",
                body: formData
            });
            let data = await resp.json();
            if (data.message.includes("blog successfully saved")) {
                navigate('/posts');
            }
        }
    })

    console.log('Submit blog component', userContext);

    return (

        <div className="submitBlog">
            <form className='submitBlogForm' onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                <input
                    className='blogTitle'
                    placeholder="blogTitle"
                    id="blogTitle"
                    name="blogTitle"
                    type="text"
                    value={formik.values.blogTitle}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                <textarea
                    className='blogBody'
                    placeholder="blogBody"
                    id="blogBody"
                    name="blogBody"
                    value={formik.values.blogBody}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                <label className='blogFileButton' htmlFor='blogImage'>
                    add image
                </label>
                <input
                    className='blogFile'
                    typeof='file'
                    placeholder="blogImage"
                    id="blogImage"
                    name="blogImage"
                    type="file"

                    onChange={(e) => {
                        if (e.target.files) {
                            setImage(e.target.files[0]);
                        }
                    }}
                    onBlur={formik.handleBlur}
                />
                <button className='blogButton' type='submit'>submit</button>
            </form>
        </div>
    )
}

export default SubmitBlog;