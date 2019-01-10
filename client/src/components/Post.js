import React from 'react'
import axios from 'axios'
import PostForm from './PostForm'
import { Header, Button, Icon, Grid, Divider, Card } from 'semantic-ui-react'

class Post extends React.Component {
  state = { blog: {}, post: {}, showForm: false }

  componentDidMount() {
    const { blog_id, id } = this.props.match.params;
    axios.get(`/api/blogs/${blog_id}`)
      .then( res => {
        this.setState({ blog: res.data})
      });
    axios.get(`/api/blogs/${blog_id}/posts/${id}`)
      .then( res => {
        this.setState({ post: res.data, })
      })
  }

  handleDelete = (blog_id, id) => {
    const remove = window.confirm("Are you sure you want to delete this post?")
    if (remove)
      axios.delete(`/api/blogs/${blog_id}/posts/${id}`)
        .then( res => this.props.history.push(`/blogs/${blog_id}`))
  }

  toggleEdit = () => {
    this.setState( state => {
      return { edit: !this.state.edit}
    })
  }

  editPost = () => {
    return <PostForm {...this.state.post} submit={this.submitPost}/>
  }

  submitPost = (post) => {
    const { blog_id, id } = this.props.match.params;
    axios.put(`/api/blogs/${blog_id}/posts/${id}`, { post })
      .then(res => {
        this.setState({ post: res.data, edit: false })
      })
  }

  toggleForm = () => {
    this.setState(state => {
      return { showForm: !state.showForm }
      })
  }

  render() {
    const { post: {name, description, body, date, blog_id, id}, edit } = this.state
    return (
      <div>
        <Header style={{'fontSize': '50px'}} textAlign='center'>{ name }</Header>
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
              onClick={() => this.handleDelete(blog_id, id)}
            >
              <Icon name="trash alternate outline" />
            </Button>
            </Grid.Column>
            <Grid.Column style={{'textAlign': 'center'}} as='h3'>
              {description}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {edit ? this.editPost() : null}
        <Divider />
        < br />
        <Card.Group itemsPerRow={3}>
          { body }
        </Card.Group>
      </div>
    )
  }


}

export default Post;