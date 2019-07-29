import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import api from "../../services/api";

// import { Container } from './styles';

class User extends Component {
  state = {
    stars: []
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam("user");

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({
      stars: response.data
    });
  }

  render() {
    return <View />;
  }
}

User.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam("user").name
});

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func
  }).isRequired
};

export default User;
