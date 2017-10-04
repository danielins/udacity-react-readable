import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Top from './Top';
import Posts from './Posts';
import PostDetail from './PostDetail';
import NewPost from './NewPost';

import { addCategories } from '../actions';

import * as API from '../utils/API.js'

/**
 * App Component
 * The Base component
 * - Wraps the entire application
 * - Calls the pages by routing
 */

class App extends Component {

  componentDidMount(){

    // Fetch the data for the categories
    API.getCategories()
    .then((json) => this.props.pushCategories(json.categories));

  }

  render() {

    return (
      
      <div className='wrapper'>

        <Top categories={ this.props.categories } />

        <Switch>
          <Route exact path='/' component={ Posts } />
          <Route exact path='/new' component={ NewPost } />
          <Route exact path='/edit/:id' component={ NewPost } />
          <Route exact path='/:id' component={ Posts } />
          <Route exact path='/:category/:id' component={ PostDetail } />
        </Switch>

      </div>

    );
  }
}

/**
 * mapStateToProps
 */
function mapStateToProps({categories, posts, comments}){
  return {
    categories,
    posts,
    comments,
  }
}

/**
 * mapDispatchToProps
 */
function mapDispatchToProps(dispatch){
  return {
    pushCategories: (data) => dispatch(addCategories(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));