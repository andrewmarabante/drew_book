import { useState } from "react"
import plus from '../assets/plus.svg'
import x from '../assets/x.svg'
import { v4 } from "uuid"

export default function CreatePost({submitPost}){
    const [images, setImages] = useState([])
    const [addImage, setAddImage] = useState(false)
    const [reset, setReset] = useState(null)
    
    function newImage(e){
        console.log(e.target.files[0])
        if(!e.target.files[0]){
            return
        }
        const newImage = e.target.files[0];
        let imageArray = [...images];
        imageArray.push(newImage);
        e.target.value = null;
        setImages(imageArray);
    }

    function deleteImage(image){
        let index = images.indexOf(image);
        let tempImages = images
        tempImages.splice(index, 1)

        setImages(tempImages)
        setReset(v4())
    }

    return(
        <div className="h-full p-10 bg-green-50 min-h-screen rounded-xl bg-gradient-to-r from-green-100 to-blue-100">
                    <form className="w-full h-full flex flex-col items-center" onSubmit={(e)=>submitPost(e, images)}>
                        <div className="text-left w-3/4">Title:</div>
                        <input type="text" className="border block w-3/4 m-1 pl-2 rounded-lg p-1" name="title"/>
                        <div className="w-3/4 text-left">Description:</div>
                        <textarea className="border h-2/6 w-3/4 m-1 mb-5 rounded-lg p-2" name="body"></textarea>         
                        <div className="w-full flex flex-col justify-center items-center">
                            <div className="w-3/4">Images: </div>
                            <div className="flex justify-start items-center bg-white p-5 rounded-lg gap-5 w-3/4 mb-5 mt-2 overflow-scroll">
                                {images.map((image)=>{
                                    return(
                                            <div key={v4()} className="h-fit w-fit flex-shrink-0 relative">
                                                <img src={URL.createObjectURL(image)} alt="uploaded image" className="h-60 rounded-lg"/>
                                                <img src={x} alt="X" className="h-5 absolute -top-2 -right-2 border rounded-full bg-white" onClick={()=>deleteImage(image)}/>
                                            </div>
                                    )
                                })}
                                <div className="min-h-60 min-w-40 bg-blue-50 rounded-xl flex justify-end items-start p-2"><img src={plus} alt='add' className="h-12 hover:bg-blue-100 rounded-md" onClick={()=>{document.getElementById('imageInput').click()}}></img></div>
                            </div>
                        </div>  
                        <input id="imageInput" type="file" className="hidden" onChange={newImage}></input>
                        <div className="bg-white w-3/4 flex justify-center flex-col items-center rounded-xl border">
                            <div className="flex justify-around w-full p-4">
                                <button type="submit" className="border w-1/2 p-2 pl-8 pr-8 bg-white rounded-lg hover:bg-gradient-to-l from-green-100 to-blue-100">Create Post</button>
                            </div>
                        </div>
                    </form>
            </div>
    )
}