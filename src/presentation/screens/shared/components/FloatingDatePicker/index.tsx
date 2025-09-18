import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';

interface FloatingDatePickerProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  error?: boolean;
  editable?: boolean;
  labelStyle?: object;
  inputGroupStyle?: object;
}

export const FloatingDatePicker: React.FC<FloatingDatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  editable = true,
  labelStyle,
  inputGroupStyle,
}) => {
  const [showPicker, setShowPicker] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const dateObj = value ? new Date(value) : new Date();
  const isValid = value && !error;
  const formattedDate = value ? value.split('T')[0] : '';
  let labelDynamicStyle = styles.floatingLabel;
  if (error) labelDynamicStyle = styles.floatingLabelError;
  else if (isValid) labelDynamicStyle = styles.floatingLabelActive;

  return (
    <View style={{ position: 'relative', justifyContent: 'center' }}>
      {(isFocused || value) && (
        <View style={styles.floatingLabelCutWrapper}>
          <View style={[styles.floatingLabelCutBg, { minWidth: 140, paddingHorizontal: 12 }]} />
          <Text style={[labelDynamicStyle, labelStyle]}>{label}</Text>
        </View>
      )}
      <TouchableOpacity
        activeOpacity={editable ? 0.7 : 1}
        onPress={() => { if (editable) { setShowPicker(true); setIsFocused(true); } }}
        style={[inputGroupStyle, { flexDirection: 'row', alignItems: 'center' }]}
      >
        <MaterialCommunityIcons name="calendar" size={24} color="#A1A2A1" />
        <View style={{ flex: 1 }}>
          <Text style={[styles.dateText, (!isFocused && !value) ? { color: '#A1A2A1', fontWeight: 'normal' } : null, { marginLeft: 12 }]}>
            {formattedDate ? formattedDate : label}
          </Text>
        </View>
        {error ? (
          <MaterialCommunityIcons name="close-circle" size={22} color="#E53935" style={{ marginLeft: 6 }} />
        ) : isValid ? (
          <MaterialCommunityIcons name="check-circle" size={22} color="#A2D033" style={{ marginLeft: 6 }} />
        ) : null}
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={dateObj}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            setIsFocused(false);
            if (selectedDate) {
              onChange(selectedDate.toISOString().split('T')[0]);
            }
          }}
        />
      )}
    </View>
  );
};
