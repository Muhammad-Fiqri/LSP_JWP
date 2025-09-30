import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";

export default function PostDashboard() {
    const [mode,setMode] = useState("create");
    const [id_post, setId_post] = useState("");
    const [title_post, setTitle_post] = useState("");
    const [media_post, setMedia_post] = useState();
    const [content_post, setContent_post] = useState("");

    const title_post_input = useRef(null);
    const content_post_input = useRef(null);
    const media_post_read = useRef(null);

    useEffect(() => {
        console.log(mode);
        console.log(id_post);
        console.log(title_post);
        console.log(media_post);
        console.log(content_post);
    })

    async function handleForm(e) {
        e.preventDefault()

        const formData = new FormData();
        switch(mode) {
            case "create":
                if (media_post == undefined) {
                    alert("Media Post must not be empty!")
                    return
                }
                formData.append('mode',mode);
                formData.append('id_post',id_post);
                formData.append('title_post',title_post);
                formData.append('media',media_post[0]);
                formData.append('content_post',content_post);
        
                try {
                    const res = await axios.post('http://localhost:3000/post', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
        
                    if(res.status == 200) {
                        alert(res.data.message)
                    }
                } catch(err) {
                    alert(err)
                }

                break;
            case "read":
                try {
                    const res = await axios.get('http://localhost:3000/post', {
                        params: {
                            mode: mode,
                            id_post: id_post
                        }
                    });
        
                    if(res.status == 200) {
                        alert("Post found!")
                        showPostData(res.data[0])
                    }
                } catch(err) {
                    alert(err)
                }

                break;
            case "update":
                if (media_post == undefined) {
                    alert("Media Post must not be empty!")
                    return
                }
                formData.append('mode',mode);
                formData.append('id_post',id_post);
                formData.append('title_post',title_post);
                formData.append('media',media_post[0]);
                formData.append('content_post',content_post);
        
                try {
                    const res = await axios.put('http://localhost:3000/post', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
        
                    if(res.status == 200) {
                        alert(res.data.message)
                    }
                } catch(err) {
                    alert(err)
                }

                break;
            case "delete":
                formData.append('mode',mode);
                formData.append('id_post',id_post);
                try {
                    const res = await axios.delete('http://localhost:3000/post', {
                        params: {
                            mode: mode,
                            id_post: id_post
                        }
                    });
        
                    if(res.status == 200) {
                        if(res.data.affectedRows > 0) {
                            alert("Post Deleted")
                        } else {
                            alert("Post Not Found")
                        }
                    }
                } catch(err) {
                    alert(err)
                }

                break;
        }

        async function showPostData(data) {
            let title_post = data.title;
            let media_post = data.image;
            let content_post = data.description;
            title_post_input.current.value = title_post
            content_post_input.current.value = content_post

            try {
                const res = await axios.get('http://localhost:3000/image', {
                    params: {
                        imageURL: media_post
                    },
                    responseType: 'blob'
                });
    
                if(res.status == 200) {
                    const url = URL.createObjectURL(res.data);
                    media_post_read.current.src = url;
                    media_post_read.current.hidden = false;
                }
            } catch(err) {
                alert(err)
            }
        }
    }

    return(
        <div id="post-dashboard" className="w-[100%] h-[100vh] p-[25px] overflow-y-scroll">
            <h1 className="text-5xl text-center font-bold pb-[30px]">Manajemen Post</h1>

            <div className="pb-[20px]">
                <label htmlFor="mode">Mode:</label>
                <select onChange={(e) => {setMode(e.target.value)}} name="mode" id="mode" className="w-[100%] bg-[#9A9A9A] rounded-[10px] h-[7vh] pl-[10px]">
                    <option value="create">Create</option>
                    <option value="read">Read</option>
                    <option value="update">Update</option>
                    <option value="delete">Delete</option>
                </select>
            </div>

            <form onSubmit={handleForm} id="form-package" className="bg-[#D9D9D9] rounded-[10px] p-[20px]">
                <div>
                    <label htmlFor="ID-package">ID Post:</label>
                    <input onChange={(e) => setId_post(e.target.value)} disabled={mode == "create" ? true : false} placeholder={mode == "create" ? "ID Post tidak di perlukan saat mode create" : "Gunakan ID Post untuk memilih post yang ingin di edit"} type="text" name="ID-package" id="ID-package" className="w-full bg-[#9A9A9A] rounded-[10px] h-[7vh] pl-[10px]" />
                </div>

                <div>
                    <label htmlFor="name-package">Judul Post</label>
                    <input onChange={(e) => setTitle_post(e.target.value)} ref={title_post_input} required={mode == "read" || "delete" ? false : true} type="text" name="name-package" id="name-package" className="w-full p-2 bg-[#9A9A9A] rounded-[10px] h-[7vh] pl-[10px]" />
                </div>

                <img hidden="true" ref={media_post_read}  className="w-[20%] my-[20px] mx-auto aspect-square rounded-[10px]"/>

                <div>
                    <label htmlFor="media-post">Media Post</label>
                    <input onChange={(e) => setMedia_post(e.target.files)} type="file" name="media-post" id="media-post" accept="image/*" className="hidden" />
                    <label htmlFor="media-post" className="block w-full p-2 text-center cursor-pointer bg-[#9A9A9A] rounded-[10px] h-[7vh] pl-[10px]">
                        Upload Gambar
                    </label>
                </div>

                <div>
                    <label htmlFor="description-package">Isi Post</label>
                    <textarea 
                        ref={content_post_input}
                        onChange={(e) => setContent_post(e.target.value)}
                        required={mode == "read" || "delete" ? false : true}
                        name="description-package" 
                        id="description-package" 
                        rows="5" 
                        className="w-full p-2 border bg-[#9A9A9A] rounded-[10px] pl-[10px]"
                    ></textarea>
                </div>

                <button type="submit" className="w-full p-2 text-black bg-[#FFFFFF] rounded-[10px] h-[7vh] mt-[10px]">
                    Submit
                </button>
            </form>
        </div>
    );
}