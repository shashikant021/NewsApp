import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
  const  {title, description, imageUrl, newsUrl, author, date }=this.props;
    return (
      <div className='my-3'>
        <div className="card" >
        <img src={!imageUrl?"https://rapidapi-prod-collections.s3.amazonaws.com/collection/iStock-638044390.jpg.jpg" :imageUrl } className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{title} <span className="badge text-bg-success">New</span></h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown": author} on {new Date(date).toGMTString()} </small></p>
            <a href={newsUrl} rel="noopener noreferrer" target="_blank" className="btn btn-primary">Read More</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem 
