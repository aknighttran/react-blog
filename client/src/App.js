import React, { Fragment } from 'react';
import { Route, Switch, } from 'react-router-dom';
import { Container, } from 'semantic-ui-react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import Post from './components/Post';
import NoMatch from './components/NoMatch';



const App = () => (
  <Fragment>
    <Navbar />
    <Container>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/blogs" component={Blogs} />
        <Route exact path="/blogs/:id" component={Blog} />
        <Route exact path="/blogs/:blog_id/posts/:id" component={Post} />
        <Route component={NoMatch} />
      </Switch>
    </Container>
  </Fragment>
)

export default App;
