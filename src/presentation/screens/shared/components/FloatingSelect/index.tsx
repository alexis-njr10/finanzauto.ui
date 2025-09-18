import React, { useState, ReactNode } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  TextInput,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

interface FloatingSelectProps {
  label: string | number;
  labelStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
  iconName?: string;
  value: string;
  options: any[];
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  isValid?: boolean;
  inputGroupStyle?: StyleProp<ViewStyle>;
  editable?: boolean;
  valueKey?: string;
  displayKey?: string;
}

const FloatingSelect: React.FC<FloatingSelectProps> = ({
  label,
  labelStyle,
  icon,
  iconName,
  value = "",
  options,
  onChange,
  onBlur,
  error,
  isValid,
  inputGroupStyle,
  editable = true,
  valueKey = "label",
  displayKey = "label",
}) => {
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState("");
  const selectedOption = options.find((opt) => opt[valueKey] === value);

  return (
    <View style={{ position: "relative", justifyContent: "center" }}>
      {(isFocused || value) ? (
        <View style={styles.floatingLabelCutWrapper}>
          <View style={styles.floatingLabelCutBg} />
          <Text
            style={[
              styles.floatingLabel,
              { fontWeight: "normal" },
              error ? { color: "#E53935" } : value ? { color: "#A2D033" } : null,
              labelStyle,
            ]}
          >
            {(typeof label === "string" || typeof label === "number") ? String(label) : ""}
          </Text>
        </View>
      ) : null}

      <TouchableOpacity
        activeOpacity={editable ? 0.7 : 1}
        onPress={() => {
          if (editable) {
            setOpen(true);
            setIsFocused(true);
          }
        }}
        style={[inputGroupStyle, { flexDirection: "row", alignItems: "center", height: 50 }]}
      >
        {/* Icono a la izquierda */}
        {typeof icon === "string" || typeof icon === "number" ? (
          <Text>{String(icon)}</Text>
        ) : (
          icon
        )}

        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", height: 50 }}>
          <Text
            style={[
              styles.selectText,
              { textAlignVertical: 'center', includeFontPadding: false },
              (!isFocused && !value) ? { fontWeight: 'normal', color: '#A1A2A1' } : null
            ]}
          >
            {(selectedOption && (typeof selectedOption[displayKey] === 'string' || typeof selectedOption[displayKey] === 'number'))
              ? String(selectedOption[displayKey])
              : (!isFocused && !value ? (typeof label === 'string' || typeof label === 'number' ? String(label) : '') : '')}
          </Text>
        </View>

        {/* Icono a la derecha según estado */}
        {error ? (
          <MaterialIcons name="cancel" size={22} color="#E53935" style={{ marginLeft: 6 }} />
        ) : value ? (
          <MaterialIcons name="check-circle" size={22} color="#A2D033" style={{ marginLeft: 6 }} />
        ) : (
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#A1A2A1" style={{ marginLeft: 6 }} />
        )}
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="slide">
        <View
          style={[
            styles.modalOverlay,
            { backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
          ]}
        >
          <View style={[styles.modalContent, { width: "90%", padding: 20, borderRadius: 10, maxHeight: "80%" }]}>
            <TextInput
              placeholder={`Buscar ${
                typeof label === "string" || typeof label === "number" ? String(label).toLowerCase() : ""
              }...`}
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
            />
            <FlatList
              data={options.filter((option) => {
                const text =
                  option && option[displayKey] !== undefined && option[displayKey] !== null
                    ? String(option[displayKey])
                    : "";
                const normalized = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                const normalizedSearch = (search || "")
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase();
                return normalized.includes(normalizedSearch);
              })}
              keyExtractor={(item, idx) => idx.toString()}
              keyboardShouldPersistTaps="handled"
              style={styles.list}
              contentContainerStyle={{ flexGrow: 1 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => {
                    onChange && onChange(item[valueKey]);
                    setOpen(false);
                    setIsFocused(false);
                    setSearch("");
                  }}
                >
                  <Text style={styles.optionText}>
                    {item && item[displayKey] !== undefined && item[displayKey] !== null
                      ? String(item[displayKey])
                      : ""}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {
                setOpen(false);
                setIsFocused(false);
                onBlur && onBlur();
              }}
            >
              <Text style={styles.closeBtnText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>  
    </View>
  );
};

export default FloatingSelect;
