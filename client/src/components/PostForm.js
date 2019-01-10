import React from 'react';
import { Form } from 'semantic-ui-react';

class PostForm extends React.Component {
  defaultValues = { name: "", description: "", body: "", date: "", };
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
    const post = { ...this.state }
    this.props.submit(post)
    this.setState({ ...this.defaultValues})
    
  }

  render() {
    const { name, description, body, date } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input 
            fluid
            name="name"
            placeholder="Name of Post"
            label="Name"
            value={name}
            required
            onChange={this.handleChange}
          />
          <Form.Input 
            fluid
            name="description"
            placeholder="Description of Post"
            label="Description"
            value={description}
            required
            onChange={this.handleChange}
          />
          <Form.Input 
            fluid
            name="date"
            placeholder="MM/DD/YYYY"
            label="Date"
            value={date}
            required
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.TextArea
          name="body"
          placeholder="Body"
          label="Body"
          value={body}
          required
          onChange={this.handleChange}
        />
        <Form.Button color='black' size ='mini'>
          Submit
        </Form.Button>
      </Form>
    )
  }



}

export default PostForm