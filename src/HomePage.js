import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Search from './Search'
import SearchResult from './SearchResult'
const HomePage = (props) => {
    return (
        <Switch>
            <Route path='/' component={()=>(<Search/>)} />
            <Route path="/SearchBox" exact component={()=>(<SearchResult value={props.value}/>)}/>     
        </Switch>
    )
}

export default HomePage;
