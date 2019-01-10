import React from 'react';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import { Card, Button, Header, Container, Divider } from 'semantic-ui-react';
import BlogForm from './BlogForm';



class Blogs extends React.Component {
  state = { blogs: [], showForm: false };

  componentDidMount() {
    axios.get('/api/blogs')
      .then( res => this.setState({ blogs: res.data, }));
  }

  toggleForm = () => {
    this.setState( state => {
      return { showForm: !state.showForm }
    })
  }

  blogForm = () => {
    return <BlogForm submit={this.submit} />
  }

  submit = (blog) => {
    axios.post('/api/blogs', {blog})
      .then(res => {
        this.setState({ blogs: [res.data, ...this.state.blogs], showForm: false})
      })
  }



  renderBlogs = () => {
    return this.state.blogs.map (b => (
      <Card key={b.id}>
        <Card.Content>
          <Card.Header>
            {b.title}
          </Card.Header>
          <Card.Meta>{b.category}</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Button
            as={Link}
            to={`/blogs/${b.id}`}
            color='black'
            size='mini'
          >
            View Blog
          </Button>
        </Card.Content>
      </Card>
    ))
  }
 
  render() {
    const { showForm } = this.state
    return (
      <div>
        <Header style={{'fontSize': '50px'}} textAlign='center'>Blogs</Header>
        <Container>
          <Button  
            color='black' 
            size ='mini' 
            onClick={this.toggleForm}
            >
              { showForm ? 'Cancel' :'Create Blog'}
          </Button>
          {showForm ? this.blogForm() : null }

        </Container>
        <Divider />
        <br />
        <br />
          <Card.Group>
            { this.renderBlogs() }
          </Card.Group>
      </div>
    )
  }

}

export default Blogs;