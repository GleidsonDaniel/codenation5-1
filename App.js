import React from 'react'
import Login from './src/screens/Login'
import Profile from './src/screens/Profile'
import Acceleration from './src/screens/Acceleration'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

 const StackRouterRoot = createStackNavigator({
  Login: Login,
  Acceleration: Acceleration,    
  Profile: Profile
    }, {
      headerMode: 'none'
    })
  
const App = createAppContainer(StackRouterRoot)

export default App;
