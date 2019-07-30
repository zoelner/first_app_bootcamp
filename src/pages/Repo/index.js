import React from "react";
import { WebView } from "react-native-webview";

function Repo(props) {
  const { navigation } = props;

  return <WebView source={{ uri: navigation.getParam("repo").html_url }} />;
}

Repo.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam("repo").full_name
});

export default Repo;
