import React, { Component } from "react";
import PropTypes from "prop-types";
import api from "../../services/api";

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading
} from "./styles";

class User extends Component {
  state = {
    stars: [],
    loading: true,
    refreshing: false,
    page: 1
  };

  async componentDidMount() {
    await this.loadStarred();
  }

  handleNavigate = repo => {
    const { navigation } = this.props;

    navigation.navigate("Repo", { repo });
  };

  loadStarred = async () => {
    const { navigation } = this.props;
    const { page, stars } = this.state;

    const user = navigation.getParam("user");

    this.setState({
      loading: true
    });

    let params = new URLSearchParams();
    params.append("page", page);

    const response = await api.get(
      `/users/${user.login}/starred?${params.toString()}`
    );

    this.setState({
      stars: [...stars, ...response.data],
      loading: false,
      refreshing: false,
      page: page + 1
    });
  };

  refresh = async () => {
    await this.setState({
      stars: [],
      refreshing: true,
      loading: false,
      page: 1
    });

    this.loadStarred();
  };

  render() {
    const { navigation } = this.props;
    const { loading, page, refreshing, stars } = this.state;

    const user = navigation.getParam("user");

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {page === 1 && loading && <Loading />}

        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred onPress={() => this.handleNavigate(item)}>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
          onEndReached={this.loadStarred}
          onEndReachedThreshold={0.5}
          onRefresh={this.refresh}
          refreshing={refreshing}
        />
      </Container>
    );
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
