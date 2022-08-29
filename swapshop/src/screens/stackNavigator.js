import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import RegisterScreen from './registerScreen';
import LoginScreen from './loginScreen';

screens = {
  Login: {
    screen: LoginScreen
  },
  Register: {
    screen: RegisterScreen
  },
};

const Stack = createStackNavigator(screens);

export default createAppContainer(Stack);
