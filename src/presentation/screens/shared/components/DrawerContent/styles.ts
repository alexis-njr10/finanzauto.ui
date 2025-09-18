import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
		backgroundColor: '#E8EAED',
		alignItems: 'center',
		paddingVertical: 70,
	},
	exitContainer: {
		width: '100%',
		alignItems: 'flex-end',
	},
	exit: {
		width: 20,
		height: 20,
		marginRight: 40,
	},
	version: {
		position: 'absolute',
		bottom: 10,
		left: 0,
		right: 0,
		alignItems: 'center'
	},
	versionText: {
		color: '#9B9B9B', 
		fontSize: 13
	}
});
