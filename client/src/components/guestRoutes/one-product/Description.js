import'./Description.scss';
import React,{Fragment} from 'react';
import ReactHtmlParser from 'react-html-parser';

const Description = props => {

    const replaceStringWithLineBreak = (str) => str.replace(/\//g, "<br/><br/>")
    
    return (
            <Fragment>
            {!props.post.description ? "" : 
            <div className="contentDescription1">
                <div className="description">
                    <h2>{props.post.description.description_one.title}</h2>
                    <p>{ReactHtmlParser(replaceStringWithLineBreak(props.post.description.description_one.des)) }</p>
                </div>
            </div>
            }

            {!props.post.description ? "" :
            <div className="contentDescription2">
                <div className="description">
                    <h2>{props.post.description.description_two.title}</h2>
                    <p>{ReactHtmlParser(replaceStringWithLineBreak(props.post.description.description_two.des)) }</p>
                </div>
            </div>
            }

            {!props.post.description ? "" :
            <div className="contentDescription3">
                <div className="description">
                    <h2>{props.post.description.description_three.title}</h2>
                    <p>{ReactHtmlParser(replaceStringWithLineBreak(props.post.description.description_three.des)) }</p>
                </div>
            </div>
            }

            </Fragment>
    )
}


export default Description
