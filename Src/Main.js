import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import { Provider } from "react-redux";
import configureStore from '../Src/Store/ConfigureStore';
import MainAppRoute from "./Routes/StackNavigation/MainAppRoute";
import firebase from 'react-native-firebase';

export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }
// componentDidMount(){
//   firebase.auth().signInAnonymously()
//   .then((resp) => {
//       console.log('resp: '+JSON.stringify(resp))
//   })
// }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={configureStore}>
        {/* <Text>test</Text> */}
        <MainAppRoute />
        </Provider>
      </View>
    );
  }
}
