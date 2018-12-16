import {
    LOGIN_ATTEMP,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    FETCHING,
    MESSAGE_RECIVED
} from './ActionTypes';

import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';

const DEFAULT_AVATAR = 'http://abolkog.com/img/default_user.png';

export const Login = ( username, avatar ) => {
    const userAvatar = avatar.length === 0 ? DEFAULT_AVATAR : avatar;
    return (dispatch) => {
        dispatch({ type: LOGIN_ATTEMP });

        firebase.auth().signInAnonymously()
            .then((resp) => {
                console.log('uid: '+resp.user.uid)
                const userId = resp.user.uid;
                const user = {
                    id: userId,
                    username,
                    avatar: userAvatar
                };
               
                firebase.database().ref(`users/${userId}`)
                    .set({ username, avatar: userAvatar})
                    .then(() => finishLogin(dispatch, user ))
                    .catch(error=>{
                        dispatch({
                            type:LOGIN_FAILED,
                            error:error
                        })
                    });
            });
        
    }
};

const finishLogin = (dispatch, user ) => {
    AsyncStorage.setItem('user', JSON.stringify(user))
        .then(() => {
            dispatch({ type: LOGIN_SUCCESS, user: user });
        });
}

export const loggedIn = (user) => {
    return ({ type: LOGIN_SUCCESS, user: user });
}


export const SendMessage = (text, user) => {
    return (dispatch) => {
        const chatMessage = {
            text,
            author: user
        };

        firebase.database().ref('messages')
            .push(chatMessage);
    }
}

export const FetchMessges = () => {
    return (dispatch) => {
        dispatch({ type: FETCHING });
        firebase.database().ref('messages')
            .orderByKey()
            .limitToLast(30)
            .on('value', (snapshot) => {
                const data = snapshot.val() || [];
                handleData(dispatch, data);
            });
    }
}

const handleData = (dispatch, data ) => {
    const messages = [];
    Object.values(data).forEach(msg => {
        messages.unshift(msg);
    });

    dispatch({ type: MESSAGE_RECIVED, messages: messages });
}