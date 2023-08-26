import { useFormik } from 'formik';
import { blogSchema } from '../Validation/BlogValidation';

const SubmitBlog = () => {

    const formik = useFormik({
        initialValues: {
            blogTitle: "",
            blogBody: "",
            files: null
        },
        validationSchema: blogSchema,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("blogTitle", values.blogTitle);
            formData.append("blogBody", values.blogBody);
            // formData.append("files", values.files);

            console.log('formData is', Array.from(formData));
            let resp = await fetch('http://localhost:3000/newblogentry', {
                method: 'POST',
                credentials: "include",
                body: formData
            });
            let data = await resp.json();
            console.log(data);
        }
    })
    console.log(formik.values);


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
                    onChange={formik.handleChange}
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