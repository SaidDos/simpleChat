import { createStackNavigator, createAppContainer } from "react-navigation";
import SplashScreen from "../../Screens/SplashScreen";
import LoginScreen from "../../Screens/LoginScreen";
import ChatScreen from "../../Screens/ChatScreen";

const MainAppRoute = createStackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      header: null
    }
  },

  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },

  ChatScreen: {
    screen: ChatScreen,
    navigationOptions: {
      header: null
    }
  }
});
const App = createAppContainer(MainAppRoute);
export default App;
