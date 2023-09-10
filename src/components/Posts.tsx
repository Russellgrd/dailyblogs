import { useEffect } from 'react'
import { useState } from 'react'

const Posts = () => {

    let [blogs, setBlogs] = useState<any>(null);

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

    const handleLogout = () => {
        console.log('logging out');
        fetch('http://localhost:3000/logout', {
            method: "POST",
            credentials: "include",
        })
            .then(() => {
                console.log('logged out')
            })
    }

    return (
        <div className='posts'>
            <h1>Posts</h1>
            {blogs && blogs.map((blog: { _id: string, blogTitle: string, blogBody: string, blogImageName: string }) =>
                <div className='post' key={blog._id}>
                    <h1 className='postHeading'>{blog.blogTitle}</h1>
                    <p className='postBody'> {blog.blogBody} </p>
                    {blog.blogImageName && <img className='postImage' src={"http://localhost:3000/images/" + blog.blogImageName} />}
                </div>
            )}
        </div>
    )
}

export default Posts;
