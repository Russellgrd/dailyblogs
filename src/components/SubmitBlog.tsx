import { useFormik } from 'formik';
import { blogSchema } from '../Validation/BlogValidation';
import { useState } from 'react';

const SubmitBlog = () => {

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
            console.log(data);
        }
    })

    return (
        <div className="submitBlog">
            <form className='submitBlogForm' onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                <input
                    placeholder="blogTitle"
                    id="blogTitle"
                    name="blogTitle"
                    type="text"
                    value={formik.values.blogTitle}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                <textarea
                    placeholder="blogBody"
                    id="blogBody"
                    name="blogBody"
                    value={formik.values.blogBody}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                <input
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
                    // onChange={(e) => {
                    //     formik.values.files = e.currentTarget?.files;
                    // }}
                    onBlur={formik.handleBlur}
                />
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}

export default SubmitBlog;