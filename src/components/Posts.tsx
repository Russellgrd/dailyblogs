import { useEffect, useState, useContext, ReactHTMLElement, Fragment } from 'react'
import moment from 'moment';
import { UserContext } from '../context/UserContext';
import { useIsAuth } from '../helpers/useIsAuth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Bars } from 'react-loading-icons'
import Editpost from './Editpost';
import navBurger from '../assets/nav-burgerIcon.svg';


const Posts = () => {
    const userContext = useContext(UserContext);
    let [blogs, setBlogs] = useState<any>(null);
    let [blogDeleted, setBlogDeleted] = useState<any>(null);
    let [deletingOrUpdatingBlog, setDeletingOrUpdatingBlog] = useState<any>(false);
    let [editing, setEditing] = useState<any>(false);
    let [postsButtons, setPostsButtons] = useState(false);

    const navigate = useNavigate();

    let userNotification = "postUserNotificationBox";
    blogDeleted ? userNotification = "postUserNotificationBox showMessage" : "postUserNotificationBox";

    let postsButtonWrapper: string = ""
    postsButtons == true ? postsButtonWrapper = "showPostsButtons" : postsButtonWrapper = "postsButtonsWrapper"

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

    const handlePostOptions = (e: React.MouseEvent) => {
        console.log(e.target);
        setPostsButtons(state => !state);
    }

    return (
        <div className='posts'>
            {blogs && blogs.map((blog: { _id: string, blogTitle: string, blogBody: string, blogImageName: string, createdAt: string, email: string }) =>
                <div className='post' key={blog._id}>
                    {userContext.user.email === blog.email ?
                        <div className='postsMenu'>
                            <img onClick={(e) => { handlePostOptions(e) }} className="postsBurger" src={navBurger} alt="Nav Burger Icon" />
                            <div className="postsButtonBox">
                                <div className={postsButtonWrapper}>
                                    <button className='postsButton' onClick={(e) => { handleDelete(blog) }}>
                                        delete
                                    </button>
                                    <button className='postsButton' onClick={(e) => { handleEdit(blog) }}>
                                        edit
                                    </button>
                                </div>
                            </div>
                        </div>
                        : null}
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
