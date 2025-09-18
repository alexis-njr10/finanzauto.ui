import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const CustomToast = ({ text1, text2, hide, props }) => {
  const {
    type = 'info',
    theme = 'light',
    buttonText = 'Ok',
    onPressButton,
  } = props;

  const getStyleByType = (type) => {
    switch (type) {
      case 'success':
        return { icon: 'check', color: '#4CAF50' };
      case 'error':
        return { icon: 'error-outline', color: '#F44336' };
      case 'info':
        return { icon: 'info-outline', color: '#2196F3' };
      case 'warn':
        return { icon: 'warning-amber', color: '#FF9800' };
      default:
        return { icon: 'star', color: '#673AB7' };
    }
  };

  const { icon, color } = getStyleByType(type);
  const isDark = theme === 'dark';
  const backgroundColor = isDark ? '#000' : '#fff';
  const textColor = isDark ? '#fff' : '#000';

  return (
    <View style={styles.wrapper}>
      <View style={[styles.diamondContainer, { backgroundColor: color }]}>
        <View style={styles.iconWrapper}>
          <Icon name={icon} size={30} color="#fff" />
        </View>
      </View>

      <View style={[styles.toastContainer, { backgroundColor }]}>
        <Text style={[styles.title, { color: textColor }]}>{text1 ?? 'Alerta'}</Text>
        {text2 && (
          <Text style={[styles.message, { color: textColor }]}>{text2}</Text>
        )}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: color }]}
          onPress={onPressButton || hide}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

CustomToast.propTypes = {
  text1: PropTypes.string,
  text2: PropTypes.string,
  hide: PropTypes.func,
  props: PropTypes.shape({
    type: PropTypes.oneOf(['success', 'error', 'info', 'warn']),
    theme: PropTypes.oneOf(['light', 'dark']),
    buttonText: PropTypes.string,
    onPressButton: PropTypes.func,
  }),
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
  diamondContainer: {
    width: 56,
    height: 56,
    borderRadius: 8,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    top: -28,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    transform: [{ rotate: '-45deg' }],
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  toastContainer: {
    width: width * 0.7,
    minHeight: 160,
    borderRadius: 20,
    paddingTop: 48,
    paddingBottom: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    textTransform: 'capitalize',
    textAlign: 'center',
    fontFamily: 'Neo Sans Std',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Neo Sans Std',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    fontFamily: 'Neo Sans Std',
  },
});

export default CustomToast;