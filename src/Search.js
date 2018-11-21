import React, { Component } from 'react';
import { Route, Link, withRouter, Switch} from 'react-router-dom'
import SearchResult from './SearchResult'
import './Search.css'

class Search extends Component {

  state = {
    value: null,
    show: true
  }

  setValue = (e) => {
    this.setState({ value: e.target.value })
  }


  pageHandler = (event) => {
    let showORNot = this.state.show
    if (this.state.value === null) {
      alert("String can't be empty")
    }
    else {
      if (this.state.value.length >= 3) {
        this.setState({ show: !showORNot })
      }
    }

  }



  componentDidUpdate() {
    if (this.props.location.path !== "/") {

      window.addEventListener('popstate', this.pageHandler)
    }


  }

  render() {


    return (
      <div>
        {this.state.show ?
          <div id="form">
            <input placeholder="Search Here" value={this.state.value} onChange={e => this.setValue(e)} />
            <Link to= "/lIwAs3dFljI"><button onClick={this.pageHandler} ><Link to="/lIwAs3dFljI" style={{textDecoration:'none'}}>Search</Link></button></Link>
          </div>
          :
          <Switch>
            <Route exact path="/lIwAs3dFljI" component={() => (<SearchResult value={this.state.value} />)} />
          </Switch>
        }
      </div>
    );
  }
}

export default withRouter(Search);
