import { useEffect, useState, useContext, ReactHTMLElement } from 'react'
import moment from 'moment';
import { UserContext } from '../context/UserContext';
import { useIsAuth } from '../helpers/useIsAuth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Bars } from 'react-loading-icons'
import Editpost from './Editpost';

const Posts = () => {
    const userContext = useContext(UserContext);
    let [blogs, setBlogs] = useState<any>(null);
    let [blogDeleted, setBlogDeleted] = useState<any>(null);
    let [deletingOrUpdatingBlog, setDeletingOrUpdatingBlog] = useState<any>(false);
    let [editing, setEditing] = useState<any>(false);

    const navigate = useNavigate();

    let userNotification = "postUserNotificationBox";
    blogDeleted ? userNotification = "postUserNotificationBox showMessage" : "postUserNotificationBox";

    useEffect(() => {
        const getPosts = async () => {
            let resp = await fetch('http://localhost:3000/blogs', {
                credentials: "include",
            });
            let data = await resp.json();
            setBlogs(data);
        }
        getPosts()
            .catch((err) => {
                console.log(err);
            })
        useIsAuth(userContext);
    }, []);


    type BlogDetails = {
        _id: string,
        blogTitle: string,
        blogBody: string,
        blogImageName: string,
        createdAt: string,
        email: string
    }

    const handleDelete = async (blog: BlogDetails) => {
        const confirmed = confirm("Are you sure you wish to delete this blog?");
        if (confirmed) {
            setDeletingOrUpdatingBlog(true);
            const response = await fetch('http://localhost:3000/delete', {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(blog)
            });
            const data: { message: "blog has been deleted" | "There was an issue with your request" } = await response.json()
            if (data.message.includes("blog has been deleted")) {
                setTimeout(() => {
                    setDeletingOrUpdatingBlog(false);
                    window.location.reload();
                }, 2000);
            }
        } else {
            return null;
        }
    }


    const handleEdit = async (blog: BlogDetails) => {
        const blogData: { _id: string, blogTitle: string, blogBody: string, blogImageName: string } = {
            _id: blog._id,
            blogTitle: blog.blogTitle,
            blogBody: blog.blogBody,
            blogImageName: blog.blogImageName
        }
        navigate('/editpost', {
            state: blogData
        })
    }

    return (
        <div className='posts'>

            {blogs && blogs.map((blog: { _id: string, blogTitle: string, blogBody: string, blogImageName: string, createdAt: string, email: string }) =>
                <div className='post' key={blog._id}>
                    {userContext.user.email === blog.email ? <div className='postsButtonBox'> <button className='postsEditDeleteButton' onClick={(e) => { handleDelete(blog) }}>delete</button> <button className='postsEditDeleteButton' onClick={(e) => { handleEdit(blog) }}>edit</button>  </div> : null}
                    <h1 className='postHeading'>{blog.blogTitle}</h1>
                    <p>Written {moment(blog.createdAt).format('DD-MM-YYYY HH:mm')} by {blog.email.split("@")[0]}</p>
                    {deletingOrUpdatingBlog ? <Bars /> : null}
                    <p className='postBody'> {blog.blogBody} </p>
                    {blog.blogImageName && <img className='postImage' src={"http://localhost:3000/images/" + blog.blogImageName} />}
                </div>
            )}
        </div>
    )
}

export default Posts;
