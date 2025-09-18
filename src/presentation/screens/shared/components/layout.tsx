
import React from 'react';
import InternetBannerScreen from './InternetBanner';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNetworkStatus } from '@/presentation/hooks/useNetworkStatus';
import { useNavigation, DrawerActions, NavigationProp } from '@react-navigation/native';
import { SafeAreaView, StatusBar, View, Image, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';


export interface LayoutProps {
  title: string;
  children: React.ReactNode;
  padding?: number;
  onBackPress?: () => void;
  showFab?: boolean;
  fabIcon?: keyof typeof MaterialIcons.glyphMap;
  onFabPress?: () => void;
}

const Layout: React.FC<LayoutProps> = ({
	title,
	children,
	padding = 20,
	onBackPress,
	showFab = true,
	fabIcon = 'add',
	onFabPress,
}) => {
	const navigation = useNavigation<NavigationProp<any>>();
	const { isConnected, justConnected } = useNetworkStatus();

	return (
		<LinearGradient
			colors={['#A2D033', '#166D6B']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
			style={{ flex: 1 }}
		>
			<SafeAreaView style={styles.safeArea}>
				<StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

				{!isConnected && <InternetBannerScreen type="offline" />}
				{justConnected && <InternetBannerScreen type="online" />}

				<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} nestedScrollEnabled={true} removeClippedSubviews={false} keyboardShouldPersistTaps='handled'>
					{/* Encabezado */}
					<LinearGradient
						colors={['#A2D033', '#166D6B']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
					>
						<View style={styles.headerContainer}>
							<Text style={styles.logoText}>Finanzauto</Text>
							<TouchableOpacity disabled onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} style={styles.menuButton}>
								<MaterialIcons name='menu' size={30} color='#fff' />
							</TouchableOpacity>
						</View>
					</LinearGradient>

					{/* Navegación */}
					<View style={styles.navegationContainer}>
						<View style={styles.navContent}>
							{(onBackPress || navigation.canGoBack()) && (
								<TouchableOpacity
									style={styles.backButton}
									onPress={() => {
										if (onBackPress) {
											onBackPress();
										} else if (navigation.canGoBack()) {
											navigation.goBack();
										}
									}}
								>
									<MaterialIcons name="arrow-back" size={32} color="#A2D033" />
								</TouchableOpacity>
							)}
							<Text style={styles.title}>{title}</Text>
						</View>
						<View style={styles.separator} />
					</View>

					{/* Contenido */}
					<View style={[styles.contentContainer, { padding }]}>{children}</View>

				</ScrollView>
				{/* FAB y notch perfectamente centrados y pegados al borde superior de la barra */}
				<View pointerEvents="box-none" style={styles.fabNotchContainer}>
					<View style={styles.fabHalfCircle} />
					{showFab && (
						<TouchableOpacity style={styles.fab} onPress={onFabPress}>
							<MaterialIcons name={fabIcon} size={30} color="#fff" />
						</TouchableOpacity>
					)}
				</View>

				{/* Bottom Navigation */}
				<View style={styles.bottomNav}>
					<TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UsersList')}>
						<MaterialIcons name="home" size={24} color="#166D6B" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.navItem}>
						<MaterialIcons name="search" size={24} color="#757575" />
					</TouchableOpacity>
					<View style={styles.fabPlaceholder} />
					<TouchableOpacity style={styles.navItem}>
						<MaterialIcons name="notifications" size={24} color="#757575" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.navItem}>
						<MaterialIcons name="settings" size={24} color="#757575" />
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		paddingTop: StatusBar.currentHeight || 0,
	},
	scrollContainer: {
		flexGrow: 1,
		backgroundColor: '#fff',
		paddingBottom: 20,
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 5,
		backgroundColor: 'transparent',
		paddingTop: 10,
	},
	navegationContainer: {
		backgroundColor: '#FFF',
		padding: 16,
	},
	navContent: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	backButton: {
		marginRight: 10,
	},
	backIcon: {
		width: 32,
		height: 32,
		flexShrink: 0,
	},
	title: {
		color: '#A2D033',
		fontFamily: 'Neo Sans Std',
		fontSize: 24,
		fontStyle: 'normal',
		fontWeight: '700',
		lineHeight: 28,
		flexWrap: 'wrap',
		flexShrink: 1,
	},
	separator: {
		height: 1,
		backgroundColor: '#D3D3D3',
		width: '100%',
		marginTop: 8,
	},
	logoText: {
		fontWeight: 'bold',
		fontSize: 32,
		color: '#FFFFFF',
		fontFamily: 'Neo Sans Std',
	},
	menuButton: {
		padding: 8,
	},
	contentContainer: {
		flex: 1,
		backgroundColor: '#fff',
	},
	fabNotchContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		height: 60,
		alignItems: 'center',
		justifyContent: 'flex-end',
		zIndex: 20,
		pointerEvents: 'box-none',
	},
	fabHalfCircle: {
		position: 'absolute',
		bottom: 28,
		left: '50%',
		marginLeft: -54,
		width: 108,
		height: 54,
		backgroundColor: '#F9FBFB',
		borderBottomLeftRadius: 54,
		borderBottomRightRadius: 54,
		zIndex: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 6,
		elevation: 2,
	},
	fab: {
		position: 'absolute',
		bottom: 45,
		left: '50%',
		marginLeft: -35,
		backgroundColor: '#A2D033',
		width: 70,
		height: 70,
		borderRadius: 35,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 6,
		zIndex: 11,
	},
	bottomNav: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderTopColor: '#e0e0e0',
		paddingVertical: 10,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
	},
	navItem: {
		flex: 1,
		alignItems: 'center',
	},
	fabPlaceholder: {
		width: 60,
		height: 60,
	},
});

export default Layout;
