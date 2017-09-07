import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Top from './Top';

import { addCategory } from '../actions';

/**
 * App Component
 * The Base component
 * - Wraps the entire application
 * - Calls the pages by routing
 */

class App extends Component {

  componentDidMount(){

    // Fetch the data for the categories
    fetch('http://localhost:5001/categories', {headers: {'Authorization': 'udacity'}})
    .then((r) => r.json())
    .then((json) => json.categories.map((category) =>
      this.props.pushCategory(category)
    ));

  }

  render() {

    return (
      
      <div className='wrapper'>

        <Top categories={ this.props.categories } />

        <Route exact path='/' render={() => (
          <h2>
            Main Page
          </h2>
        )}/>

        <Route path='/c/:id' name='category' render={(props) => {
          return (
            <h2>
              Category Page: { props.match.params.id }
            </h2>
          )}
        }/>

      </div>

    );
  }
}

/**
 * mapStateToProps
 */
function mapStateToProps({categories, comments, posts}){
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
    pushCategory: (data) => dispatch(addCategory(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));