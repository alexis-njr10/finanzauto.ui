import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { styles } from './styles';

interface AlertProps {
  title: string;
  subtitle?: string;
  textCancel: string;
  textAccept: string;
  onCancel?: () => void;
  onAccept?: () => void;
  isVisible: boolean;
  onClose: () => void;
}

const CustomAlert: React.FC<AlertProps> = ({
  title,
  subtitle,
  textCancel,
  textAccept,
  onCancel,
  onAccept,
  isVisible,
  onClose,
}) => {
  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.alertContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              onCancel?.();
              onClose();
            }}
          >
            <Text style={styles.cancelText}>{textCancel}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => {
              onAccept?.();
              onClose();
            }}
          >
            <Text style={styles.acceptText}>{textAccept}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomAlert;


