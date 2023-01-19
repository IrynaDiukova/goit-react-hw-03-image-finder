import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styled';

export default class Searchbar extends Component{
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    search: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    const { search } = this.state;
    const notmalizedSearch = search.trim();

    this.props.onSubmit(notmalizedSearch);
    this.setState({ search: notmalizedSearch });

    if (!notmalizedSearch) {
      toast.warning('Please, enter your search query.')
    }
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render(){
    const { search } = this.state;

    return(
     <Header className="header">
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <ButtonLabel>Search</ButtonLabel>
          </Button>

          <Input
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            name="search"
            value={search}
            onChange={this.handleInputChange}
          />
        </Form>
    </Header>
    );

  }
}

