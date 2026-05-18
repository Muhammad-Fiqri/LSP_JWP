import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Home() {

    const [posts,setPosts] = useState([])

    const getAllPost = async () => {
        try {
            const res = await axios.get('http://localhost:3000/allPost');
            if(res.status == 200) {
                alert("All Post Retrieved!")
                setPosts(res.data);
            }
        } catch(err) {
            alert(err);
        }
    }

    const has_run = useRef(false);
    useEffect(() => {
        if (has_run.current) return
        getAllPost();
        has_run.current = true
    },[posts])

    useEffect(() => {
        console.log(posts);
    },[posts])

    return(
        <div id="Post" className="bg-[#D9D9D9] rounded-[10px] w-[95%] h-[97%] mx-[2.5%] my-[1.5%] shadow-2xl">
        {
            posts.length == 0 ?
            <p>Tidak Ada Post</p>
            :
            posts.map((post) => {
                return(
                    <div key={post.id_post} id="Post" className="bg-[#D9D9D9] rounded-[10px] w-[95%] h-[97%] mx-[2.5%] my-[1.5%] shadow-2xl">
                        <h1 className="text-3xl text-center py-[30px]">{post.title}</h1>
                        <img className="px-[30px] w-[100%]" src={`http://localhost:3000/uploads/${post.image}`}></img>
                        <div id="post-metadata" className="grid grid-rows-3 grid-cols-2 px-[30px] py-[10px] w-[27%]">
                            <p>ID: </p><p> {post.id_post}</p>
                            <p>Posted:</p><p>{post.created_at}</p>
                            <p>By:</p><p>{post.author}</p>
                        </div>
                        <div id="post-content" className="px-[30px] pb-[30px]">
                            {post.description}
                        </div>
                    </div>
                )
            }) 
        }
        </div>
    );
}