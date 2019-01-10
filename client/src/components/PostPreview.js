import React from 'react';
import { Link, } from 'react-router-dom'
import {Card, Button} from 'semantic-ui-react'

const PostPreview = ({ id, name, description, date, blog_id }) => (
  <Card>
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Meta>{date}</Card.Meta>
      <Card.Description>{description}</Card.Description> 
    </Card.Content>
    <Card.Content extra>
      <Button
        as={Link}
        to={`/blogs/${blog_id}/posts/${id}`}
        color='black'
        size='mini'
      >
        View Post
      </Button>
    </Card.Content>
  </Card>
)

export default PostPreview;