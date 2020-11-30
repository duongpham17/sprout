import './Avatar.scss'
import React, { Fragment, useState } from 'react';
import {updateAvatar} from '../../../actions/userActions';
import {connect} from 'react-redux';
import {FiThumbsUp, FiThumbsDown} from 'react-icons/fi';

const Avatar = props => {

    const [editAvatar, setEditAvatar] = useState(false)

    return (
        <Fragment>
            <div className="user-score">
                <li><h3><FiThumbsUp /> <br/><span>{props.user.good}</span></h3></li>
                <li><h3><FiThumbsDown  /> <br/><span>{props.user.bad}</span></h3></li>
            </div>
            <div className="avatar">
                <img className="current-avatar" src={props.user.avatar} alt="avatar"/>
                <div className="avatar-edit-btn">
                    <button onClick={() => setEditAvatar(!editAvatar)}>{editAvatar ? "Picking Avatar" : "Edit Avatar" }</button>
                </div>
                {editAvatar ?
                <div className="avatar-pick">

                {props.user.role === "admin" ? 
                <Fragment>
                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fadmin-crown.png?alt=media&token=cef9eb2e-f91d-458e-a6f8-72a48ff737a2")}><img alt="avatar" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fadmin-crown.png?alt=media&token=cef9eb2e-f91d-458e-a6f8-72a48ff737a2"/></button></li>
                </Fragment>
                : "" }
                
                {props.user.good >= 250 ? 
                <Fragment>
                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fbun1.jpeg?alt=media&token=6390da5a-1d15-4c84-85f5-6883ba568c2e")}><img alt="avatar" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fbun1.jpeg?alt=media&token=6390da5a-1d15-4c84-85f5-6883ba568c2e"/></button></li>
                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fbun2.jpeg?alt=media&token=805ad853-8989-4752-abc8-94ee2cde46c4")}><img alt="avatar" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fbun2.jpeg?alt=media&token=805ad853-8989-4752-abc8-94ee2cde46c4"/></button></li>
                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fbun3.jpeg?alt=media&token=c1600168-3668-46b1-900c-1931d1198b52")}><img alt="avatar" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fbun3.jpeg?alt=media&token=c1600168-3668-46b1-900c-1931d1198b52"/></button></li>
                </Fragment>
                : "" }
                                
                {props.user.good >= 100 ? 
                <Fragment>
                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fsquareboi.png?alt=media&token=64dafeff-5bf8-4d83-85e2-8ec44edd4083")}><img alt="avatar" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fsquareboi.png?alt=media&token=64dafeff-5bf8-4d83-85e2-8ec44edd4083"/></button></li>
                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fsquareboi2.png?alt=media&token=437d5ced-83a7-43fd-99b0-30dd65898cf7")}><img alt="avatar" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fsquareboi2.png?alt=media&token=437d5ced-83a7-43fd-99b0-30dd65898cf7"/></button></li>
                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fsquareboi3.png?alt=media&token=eb0c77dd-920a-45b4-8195-0769ef1ca111")}><img alt="avatar" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fsquareboi3.png?alt=media&token=eb0c77dd-920a-45b4-8195-0769ef1ca111"/></button></li>
                </Fragment>
                : "" }

                {props.user.good >= 25 ? 
                <Fragment>
                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fpotatohead.png?alt=media&token=504e4ad7-0c0c-40fc-8933-afe6b089d6ce")}><img alt="avatar" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fpotatohead.png?alt=media&token=504e4ad7-0c0c-40fc-8933-afe6b089d6ce"/></button></li>
                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fbluepotatohead.png?alt=media&token=daa6d445-d6d8-4e78-bf73-9836017bc0d1")}><img alt="avatar" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fbluepotatohead.png?alt=media&token=daa6d445-d6d8-4e78-bf73-9836017bc0d1"/></button></li>
                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Forangepotatohead.png?alt=media&token=efe6aa01-07ef-41e7-935b-c1306e0ecda0")}><img alt="avatar" src=" https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Forangepotatohead.png?alt=media&token=efe6aa01-07ef-41e7-935b-c1306e0ecda0"/></button></li>
                </Fragment>
                : "" }

                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fbroccoli.jpeg?alt=media&token=6936bd6b-8e1b-4ec3-aebf-6f0df8b11ad9")}><img alt="avatar" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fbroccoli.jpeg?alt=media&token=6936bd6b-8e1b-4ec3-aebf-6f0df8b11ad9"/></button></li>
                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fcake.jpeg?alt=media&token=5a058805-a113-405a-9713-25894088e2ca")}><img alt="avatar" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fcake.jpeg?alt=media&token=5a058805-a113-405a-9713-25894088e2ca"/></button></li>
                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fcarrot.jpeg?alt=media&token=9db2f3d9-58a5-418b-984d-ee47a20976fe")}><img alt="avatar" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fcarrot.jpeg?alt=media&token=9db2f3d9-58a5-418b-984d-ee47a20976fe"/></button></li>
                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fcherry.jpeg?alt=media&token=a0acac4c-b0c7-467e-8416-b6fd3985449e")}><img alt="avatar" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fcherry.jpeg?alt=media&token=a0acac4c-b0c7-467e-8416-b6fd3985449e"/></button></li>
                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fcookie.jpeg?alt=media&token=7e50b83a-cbfd-4762-ad25-f5edab4a245f")}><img alt="avatar" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fcookie.jpeg?alt=media&token=7e50b83a-cbfd-4762-ad25-f5edab4a245f"/></button></li>
                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fcroissant.jpeg?alt=media&token=17ccc608-79ee-4beb-8e1d-a53da130cf35")}><img alt="avatar" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fcroissant.jpeg?alt=media&token=17ccc608-79ee-4beb-8e1d-a53da130cf35"/></button></li>
                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fcupcake.jpeg?alt=media&token=a4981bd3-6827-4ec6-b928-8b9549bc1439")}><img alt="avatar" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fcupcake.jpeg?alt=media&token=a4981bd3-6827-4ec6-b928-8b9549bc1439"/></button></li>
                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fdragon.jpeg?alt=media&token=d31f77b9-933e-4074-a7a8-4cd8e0e39051")}><img alt="avatar" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fdragon.jpeg?alt=media&token=d31f77b9-933e-4074-a7a8-4cd8e0e39051"/></button></li>
                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Flemon.jpeg?alt=media&token=4b8aafb0-5741-4ea3-ad8c-135aabba1900")}><img alt="avatar" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Flemon.jpeg?alt=media&token=4b8aafb0-5741-4ea3-ad8c-135aabba1900"/></button></li>
                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fmacaron.jpeg?alt=media&token=3e17eab3-0034-4169-aead-6fb0c34029f8")}><img alt="avatar" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fmacaron.jpeg?alt=media&token=3e17eab3-0034-4169-aead-6fb0c34029f8"/></button></li>
                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fstrawberry.jpeg?alt=media&token=c16bb827-4fa2-4a4b-ae5a-6286153f89f4")}><img alt="avatar" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fstrawberry.jpeg?alt=media&token=c16bb827-4fa2-4a4b-ae5a-6286153f89f4"/></button></li>
                <li><button onClick={() => props.updateAvatar("https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Ftomato.jpeg?alt=media&token=e8f28feb-62c3-42f7-9775-16f40f14c0af")}><img alt="avatar" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Ftomato.jpeg?alt=media&token=e8f28feb-62c3-42f7-9775-16f40f14c0af"/></button></li>

                </div>
                : "" 
                }
            </div>
        </Fragment>
    )
}


export default connect(null, {updateAvatar})(Avatar)
