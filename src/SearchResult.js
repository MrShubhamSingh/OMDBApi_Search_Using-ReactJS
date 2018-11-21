import React, { Component } from 'react';
import fetchMovies from './apiCall.js'
import { withRouter } from 'react-router-dom'
import Modal from './Modal/modal'
import './SearchResult.css'
import Loader from './Loader/Loader'

class SearchResult extends Component {

    state = {
        movies: [],
        id: null,
        detail: false,
        disablePrev: false,
        disableNext: false,
        year: null,
        showYearView: false,
        loading: true
    }


    pathHandler = () => {
        this.props.history.push('/')
        window.location.reload()
    }
    async componentDidMount() {
        try {
            let text = this.props.value
            if (this.state.movies) {
                this.setState({ movies: [] })
                if (text.length >= 3) {

                    const result = await fetchMovies(text)
                    this.setState({
                        movies: result.Search,
                        loading: false
                    });

                }
            }
        }
        catch (error) {
            if (error) {
                this.pathHandler()
                alert("Such movie is not available in database")
                window.location.reload()
            }
        }

    }

    fullView = (x) => {
        this.setState({ id: x, detail: true })
    }

    hideModal = () => {
        this.setState({ detail: false })
    }



    nextHandler = () => {
        const index = this.state.movies.findIndex(x => x.imdbID === (this.state.id))
        const lastIndex = this.state.movies.length - 1
        /*   const nextID =  this.state.movies.filter(x => x.imdbID === (index))
          this.setState({id:nextID}) */

        if (index < lastIndex) {
            this.setState({ disablePrev: false })
            const newID = this.state.movies[index + 1].imdbID
            this.fullView(newID)
        }

        else {
            this.setState({ disableNext: true })
        }


    }


    prevHandler = () => {
        const index = this.state.movies.findIndex(x => x.imdbID === (this.state.id))
        /*   const nextID =  this.state.movies.filter(x => x.imdbID === (index))
          this.setState({id:nextID}) */

        if (index > 0) {
            this.setState({ disableNext: false })
            const newID = this.state.movies[index - 1].imdbID
            this.fullView(newID)
        }
        else {
            this.setState({ disablePrev: true })
        }

    }

    changeWithYearView = () => {
        this.setState({ showYearView: true })
    }
    hideYearView = () => {
        this.setState({ showYearView: false })
    }

    onFilterByYear = (e) => {
        const length = e.target.value.length
        this.setState({ year: e.target.value })
        if (length === 4) {
            this.changeWithYearView()
        }
        else {
            this.hideYearView()
        }
    }



    render() {
        let listItems
        const movieDetailList = this.state.movies.filter(x => x.imdbID === (this.state.id)).map((i) =>
            <div key={i.imdbID}>
                <p onClick={this.hideModal} style={{
                   fontWeight:"bold", color:"black", top:'-10px', right:'10px', position:'absolute', cursor:"pointer"}}>&Chi;</p>
                <h3>{i.Title}</h3>
                <img src={i.Poster} alt="Poster" />
                <h4 style={{textTransform:"uppercase"}}>{i.Type} - {i.Year}</h4>
                <button id="button" style={{backgroundColor:"teal", fontWeight:"bold", color:"black", top:'250px', left:'5px', position:'absolute', cursor:"pointer"}} onClick={this.prevHandler} disabled={this.state.disablePrev}>Prev</button>
                <button id="button" style={{backgroundColor:"teal", fontWeight:"bold", color:"black", top:'250px', right:'5px', position:'absolute', cursor:"pointer"}} onClick={this.nextHandler} disabled={this.state.disableNext}>Next</button></div>)

        this.state.loading ?
            listItems = <Loader id="loader" />
            : listItems = this.state.movies.map((x) =>
                <li onClick={this.fullView.bind(this, x.imdbID)}
                    key={x.imdbID}>
                    <h3>{x.Title}</h3>
                </li>);



        const listYearItems = this.state.movies.filter(x => x.Year === (this.state.year)).map((x) =>
            <li onClick={this.fullView.bind(this, x.imdbID)}
                key={x.imdbID}>
                <h3>{x.Title}</h3>
            </li>);

        return (

            <div className="result">
                <div>
                    <input placeholder="Search By Year" id="myInput" value={this.state.year} onChange={e => this.onFilterByYear(e)} />
                    <button onClick={this.pathHandler} id="button">Search New</button>
                </div>

                <div>
                    {this.state.showYearView ?
                        <div id="searchList">
                            <ul>
                                {listYearItems}
                            </ul>
                        </div>
                        :
                        <div id="searchList">
                            <ul>
                                {listItems}
                            </ul>
                        </div>
                    }
                </div>
                <div>
                    <Modal propsToShow={this.state.detail} propsToHide={this.hideModal}>
                        {movieDetailList}
                    </Modal>
                </div>

            </div>

        );
    }
}

export default withRouter(SearchResult);
