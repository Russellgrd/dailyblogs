import { useEffect } from 'react'
import { useState } from 'react'

const Posts = () => {

    let [blogs, setBlogs] = useState<null | string[]>(null);

    useEffect(() => {

        const getPosts = async () => {
            console.log('running use effect');
            let resp = await fetch('http://localhost:3000/blogs', {
                credentials: "include",
            });
            let data = await resp.json();
            console.log('setting posts');
            setBlogs(data);
            console.log('data is', data);
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
        <div>
            <h1>Posts</h1>
            {blogs && <p> {JSON.stringify(blogs)} </p>}
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Posts;