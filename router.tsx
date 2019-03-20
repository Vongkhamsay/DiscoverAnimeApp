import React, {Component} from 'react';
import { Router, Scene, Modal, Actions } from 'react-native-router-flux'
import { ActivityIndicator, AsyncStorage, StyleSheet } from 'react-native';
import Home from './containers/Home/HomeContainer';
import { Button, Text, View, Toast } from 'native-base';
import { Font } from 'expo';


interface ILoginProps {
}

interface ILoginState {
//    hasToken: boolean
   isLoaded: boolean
}

interface IActions {

}

interface IConnectedLoginProps extends ILoginProps, IActions { }

class Routes extends Component<IConnectedLoginProps, ILoginState> {
   constructor(props) {
      super(props);
      this.state = {
        //  hasToken: false,
         isLoaded: false
      };
   }

   componentWillMount() {
      this.loadFonts();
    }
    async loadFonts() {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        Entypo: require("native-base/Fonts/Entypo.ttf"),
        Feather: require("native-base/Fonts/Feather.ttf"),
        FontAwesome: require("native-base/Fonts/FontAwesome.ttf"),
        // MaterialIcons: require("native-base/Fonts/MaterialIcons.ttf"),
        // MaterialCommunityIcons: require("native-base/Fonts/MaterialCommunityIcons.ttf"),
        Octicons: require("native-base/Fonts/Octicons.ttf"),
        // Zocial: require("@expo/vector-icons/fonts/Zocial.šttf"),
        // SimpleLineIcons: require("native-base/Fonts/SimpleLineIcons.ttf"),
        // EvilIcons: require("native-base/Fonts/EvilIcons.ttf"),
        // ...Ionicons.font,
      });
      this.setState({ isLoaded: true });
    }

   authenticate = () => {
      console.log('Authenticating')
      // return false
   }

   logout = () => {
      AsyncStorage.setItem('token', '').then((res) => {
         Toast.show({
            text: 'You have been logged out.',
            duration: 3000,
            position: 'bottom',
            type: 'success'
         })
         Actions.push('login');
      })
   }

   logoutButton = () => {
      // return (<Text style={{ marginRight: 10 }} onPress={() => { this.logout() }}>Logout</Text>)
   }

   render() {
      if (!this.state.isLoaded) {
         return (

            <ActivityIndicator
               animating={!this.state.isLoaded}
               size='large'
            />

         );
      } else {
         return (
            <Router>
               <Scene key="root">
                  <Scene key="home" component={Home} hideNavBar={true} />
               </Scene>
            </Router>
         )
      }
   }
}

export default Routes
