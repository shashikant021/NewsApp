import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps = {
    country: "us",
    pageSize: 6,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page:1
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`;
  }

  async componentDidMount() {
    // this.props.setProgress(10);
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a23907adb99541dd97e558593a30f62e&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
    // this.props.setProgress(100);
  }

  handlePrevClick = async () => {
    // this.props.setProgress(10);
    let url =
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a23907adb99541dd97e558593a30f62e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json()
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    })
    // this.props.setProgress(100);
  }

  handleNextClick = async () => {
    // this.props.setProgress(10);
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    }
    else{
      let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a23907adb99541dd97e558593a30f62e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
      });
    }
    // this.props.setProgress(100);
  }

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{margin: "65px"}}>NewsApp-Headlines from {this.capitalizeFirstLetter(this.props.category)}</h2>
        <div className="row">
          {this.state.articles.map((element) => {
           return <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title : ""}
                description={element.description ? element.description : ""}
                imageUrl={element.urlToImage}
                newsUrl={element.url} 
                author={element.author}
                date={element.publishedAt} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>

        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>


        </div>
      </div>
    )
  }
}

export default News
