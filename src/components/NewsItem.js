import React from 'react';

export default function NewsItem(props) {
  return (
    <>
      <div className='my-3'>
      <div className="card" >
        <img src={props.url} className="card-img-top my-3" alt="..." />
        <div className="card-body">
      
          <h5 className="card-title">{props.title}...</h5>
          <p className="card-text">{props.description}...</p>
          <p className="card-text"> <small className="text-body-secondary">By {props.author ? props.author : "Unknown"} on {new Date(props.date).toUTCString()}</small></p>
          <a href={props.newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">Read More..</a>


        </div>
      </div>
      </div>
    </>
  );
}
