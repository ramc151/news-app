import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export default class News extends Component {
    articles = []
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number,
    }

    static defaultProps = {
        country: "in",
        category: "general",
        pageSize: 5,
    }
    capitlizeText = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `MyNews - ${this.capitlizeText(this.props.category)}`
    }
    async componentDidMount() {
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        this.setState({ loading: true })
        this.props.setProgress(30)
        let data = await fetch(url);
        let parsedata = await data.json();
        // console.log(parsedata)
        this.props.setProgress(70)
        this.setState({
            articles: parsedata.articles,
            loading: false,
            totalResults: parsedata.totalResults,
        })
        this.props.setProgress(100)
    }
    fetchdata = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&category=${this.props.category}&page=${this.state.page + 1}`;
        this.setState({ page: this.state.page + 1 })
        let data = await fetch(url);
        let parsedata = await data.json();
        // console.log(parsedata)
        this.setState({
            articles: this.state.articles.concat(parsedata.articles),
            totalResults: parsedata.totalResults,
        })
    }
    render() {
        return (
            <div className="container">
                <h2 className="text-center" style={{ margin: '20px 0', marginTop: '80px' }}>MyNews - Top {this.capitlizeText(this.props.category)} Headlines</h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length} //This is important field to render the next data
                    next={this.fetchdata}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}>
                    <div className="row m-0">
                        {this.state.articles.map((elem) => {
                            return <div className="col-md-4" key={elem.url}>
                                <NewsItem title={elem.title} description={elem.description} imageUrl={elem.urlToImage} newsUrl={elem.url} author={elem.author} date={elem.publishedAt} />
                            </div>
                        })}
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}
