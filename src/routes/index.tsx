import { NavigationContainer } from '@react-navigation/native'

import { userAuth } from '../hooks/useAuth';

import { AppRoutes } from './app.routes';
import { SignIn } from '../screens/SignIn';

export function Routes(){
    const { user } = userAuth()
    return(
        <NavigationContainer>
            { user.name ? <AppRoutes/> : <SignIn/> } 
        </NavigationContainer>
    )
}

