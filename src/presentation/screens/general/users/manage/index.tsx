import * as Yup from "yup";
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from '@/presentation/screens/shared/components/layout';
import FloatingInput from "@/presentation/screens/shared/components/FloatingInput";
import FloatingSelect from "@/presentation/screens/shared/components/FloatingSelect";
import { FloatingDatePicker } from "@/presentation/screens/shared/components/FloatingDatePicker";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { checkConnection } from "@/presentation/utils/network";
import { useUsersStore } from "../users.store";
import { loading$ } from "@/presentation/plugins/loading";
import { showAlert } from "@/infrastructure/services/alert.service";
import { styles } from "./styles";

const schema = Yup.object({
  id: Yup.string().when([], {
    is: () => {
      return false;
    },
    then: (schema) => schema.required('El ID es obligatorio'),
    otherwise: (schema) => schema,
  }),
  title: Yup.string().required('El título es obligatorio'),
  firstName: Yup.string().required('El nombre es obligatorio'),
  lastName: Yup.string().required('El apellido es obligatorio'),
  picture: Yup.string(),
  gender: Yup.string().required('El género es obligatorio'),
  email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
  dateOfBirth: Yup.string().required('La fecha de nacimiento es obligatoria'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Solo números permitidos')
    .required('El teléfono es obligatorio'),
  location: Yup.object({
    street: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    country: Yup.string(),
    timezone: Yup.string(),
  }).nullable(),
  registerDate: Yup.string().nullable(),
  updatedDate: Yup.string().nullable(),
});

type BackendErrors = {
  title?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
  dateOfBirth?: string;
  phone?: string;
};

const UsersManageScreen = () => {
  const [backendErrors, setBackendErrors] = useState<BackendErrors>({});
  const titleOptions = [
    { id: 'mr', name: 'Sr.' },
    { id: 'ms', name: 'Sra.' },
    { id: 'dr', name: 'Dr.' },
    { id: 'mrs', name: 'Mrs.' },
  ];
  const genderOptions = [
    { id: 'male', name: 'Masculino' },
    { id: 'female', name: 'Femenino' },
    { id: 'other', name: 'Otro' },
  ];
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();
  const { user, editing, viewOnly } = route.params ?? {};
  const [isEditing, setIsEditing] = useState(editing ?? false);
  const [isViewOnly, setIsViewOnly] = useState(viewOnly ?? true);
  const isFormEditable = !isViewOnly;
  const { create, update } = useUsersStore();

  let layoutTitle = 'Crear Usuario';
  if (isViewOnly && user) {
    layoutTitle = 'Ver Usuario';
  } else if (isEditing && user) {
    layoutTitle = 'Editar Usuario';
  }
  const { control, handleSubmit, formState: { errors, isValid }, reset, trigger } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: user?.id || '',
      title: user?.title || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      picture: user?.picture || '',
      gender: user?.gender || '',
      email: user?.email || '',
      dateOfBirth: user?.dateOfBirth || '',
      phone: user?.phone || '',
      location: null,
      registerDate: user?.registerDate || '',
      updatedDate: user?.updatedDate || '',
    },
    mode: 'all',
  });

  React.useEffect(() => {
    trigger();
  }, [trigger]);

  const onSubmit = (data) => {
    checkConnection(async (isOnline) => {
      if (isOnline) {
        loading$.next(true);
        var result;
        setBackendErrors({});
        try {
          if (isEditing) {
            result = await update(data);
          } else {
            result = await create(data);
          }
        } finally {
          if(result?.succeeded){
            showAlert(result.message?.text || (isEditing ? 'Usuario actualizado con éxito' : 'Usuario creado con éxito'), 'success'); 
            navigation.navigate('UsersList');
          }else {
            if(result?.data?.error === 'BODY_NOT_VALID' && result?.data?.data){
              setBackendErrors(result.data.data);
            }
            showAlert(result?.message?.text || 'Error al guardar el usuario', 'error');
          }
          loading$.next(false);
        }
      }
    });
  };

  const getInputGroupStyle = (fieldName, value) => {
    if (isViewOnly) {
      return styles.inputContainer;
    }
    if (errors[fieldName]) {
      return [styles.inputContainer, styles.inputInvalid];
    }
    if (value && !errors[fieldName]) {
      return [styles.inputContainer, styles.inputValid];
    }
    return styles.inputContainer;
  };

  return (
    <Layout title={layoutTitle} padding={0} onFabPress={() => navigation.goBack()} fabIcon={'arrow-back'}>
      <View style={styles.container}>
        <View style={styles.halfTop} />
        <View style={styles.halfBottom} />
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Información del usuario</Text>
            {isEditing && (
              <TouchableOpacity
                style={[styles.headerEditSquare, { marginRight: 12 }, !isViewOnly ? styles.headerEditSquareDisabled : null]}
                disabled={!isViewOnly}
                onPress={() => {
                  if (isViewOnly) {
                    setIsViewOnly(false);
                  }
                }}
              >
                <MaterialIcons name="edit" size={20} color={isViewOnly ? '#A2D033' : '#BDBDBD'} />
              </TouchableOpacity>
            )}
          </View>

          {/* Profile Picture Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Controller
                control={control}
                name="picture"
                render={({ field: { value, onChange } }) => (
                  <>
                    {value ? (
                      <Image
                        source={{ uri: value.startsWith('data:image') ? value : `data:image/jpeg;base64,${value}` }}
                        style={styles.imagePlaceholder}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={[styles.imagePlaceholder, { justifyContent: 'center', alignItems: 'center' }]}>
                        <MaterialIcons name="person" size={60} color="#9e9e9e" />
                      </View>
                    )}
                    {isFormEditable && (
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={async () => {
                          launchImageLibrary({
                            mediaType: 'photo',
                            includeBase64: true,
                            maxWidth: 600,
                            maxHeight: 600,
                            quality: 0.7,
                          }, (response) => {
                            if (response.didCancel || response.errorCode) return;
                            const asset = response.assets && response.assets[0];
                            if (asset?.base64) {
                              onChange(`data:${asset.type || 'image/jpeg'};base64,${asset.base64}`);
                            }
                          });
                        }}
                      >
                        <View style={styles.editIconCircle}>
                          <MaterialIcons name="edit" size={20} color="#fff" />
                        </View>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              />
            </View>
          </View>

          {/* Info Fields Section */}
          <View style={styles.infoFieldsContainer}>
            <View style={styles.inputGroupWrapper}>
              <Controller
                control={control}
                name="id"
                render={({ field: { value } }) => (
                  <>
                    <FloatingInput
                      icon={<MaterialCommunityIcons name="key-variant" size={24} color="#A1A2A1" />}
                      label="ID"
                      value={value}
                      editable={false}
                      inputGroupStyle={getInputGroupStyle('id', value)}
                      error={!!errors.id}
                      labelStyle={isViewOnly ? { color: '#A1A2A1', fontWeight: 'bold' } : {}}
                    />
                    {errors.id && !isViewOnly && <Text style={styles.textError}>{errors.id.message}</Text>}
                  </>
                )}
              />
            </View>
            <View style={styles.inputGroupWrapper}>
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, value } }) => (
                  <>
                    <FloatingSelect
                      label="Título"
                      options={titleOptions}
                      value={value}
                      onChange={onChange}
                      valueKey="id"
                      displayKey="name"
                      error={!!errors.title}
                      editable={isFormEditable}
                      labelStyle={isViewOnly ? { color: '#A1A2A1', fontWeight: 'bold' } : {}}
                      inputGroupStyle={getInputGroupStyle('title', value)}
                      icon={<MaterialCommunityIcons name="account-key" size={24} color="#A1A2A1" />}
                    />
                    {(errors.title || backendErrors.title) && !isViewOnly && (
                      <Text style={styles.textError}>{errors.title?.message || backendErrors.title}</Text>
                    )}
                  </>
                )}
              />
            </View>
            <View style={styles.inputGroupWrapper}>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <FloatingInput
                      icon={<MaterialCommunityIcons name="account-details" size={24} color="#A1A2A1" />}
                      label="Nombre"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={!!errors.firstName}
                      inputGroupStyle={getInputGroupStyle('firstName', value)}
                      editable={isFormEditable}
                      labelStyle={isViewOnly ? { color: '#A1A2A1', fontWeight: 'bold' } : {}}
                    />
                    {(errors.firstName || backendErrors.firstName) && !isViewOnly && (
                      <Text style={styles.textError}>{errors.firstName?.message || backendErrors.firstName}</Text>
                    )}
                  </>
                )}
              />
            </View>
            <View style={styles.inputGroupWrapper}>
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <FloatingInput
                      icon={<MaterialCommunityIcons name="account-details" size={24} color="#A1A2A1" />}
                      label="Apellido"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={!!errors.lastName}
                      inputGroupStyle={getInputGroupStyle('lastName', value)}
                      editable={isFormEditable}
                      labelStyle={isViewOnly ? { color: '#A1A2A1', fontWeight: 'bold' } : {}}
                    />
                    {(errors.lastName || backendErrors.lastName) && !isViewOnly && (
                      <Text style={styles.textError}>{errors.lastName?.message || backendErrors.lastName}</Text>
                    )}
                  </>
                )}
              />
            </View>
            <View style={styles.inputGroupWrapper}>
              <Controller
                control={control}
                name="gender"
                render={({ field: { onChange, value } }) => (
                  <>
                    <FloatingSelect
                      label="Género"
                      options={genderOptions}
                      value={value}
                      onChange={onChange}
                      valueKey="id"
                      displayKey="name"
                      error={!!errors.gender}
                      editable={isFormEditable}
                      labelStyle={isViewOnly ? { color: '#A1A2A1', fontWeight: 'bold' } : {}}
                      inputGroupStyle={getInputGroupStyle('gender', value)}
                      icon={<MaterialCommunityIcons name="gender-male-female" size={24} color="#A1A2A1" />}
                    />
                    {(errors.gender || backendErrors.gender) && !isViewOnly && (
                      <Text style={styles.textError}>{errors.gender?.message || backendErrors.gender}</Text>
                    )}
                  </>
                )}
              />
            </View>
            <View style={styles.inputGroupWrapper}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <FloatingInput
                      icon={<MaterialCommunityIcons name="email" size={24} color="#A1A2A1" />}
                      label="Correo electrónico"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={!!errors.email}
                      inputGroupStyle={getInputGroupStyle('email', value)}
                      editable={isFormEditable}
                      labelStyle={isViewOnly ? { color: '#A1A2A1', fontWeight: 'bold' } : {}}
                    />
                    {(errors.email || backendErrors.email) && !isViewOnly && (
                      <Text style={styles.textError}>{errors.email?.message || backendErrors.email}</Text>
                    )}
                  </>
                )}
              />
            </View>
            <View style={styles.inputGroupWrapper}>
              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field: { onChange, value } }) => (
                  <>
                    <FloatingDatePicker
                      label="Fecha de nacimiento"
                      value={value}
                      onChange={onChange}
                      error={!!errors.dateOfBirth}
                      editable={isFormEditable}
                      labelStyle={isViewOnly ? { color: '#A1A2A1', fontWeight: 'bold' } : {}}
                      inputGroupStyle={getInputGroupStyle('dateOfBirth', value)}
                    />
                    {/* Solo mostrar el primer error de fecha de nacimiento */}
                    {(errors.dateOfBirth || backendErrors.dateOfBirth) && !isViewOnly && (
                      <Text style={styles.textError}>{errors.dateOfBirth?.message || backendErrors.dateOfBirth}</Text>
                    )}
                  </>
                )}
              />
            </View>
            <View style={styles.inputGroupWrapper}>
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <FloatingInput
                      icon={<MaterialCommunityIcons name="phone-outline" size={24} color="#A1A2A1" />}
                      label="Teléfono"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={!!errors.phone}
                      inputGroupStyle={getInputGroupStyle('phone', value)}
                      keyboardType="numeric"
                      editable={isFormEditable}
                      labelStyle={isViewOnly ? { color: '#A1A2A1', fontWeight: 'bold' } : {}}
                    />
                    {(errors.phone || backendErrors.phone) && !isViewOnly && (
                      <Text style={styles.textError}>{errors.phone?.message || backendErrors.phone}</Text>
                    )}
                  </>
                )}
              />
            </View>
            {/* Botones compactos en fila */}
            {!isViewOnly && (
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSubmit(onSubmit)}
                  disabled={isViewOnly}
                >
                  <MaterialIcons name="save" size={20} color="#fff" style={{ marginRight: 6 }} />
                  <Text style={styles.saveButtonText}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    if(isEditing){
                       reset();
                       setIsViewOnly(true);
                    }else {
                      navigation.goBack();
                    }
                    
                  }}
                  disabled={isViewOnly}
                >
                  <MaterialIcons name="cancel" size={20} color="#A1A2A1" style={{ marginRight: 6 }} />
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
      </View>
    </Layout>
  );
};

export default UsersManageScreen;