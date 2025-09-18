import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, DrawerActions, NavigationProp } from '@react-navigation/native';

interface DrawerContentProps { }

const DrawerContent: React.FC<DrawerContentProps> = () => {
	const navigation = useNavigation<NavigationProp<any>>();

	return (
		<View style={styles.container}>
			<View style={styles.exitContainer}>
				<TouchableOpacity style={styles.exit} onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
					<MaterialIcons name="close" size={32} color="#253746" />
				</TouchableOpacity>
			</View>

			<View style={styles.version}>
				<Text style={styles.versionText}>
					Versión {Constants.expoConfig?.version ?? Constants.manifest.version}
				</Text>
			</View>
		</View>
	);
};

export default DrawerContent;
