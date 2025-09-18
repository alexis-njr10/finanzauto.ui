import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { ProtectedRoute } from './protected.route';
import DrawerContent from '@/presentation/screens/shared/components/DrawerContent';
import { navigationRef } from './navigationRef';

import UsersListScreen from '@/presentation/screens/general/users/listar';
import UsersManageScreen from '@/presentation/screens/general/users/manage';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const UsersStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='UsersList'>
			<Stack.Screen name='UsersList' component={UsersListScreen} />
			<Stack.Screen name='UsersManage' component={UsersManageScreen} />
		</Stack.Navigator>
	);
};

export function RootStack() {
	return (
		<SafeAreaProvider>
			<NavigationContainer ref={navigationRef}>
				<Drawer.Navigator
					initialRouteName='Users'
					screenOptions={{ headerShown: false }}
					drawerContent={(props) => {
						return <DrawerContent {...props} />;
					}}
					backBehavior='history'
				>
					<Drawer.Screen name='Users' options={{ headerShown: false }}>
						{() => (
							<ProtectedRoute>
								<UsersStackNavigator />
							</ProtectedRoute>
						)}
					</Drawer.Screen>
				</Drawer.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
