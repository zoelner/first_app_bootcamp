import { createAppContainer, createStackNavigator } from "react-navigation";

import Main from "./pages/Main";
import Repo from "./pages/Repo";
import User from "./pages/User";

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      Repo
    },
    {
      headerLayoutPreset: "center",
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: "#7159c1"
        },
        headerTintColor: "#fff"
      }
    }
  )
);

export default Routes;
