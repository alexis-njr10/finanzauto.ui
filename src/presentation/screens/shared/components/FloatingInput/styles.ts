import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  floatingLabelCutWrapper: {
    position: 'absolute',
    top: -14,
    left: 38,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 18,
  },
  floatingLabelCutBg: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F7F7F7',
    zIndex: 9,
    borderRadius: 8,
    height: 18,
    width: '100%',
  },
  floatingLabel: {
    fontSize: 13,
    color: '#A1A2A1',
    backgroundColor: 'transparent',
    paddingHorizontal: 8,
    height: 18,
    textAlignVertical: 'center',
    lineHeight: 18,
    zIndex: 10,
  },
  floatingLabelInvalid: {
    color: '#E53935',
  },
  floatingLabelValid: {
    color: '#A2D033',
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#424242',
    backgroundColor: 'transparent',
    borderWidth: 0,
    height: 50,
    paddingTop: 0,
    paddingBottom: 0,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});