import { useEffect, useState, useContext } from 'react'
import moment from 'moment';
import { UserContext } from '../context/UserContext';
import { useIsAuth } from '../helpers/useIsAuth';

const Posts = () => {
    const userContext = useContext(UserContext);
    let [blogs, setBlogs] = useState<any>(null);

    useEffect(() => {
        const getPosts = async () => {
            let resp = await fetch('http://localhost:3000/blogs', {
                credentials: "include",
            });
            let data = await resp.json();
            setBlogs(data);
        }

        // const isAuthCheck = async () => {
        //     const resp = await fetch('http://localhost:3000/auth', {
        //         credentials: "include",
        //     });
        //     const data = await resp.json();
        //     userContext.setUser(data);
        // }

        getPosts()
            .catch((err) => {
                console.log(err);
            })
        useIsAuth(userContext);
    }, []);



    return (
        <div className='posts'>
            <h1>Posts</h1>
            {blogs && blogs.map((blog: { _id: string, blogTitle: string, blogBody: string, blogImageName: string, createdAt: string, email: string }) =>
                <div className='post' key={blog._id}>
                    <h1 className='postHeading'>{blog.blogTitle}</h1>
                    <p>Written {moment(blog.createdAt).format('DD-MM-YYYY HH:mm')} by {blog.email.split("@")[0]}</p>
                    <p className='postBody'> {blog.blogBody} </p>
                    {blog.blogImageName && <img className='postImage' src={"http://localhost:3000/images/" + blog.blogImageName} />}
                </div>
            )}
        </div>
    )
}

export default Posts;
