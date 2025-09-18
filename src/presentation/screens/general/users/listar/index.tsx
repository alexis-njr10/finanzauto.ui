import React, { useState } from "react";
import PageSizeDropdown from '@/presentation/screens/shared/components/PageSizeDropdown';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View, Text, Image, Alert, TouchableOpacity } from "react-native";
import { useUsersStore } from "../users.store";
import { MaterialIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import Layout from "@/presentation/screens/shared/components/layout";
import { checkConnection } from "@/presentation/utils/network";
import { loading$ } from "@/presentation/plugins/loading";
import { showToast } from "@/infrastructure/services/alert.service";
import { styles } from "./styles";


const UserCard = ({ user, onDelete }) => {
  const navigation = useNavigation<NavigationProp<any>>();

  const goTo = async (user) => {
    navigation.navigate('UsersManage', { user: user, editing: true, viewOnly: true });
  };

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.topSection}>
        <View style={styles.infoSection}>
          <Text style={styles.nameText}>{user.firstName + ' ' + user.lastName}</Text>
          <Text style={styles.idText}>ID: {user.id}</Text>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.detailsButton} onPress={() => goTo(user)}>
          <Text style={styles.detailsText}>Ver detalle</Text>
          <Text style={styles.detailsArrow}><MaterialIcons name="chevron-right" size={24} color="#00796b" /></Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        {user.picture ? (
          <Image
            source={{ uri: user.picture }}
            style={styles.imagePlaceholder}
          />
        ) : (
          <View style={[styles.imagePlaceholder, { justifyContent: 'center', alignItems: 'center' }]}>
            <MaterialIcons name="person" size={60} color="#9e9e9e" />
          </View>
        )}
      </View>
    </View>
  );
};

const UsersListScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { data, get, deleteUser } = useUsersStore();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const limitOptions = [5, 10, 20, 50];

  const fetchData = (page: number, limit: number) => {
    checkConnection(async (isOnline) => {
      if (isOnline) {
        loading$.next(true);
        try {
          await get(page, limit);
        } finally {
          loading$.next(false);
        }
      }
    });
  };

  const goTo = () => {
    navigation.navigate('UsersManage', { user: null, editing: false, viewOnly: false });
  };

  const handleLimitChange = (value) => {
    setLimit(value);
    setPage(0);
    fetchData(0, value);
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
      fetchData(page - 1, limit);
    }
  };

  const handleNextPage = () => {
    if ((page + 1) * limit < (data?.total ?? 0)) {
      setPage(page + 1);
      fetchData(page + 1, limit);
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(page, limit);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const onDelete = (id: string) => {
    checkConnection(async (isOnline) => {
      if (isOnline) {
        loading$.next(true);
        var result;
        try {

          result = await deleteUser(id);
        } finally {
          if (result?.succeeded) {
            showToast(result.message?.text || 'Usuario Eliminado correctamente', 'success');
            await fetchData(0, limit);
          } else {
            showToast(result?.message?.text || 'Error al eliminar el usuario', 'error');
          }
          loading$.next(false);
        }
      }
    });
  };

  const handleDeleteUser = (user) => {
    Alert.alert(
      'Eliminar usuario',
      `¿Seguro que deseas eliminar a ${user.firstName} ${user.lastName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar', style: 'destructive', onPress: async () => {
            onDelete(user.id);
          }
        },
      ]
    );
  };

  return (
    <Layout title="Usuarios" onFabPress={goTo}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, marginLeft: 15 }}>
        <Text style={styles.title}>Consulta y Registro{"\n"}de Usuarios</Text>
      </View>
      {/* Paginador */}
      <SwipeListView
        data={data?.data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <UserCard user={item} onDelete={handleDeleteUser} />
        )}
        renderHiddenItem={({ item }) => (
          <View style={[styles.deleteAction, { position: 'relative', borderRadius: 20 }]}>
            <TouchableOpacity
              onPress={() => handleDeleteUser(item)}
              style={[styles.deleteButton, { position: 'absolute', right: 4, bottom: 4, zIndex: 2 }]}
            >
              <MaterialIcons name="delete" size={40} color="#D32F2F" />
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-75}
        disableRightSwipe
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        <TouchableOpacity onPress={handlePrevPage} disabled={page === 0} style={{ marginRight: 16 }}>
          <Text style={{ color: page === 0 ? '#ccc' : '#166D6B', fontWeight: 'bold' }}>Anterior</Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', color: '#166D6B', marginHorizontal: 8 }}>Página {page + 1}</Text>
        <TouchableOpacity onPress={handleNextPage} disabled={(page + 1) * limit >= (data?.total ?? 0)} style={{ marginLeft: 16 }}>
          <Text style={{ color: (page + 1) * limit >= (data?.total ?? 0) ? '#ccc' : '#166D6B', fontWeight: 'bold' }}>Siguiente</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', marginTop: 16, marginBottom: 100 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 6 }}>Usuarios por página:</Text>
        <PageSizeDropdown
          value={limit}
          options={limitOptions}
          onChange={handleLimitChange}
          width={70}
          height={30}
          fontSize={12}
        />
      </View>
    </Layout>
  );
};

export default UsersListScreen;
