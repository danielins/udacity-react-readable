/* core */
import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

/* components */
import Top from './Top';
import Posts from './Posts';
import PostDetail from './PostDetail';
import NewPost from './NewPost';

/* redux */
import { fetchCategories } from '../actions/posts.js';

/* styling */
import '../styles/App.css';

/**
 * App Component
 * The Base component
 * - Wraps the entire application
 * - Calls the pages by routing
 */

class App extends Component {

  componentWillMount(){

    this.props.fetchCategories()

  }

  render() {

    return (
      
      <div className='wrapper'>

        <Top categories={ this.props.categories } />

        <main>
          <Switch>
            <Route exact path='/' component={ Posts } />
            <Route exact path='/new' component={ NewPost } />
            <Route exact path='/edit/:id' component={ NewPost } />
            <Route exact path='/:id' component={ Posts } />
            <Route exact path='/:category/:id' component={ PostDetail } />
          </Switch>
        </main>

      </div>

    );
  }
}

/**
 * mapStateToProps
 */
function mapStateToProps({categories}){
  return {
    categories
  }
}

/**
 * mapDispatchToProps
 */
function mapDispatchToProps(dispatch){
  return {
    fetchCategories: () => fetchCategories(dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));