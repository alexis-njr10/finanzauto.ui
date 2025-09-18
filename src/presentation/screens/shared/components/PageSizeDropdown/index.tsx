import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

interface PageSizeDropdownProps {
  value: number;
  options?: number[];
  onChange: (value: number) => void;
  width?: number;
  height?: number;
  fontSize?: number;
}

const DEFAULT_OPTIONS = [5, 10, 20, 50];

const PageSizeDropdown: React.FC<PageSizeDropdownProps> = ({
  value,
  options = DEFAULT_OPTIONS,
  onChange,
  width = 48,
  height = 26,
  fontSize = 13,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.selectBox,
          { width, height, flexDirection: 'row', alignItems: 'center' }
        ]}
        activeOpacity={0.7}
        onPress={() => setOpen(true)}
      >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{
            flex: 1,
            marginLeft: 10,
            fontSize: 16,
            color: '#424242',
            backgroundColor: 'transparent',
            borderWidth: 0,
            height,
            paddingTop: 0,
            paddingBottom: 0,
            textAlignVertical: 'center',
            includeFontPadding: false,
            textAlign: 'left',
          }}>{value}</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-down" size={fontSize + 4} color="#A1A2A1" />
      </TouchableOpacity>
      <Modal visible={open} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}>
          <View style={{ backgroundColor: "#fff", width: "90%", padding: 20, borderRadius: 10, maxHeight: "80%" }}>
            <FlatList
              data={options}
              keyExtractor={item => String(item)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ paddingVertical: 12, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#eee' }}
                  onPress={() => {
                    onChange(item);
                    setOpen(false);
                  }}
                >
                  <Text style={{ fontSize, color: '#222', textAlign: 'center' }}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={{ marginTop: 12, alignSelf: 'flex-end', padding: 8 }}
              onPress={() => setOpen(false)}
            >
              <Text style={{ color: '#A1A2A1', fontWeight: 'bold', fontSize: 15 }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#A1A2A1',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    elevation: 4,
    minWidth: 60,
    maxWidth: 120,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default PageSizeDropdown;
