import React, { PureComponent } from "react";
import { AsyncStorage, View, ImageBackground, ActivityIndicator } from "react-native";
import { connect } from 'react-redux';
import { loggedIn } from '../Store/Actions/ActionCreators';

class SplashScreen extends PureComponent {
  constructor(props) {
    super(props);
   
  }
 
  componentDidMount(){
    AsyncStorage.getItem('user')
        .then(user => {
          console.log('user '+user)
            if (user) {  
              console.log('user is exist')  
                const userObject = JSON.parse(user);
                this.props.loggedIn(userObject);
            }else {
                this.props.navigation.navigate('LoginScreen');
            }
        });
    
}

componentWillReceiveProps(nextProps) {
  console.log('inside willResiveprops')
    if (nextProps.user) {
      // console.log('user inside willResiveprops'+user)
        this.props.navigation.navigate('ChatScreen');
    }
}

  render() {
    return (
      <View style={{ backgroundColor: '#1c7df3', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
        <ActivityIndicator size='large' color='white' />
      </View>
    );

  }
}


const mapStateToProps = state => {
  return {
      user: state.login.user,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    loggedIn:(user)=>dispatch(loggedIn(user))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
