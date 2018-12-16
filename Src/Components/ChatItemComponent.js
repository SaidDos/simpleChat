import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';


class ChatItemComponent extends Component {

    showAvatarOrNoT(message) {
        if (message.author.id !== this.props.user.id ) {
            return (
                <Avatar
                    source={{ uri: message.author.avatar }}
                    small
                    rounded
                />
            );
        }

        return <View/>
    }
    render() {
        const message = this.props.message;
        const isMyMessage = message.author.id == this.props.user.id;
        const textContainerExtra = isMyMessage ? styles.textContainerRight : styles.textContainerLeft;
        return (
            <View style={styles.messageContainer}>
                {this.showAvatarOrNoT(message)}
                <View style={[styles.textContainer, textContainerExtra ]}>
                    <Text style={styles.sender}>{message.author.username}</Text>
                    <Text style={styles.message}>{message.text}</Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: 'row',
        padding: 20
    },
    textContainer: {
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        borderRadius: 5,
        // paddingHorizonal: 10,
        paddingVertical: 5
    },
    textContainerLeft:{
        alignItems: 'flex-start',
        backgroundColor: '#d5d8d4'
    },
    textContainerRight: {
        alignItems: 'flex-end',
        backgroundColor: 'lightblue' //#66db30
    },
    message: {
        fontSize: 16,
        marginHorizontal:10
    },
    sender: {
        fontWeight: 'bold',
        paddingRight: 10
    }
});

const mapStateToProps = state => {
    return {
        user: state.login.user
    }
}

export default connect(mapStateToProps)(ChatItemComponent);
