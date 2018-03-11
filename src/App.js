import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
  Button,
  TextInput,
  StatusBar
} from 'react-native';

import { connect } from 'react-redux'


import Tabs from './auth/Tabs'
import Nav from './nav/Nav'


class App extends Component {
	componentDidMount() {
		StatusBar.setHidden(true)
	}
  
  render() {
  	const loggedIn = false

  	if(Auth.user) {
  		const { user: { signInUserSession: { accessToken: { payload: {exp, iat }}}}} = Auth
  		if( iat < exp ) {
  			loggedIn = true
  		}
  	}

  	if(loggedIn) {
  		return (
  			<Nav />
  		)
  	}
  	return (
  		<Tabs />
  	)
  }
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps)(App)
