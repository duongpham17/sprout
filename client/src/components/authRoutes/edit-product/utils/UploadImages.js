import './UploadImages.scss';
import React, { Fragment, useState } from 'react';
import {storage} from '../../../../firebase';
import {FaTrash} from 'react-icons/fa';
import Resizer from 'react-image-file-resizer';

const UploadImages = props => {

    //upload images
  const [imageFile, setImageFile] = useState("");
  const [firstImage, setFirstImage] = useState(false);
  const [imageName, setImageName] = useState("")
  const [firstClick, setFirstClick] = useState(false);
  const [firstDel, setFirstDel] = useState(false);
  const [progress, setProgress] = useState(0);
  const random = Math.random().toString(36).substring(7);

  const resizeFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 480, 480 , 'JPEG', 50, 0,
    uri => {
      resolve(uri);
    },
    'base64'
    );
  });

  const handleImageFile = async (e) => {
    setImageName(e.target.files[0].name)
    const resizeImage = await resizeFile(e.target.files[0])
    const blob = await fetch(resizeImage).then(r => r.blob())
    setImageFile(blob)
    setFirstImage(true)
  };

  const handleUpload = async (e) => {
    e.preventDefault()
    setFirstClick(true)

    const uploadTask = storage.ref(`/images`).put(imageFile)
    uploadTask.on('state_changed', 
    (snapShot) => {
      const progress = Math.round(
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100
      )
      setProgress(progress)
    })

    try{
      await storage.ref(`/images/${random+imageName+imageFile}`).put(imageFile)
      const imageUrl = await storage.ref('images').child(random+imageName+imageFile).getDownloadURL()
      await props.uploadImage(imageUrl, props.match)
      setFirstClick(false)
      setFirstImage(false)
      setProgress(0)
    }catch(err){
        setFirstClick(false)
        setFirstImage(false)
        setProgress(0)
        props.setAlert("Only .jpg .png .jpeg is accepted.", 'primary')
    }
  }

  const deleteImg = async (url, image_id) => {
    setFirstDel(true) 
    await props.deleteImage(image_id, props.match)
    try{
      await storage.refFromURL(url).delete()
      props.setAlert("Deleted successfully", 'success') 
      setFirstDel(false) 
    } catch(err){
      props.setAlert("Image was not found or already deleted!", 'primary')
      setFirstDel(false) 
    }
  }


    return (
      <Fragment>
        <div className="gallery-container">
          {props.edit.image.length === 7 ? 
          <div className="max-images">Max 7 Images</div> 
          : 
          <div className="upload-multiple-gallery">
            <form onSubmit={handleUpload}>
              <li><input type="file" id="file2" className='hidden' onChange={handleImageFile} /><label className={!imageFile ? "" : "uploaded"} htmlFor="file2">Choose Images For Gallery</label></li>
              <li className="image-file-name">{!imageFile ? "" : imageName}</li>

              {firstClick === true ? 
              <div className="submit_upload_waiting">{props.edit.image.length === 7 ? "" : "Uploading images..." }</div> 
              : 
              <li><button className={firstImage ? "" : "hidden"}>Submit</button></li>
              }
              <progress className="progress_bar" value={progress} max="100"/>

            </form>
          </div>
          }
          <div className="bottom-image-container">
            {props.edit.image.map((el, index) => 
              <div className="delete_images" key={index}>
                {index === 0 ? <h2>Display Image</h2> : "" }
                  <li><img src={el.url} alt='' /></li>
                  {firstDel ? 
                  <button>deleting...</button>
                  : 
                  <button onClick={() => deleteImg(el.url, el._id)}><FaTrash size="1.5rem"/></button>
                  }
              </div>
            )}
          </div>
        </div>
    </Fragment>
  )
}

/*
<UploadImages  edit={edit} setAlert={setAlert} match={match.params.id}/>

* props.edit === the requested Data

* props.setAlert === alert for when the user deletes or uploads an image succeefully or error.

* props.firstImage === If true. Only the firstImage html and css will be displayed for edit page.

* props.galleryImages === if true. Only the GalleryImage html and css will be displayed.

* props.first === if true, for Edit. if there is no image then user can upload an image. if false then user can delete image

* props.uploadImage === the action. E.g uploadFirstImage saves the image url, and UploadImage uploads the images url into an array.

* props.match === end points need an id, this will grab the product id from the url.

*/

export default UploadImages
