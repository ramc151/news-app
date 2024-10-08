import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date } = this.props;
        return (
            <div className="my-3">
                <div className="card">
                    <img src={imageUrl ? imageUrl : "https://images.livemint.com/img/2022/11/09/600x338/Instagram_1655990494968_1667977904959_1667977904959.jpg"} alt="" className="card-img-top" />
                    <div className="card-body">
                        <h5 className="title">{title}</h5>
                        <p className="text">{description}</p>
                        <p className="text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" rel='noreferrer' className='btn btn-primary'>Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
