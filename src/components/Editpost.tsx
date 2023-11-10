import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { blogSchema } from '../Validation/BlogValidation';
import { Bars } from 'react-loading-icons'


const Editpost = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const location = useLocation();
    const [submittingBlog, setSubmittingBlog] = useState(false);

    let editBlogImage = imageURL ? "noImageDisplay" : "editBlogImage";

    const formik = useFormik({
        initialValues: {
            _id: location.state._id,
            editBlogTitle: location.state.blogTitle,
            editBlogBody: location.state.blogBody,
            editBlogImage: location.state.blogImageName
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            type BlogType = {
                _id?: string,
                blogTitle: string,
                blogBody: string,
                blogImageName: null | string | undefined
            }

            const changeStatus = hasBlogChanged({ blogTitle: location.state.blogTitle, blogBody: location.state.blogBody, blogImageName: location.state.blogImageName },
                { blogTitle: values.editBlogTitle, blogBody: values.editBlogBody, blogImageName: image ? image.name : location.state.blogImageName }
            );
            console.log("changeStatus is", changeStatus);
            if (changeStatus) {
                console.log("changing blog");
                setSubmittingBlog(true);
                formData.append("_id", values._id);
                formData.append("blogTitle", values.editBlogTitle);
                formData.append("blogBody", values.editBlogBody);
                formData.append("blogImage", "");
                if (image) {
                    formData.set("blogImage", image, image.name);
                }

                fetch("http://localhost:3000/editblogentry", {
                    method: "POST",
                    credentials: "include",
                    body: formData
                })
                    .then((resp) => {
                        return resp.json();
                    })
                    .then((data) => {
                        console.log(data);
                        setSubmittingBlog(false);
                        navigate("/posts");
                    })
                    .catch((err) => {
                        console.log('error', err);
                        setSubmittingBlog(false);
                    })
            }

            function hasBlogChanged(originalBlog: BlogType, newBlog: BlogType) {
                const titleMatch = originalBlog.blogTitle == newBlog.blogTitle ? true : false;
                const bodyMatch = originalBlog.blogBody == newBlog.blogBody ? true : false;
                const imageMatch = originalBlog.blogImageName == newBlog.blogImageName ? true : false;
                const hasChanged = !titleMatch || !bodyMatch || !imageMatch ? true : false;
                return hasChanged;
            }



            // let resp = await fetch('http://localhost:3000/editblogentry', {
            //     method: 'POST',
            //     credentials: "include",
            //     body: formData
            // });
            // let data = await resp.json();
            // if (data.message.includes("blog successfully saved")) {
            //     //navigate('/posts');
            //     console.log(data.message);
            // }
        },

    })


    return (
        <div className='editPost'>
            {submittingBlog ? <Bars /> : null}
            <form className='editPostForm' onSubmit={formik.handleSubmit}>
                <input
                    className='editBlogTitle'
                    id="editBlogTitle"
                    name="editBlogTitle"
                    type="text"
                    value={formik.values.editBlogTitle}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                <textarea
                    className='editBlogBody'
                    id="editBlogBody"
                    name="editBlogBody"
                    value={formik.values.editBlogBody}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                <input
                    className='editBlogFile'
                    typeof='editBlogFile'
                    placeholder=""
                    id="editBlogFile"
                    name="editBlogFile"
                    type="file"

                    onChange={(e) => {
                        if (e.target.files) {
                            setImage(e.target.files[0]);
                            const urlImage = URL.createObjectURL(e.target.files[0]);
                            setImageURL(urlImage);

                        }
                    }}
                    onBlur={formik.handleBlur}
                />
                <input type="submit" value="submit" />
            </form>

            {location.state.blogImageName ? <img className={editBlogImage} src={"http://localhost:3000/images/" + location.state.blogImageName} /> : ""}
            {imageURL ? <img className='editBlogImage' src={imageURL} /> : ""}
        </div>
    )
}

export default Editpost;