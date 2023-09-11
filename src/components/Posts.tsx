import { useEffect } from 'react'
import { useState } from 'react'
import moment from 'moment';

const Posts = () => {

    let [blogs, setBlogs] = useState<any>(null);
    console.log('blogs are', blogs);
    useEffect(() => {

        const getPosts = async () => {
            console.log('running use effect');
            let resp = await fetch('http://localhost:3000/blogs', {
                credentials: "include",
            });
            //@ts-ignore
            let data = await resp.json();
            setBlogs(data);
            console.log(data);
        }

        getPosts();
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
