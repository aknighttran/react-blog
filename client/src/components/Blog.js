import React from 'react';
import axios from 'axios';
import { Header, Divider, Button, Grid, Icon, Card, } from 'semantic-ui-react';
import BlogForm from './BlogForm';
import PostForm from './PostForm';
import PostPreview from './PostPreview';
// import { Link } from 'react-router-dom'

class Blog extends React.Component {
  state = { blog: {}, posts: [], };
   
  componentDidMount() {
    const { id, } = this.props.match.params;
    axios.get(`/api/blogs/${id}`)
      .then( res => {
        this.setState({ blog: res.data, })
      });
    axios.get(`/api/blogs/${id}/posts`)
      .then( res => {
        this.setState({ posts: res.data, })
      })
  }

  handleDelete = (id) => {
    const remove = window.confirm("Are you sure you want to delete this blog?")
    if (remove)
      axios.delete(`/api/blogs/${id}`)
        .then( res => this.props.history.push('/blogs'))
  }

  toggleEdit = () => {
    this.setState( state => {
      return { edit: !this.state.edit}
    })
  }

  editBlog = () => {
    return <BlogForm {...this.state.blog} submit={this.submitBlog}/>
  }

  submitBlog = (blog) => {
    axios.put(`/api/blogs/${this.props.match.params.id}`, { blog })
      .then(res => {
        this.setState({ blog: res.data, edit: false })
      })
  }

  toggleForm = () => {
    this.setState(state => {
      return { showForm: !state.showForm }
      })
  }

  postForm = () => {
    return <PostForm submit={this.submitPost} />
  }

  submitPost = (post) => {
    const { id, } = this.props.match.params;
    axios.post(`/api/blogs/${id}/posts`, { post })
      .then(res => {
        this.setState({ posts: [res.data, ...this.state.posts], showForm: false})
      })
  }

  renderPosts= () => {
    return this.state.posts.map( p => (
      <PostPreview key={p.id} {...p} />
    ))
  }
  

  render () {
    const { blog: { id, title, category, }, edit, showForm } = this.state;
    return(
      <div>
        <Header style={{'fontSize': '50px'}} textAlign='center'>{ title }</Header>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
            <Button 
              onClick={this.toggleEdit} 
              size='mini'
              color="black"
              >
                { edit? 'Cancel Edit' : 'Edit' }
              </Button>
            <Button
              icon
              color="black"
              size="mini"
              onClick={() => this.handleDelete(id)}
            >
              <Icon name="trash alternate outline" />
            </Button>
            </Grid.Column>
            <Grid.Column style={{'textAlign': 'center'}} as='h3'>
              {category}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {edit ? this.editBlog() : null}
        <Divider />
        <div>
          <Button
            onClick={this.toggleForm} 
            color='black'
            size='mini' 
            >
              { showForm ? 'Cancel' : 'Create Post'}
          </Button>
          {showForm ? this.postForm() : null }
        </div>
        < br />
        <Card.Group itemsPerRow={3}>
          { this.renderPosts() }
        </Card.Group>
        
      </div>
    )

  }


}

export default Blog;