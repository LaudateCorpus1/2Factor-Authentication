import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
  Button,
  TextInput
} from 'react-native';

import Amplify, { Auth } from 'aws-amplify'
import config from './src/aws-exports'
Amplify.configure(config)


type Props = {};
export default class App extends Component<Props> {
  
  state = {
  	authCode: ''
  }

  onChangeText(authCode) {
  	this.setState( { authCode })
  	//this.setState({ // another way of doing the same thing!
  	//	authCode: authCode
  	//})
  }

  signUp() {
  	Auth.signUp( {
  		userName: 'User name',
  		password: 'password',
  		attributes: {
  			phoneNumber: '+12345678912'
  			email: 'email@gmail.com'
  		}
  	})
  	.then(res => {
  		console.log('Successful signup: ', res)
  	})
  	.catch(err => {
  		console.log('error signing up: ', err)
  	})
  }

  confirmUser() {
  	const { authCode } = this.state
  	Auth.confirmSignUp('User name', authCode)
  		.then(res => {
  			console.log('successful confirmation: ', res)
  		})
  		.catch(err => {
  			console.log('error confirming user: ', err)
  		})
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title='Sign Up' onPress={this.signUp.bind(this)} />
        <TextInput
        placeholder='Input Code'
        onChangeText={value => this.onChangeText(value)}
        style={styles.input} />
        <Button
        title='Confirm User'
        onPress={this.confirmUser.bind(this)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: '#ededed',
    marginVertical: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  }
})
