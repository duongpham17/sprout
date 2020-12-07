import './UploadImages.scss';
import React, { Fragment, useState } from 'react';
import {storage} from '../../../../firebase';
import {FaTrash} from 'react-icons/fa';
import Resizer from 'react-image-file-resizer';

const UploadImages = props => {

     //upload images
  const [firstClick, setFirstClick] = useState(false)
  const random = Math.random().toString(36).substring(7);
  
  const [imageFile, setImageFile] = useState('');
  const [progress, setProgress] = useState(0);

  const handleImageFile = (e) => {
    const image = e.target.files[0]
    setImageFile(image)
    setFirstClick(false)
  }

  const handleUpload = (e) => {
  setFirstClick(true)
  e.preventDefault()
    const uploadTask = storage.ref(`/images/${random+imageFile.name}`).put(imageFile)
    uploadTask.on('state_changed', 
    (snapShot) => {
      const progress = Math.round(
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100
      )
      setProgress(progress)
    }, (err) => {
      setFirstClick(false)
      return props.setAlert("Only .jpg .png .jpeg is accepted.", 'primary')
    }, () => {
      storage.ref('images').child(random+imageFile.name).getDownloadURL()
        .then(fireBaseUrl => {
          props.uploadImage(fireBaseUrl, props.match)
        })
    })
  }

  const deleteImg = (e, image_id) => {
      props.deleteImage(image_id, props.match)
  const desertRef = storage.refFromURL(e)
  desertRef.delete().then(() => {
      props.setAlert("Deleted successfully", 'success') 
      setFirstClick(false) 
    }).catch(() => {
      props.setAlert("Image was not found or already deleted!", 'primary')
      setFirstClick(false)
    });
  }

    return (
      <Fragment>
        <div className="gallery-container">
          {props.edit.image.length === 7 ? 
          <div className="max-images">Max 7 images. Please delete some images.</div> 
          : 
          <div className="upload-multiple-gallery">
            <form onSubmit={handleUpload}>
              <li><input type="file" id='file2' className='hidden' onChange={handleImageFile} /><label className={!imageFile ? "" : "uploaded"} htmlFor="file2">Choose Images For Gallery</label></li>
              <li className="image-file-name">{!imageFile ? "" : imageFile.name}</li>
              <img id="image" />

              {firstClick === true ? 
              <div className="submit_upload_waiting">Choose another Image to upload. Total uploaded: {props.edit.image.length} / 7 </div> : 
              <li><button className={!imageFile ? "" : "uploaded"}>Submit</button></li>

              }



              <progress className="progress_bar" value={progress} max="100"/>
            </form>
          </div>
          }
          <div className="bottom-image-container">
            {props.edit.image.map((el, index) => 
              <div className="delete_images" key={index}>
                {index === 0 ? <h1>Display Image</h1> : "" }
                  <li><img src={el.url} alt='' /></li>
                  <button onClick={() => deleteImg(el.url, el._id)}><FaTrash size="1.5rem"/></button>
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
