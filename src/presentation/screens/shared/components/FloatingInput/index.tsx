import React from 'react';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput, View, Text } from 'react-native';
import type { KeyboardTypeOptions } from 'react-native';

interface FloatingInputProps {
  labelStyle?: object;
  icon?: React.ReactNode;
  label: string;
  value: string;
  onChange?: (text: string) => void;
  onBlur?: () => void;
  error?: boolean;
  keyboardType?: KeyboardTypeOptions;
  inputGroupStyle?: object;
  editable?: boolean;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  icon,
  label,
  labelStyle,
  value,
  onChange,
  onBlur,
  error,
  keyboardType = 'default',
  inputGroupStyle,
  editable = true,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{ position: 'relative', justifyContent: 'center' }}>
      {(isFocused || value) && (
        <View style={styles.floatingLabelCutWrapper}>
          <View style={styles.floatingLabelCutBg} />
          <Text style={[
            styles.floatingLabel,
            error ? styles.floatingLabelInvalid : value ? styles.floatingLabelValid : null,
            labelStyle,
          ]}>{label}</Text>
        </View>
      )}
      <View style={inputGroupStyle}>
        {icon}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={onChange ? onChange : undefined}
            onBlur={() => { setIsFocused(false); onBlur && onBlur(); }}
            onFocus={() => { setIsFocused(true); }}
            placeholder={isFocused || value ? '' : label}
            placeholderTextColor="#A1A2A1"
            keyboardType={keyboardType}
            editable={editable}
          />
          {error ? (
            <MaterialIcons name="cancel" size={22} color="#E53935" style={{ marginLeft: 6 }} />
          ) : value ? (
            <MaterialIcons name="check-circle" size={22} color="#A2D033" style={{ marginLeft: 6 }} />
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default FloatingInput;
