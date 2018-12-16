import React, { PureComponent } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Header, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { Login } from '../Store/Actions/ActionCreators';

 class LoginScreen extends PureComponent {
    constructor() {
        super();
        this.state = {
            username: '',
            avatar: '',
            disabled: true
        }
    }

    onUserNameChanged(userName) {
        if (userName && userName.length > 3) {
            this.setState({
                disabled: false,
                username: userName
            });
        } else {
            this.setState({
                disabled: true
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.props.navigation.navigate('ChatScreen');
        }
    }
    onLoginPressed() {
        const { username, avatar } = this.state;
        this.props.login(username, avatar);
    }

    
    showBtnOrSpinner() {
        if (this.props.loading) return <ActivityIndicator />;
        return (
            <Button
                title='Join Chat'
                backgroundColor='#2195f3'
                disabled={this.state.disabled}
                onPress={this.onLoginPressed.bind(this)}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: 'Login', style: { color: '#fff', fontSize:20 } }}
                />
                <FormLabel>Chat Name</FormLabel>
                <FormInput 
                    placeholder='Select Chat Name'
                    onChangeText={(username) => this.onUserNameChanged(username)}
                />
                <FormLabel>Chat Avatar</FormLabel>
                <FormInput
                    placeholder='Leave it blank for default'
                    onChangeText={avatar => this.setState({ avatar })}
                />

                <View style={styles.btnContainer}>
                    {this.showBtnOrSpinner()}
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btnContainer: {
        marginTop: 20
    }
});

const mapStateToProps = state => {
    return {
        error: state.login.error,
        loading: state.login.loading,
        user: state.login.user,
    };
}

const  mapDispatchToProps=dispatch=>{
    return{
        login:(username, avatar)=>dispatch(Login(username, avatar))
    }
}
export default connect(mapStateToProps,  mapDispatchToProps)(LoginScreen);
