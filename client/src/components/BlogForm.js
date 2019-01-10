import React from 'react';
import { Form } from 'semantic-ui-react';

class BlogForm extends React.Component {
  defaultValues = { title: "", category: ""};
  state = {...this.defaultValues}

  componentDidMount() {
    if (this.props.id) {
      this.setState({...this.props})
    }
  }

  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({ [name]: value, });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const blog = { ...this.state }
    this.props.submit(blog)
    this.setState({ ...this.defaultValues})
    
  }

  render() {
    const { title, category, } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input 
            fluid
            name="title"
            placeholder="Title of Blog"
            label="Title"
            value={title}
            required
            onChange={this.handleChange}
          />
          <Form.Input 
            fluid
            name="category"
            placeholder="Category of Blog"
            label="Category"
            value={category}
            required
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Button color='black' size ='mini'>
          Submit
        </Form.Button>
      </Form>
    )
  }



}

export default BlogForm