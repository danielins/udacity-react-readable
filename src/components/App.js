import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Top from './Top';

class App extends Component {
  render() {
    return (
      
      <div className='wrapper'>

        <Top />

        <Route exact path='/' render={() => (
          <h2>
            Main Page
          </h2>
        )}/>

        <Route path='/category' name='category' render={(props) => (
          <h2>
            Category Page { props.location.query.catId }
          </h2>
        )}/>

      </div>

    );
  }
}

export default App;
