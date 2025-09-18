import {
  createNavigationContainerRef,
  StackActions,
  CommonActions,
  NavigationAction,
} from '@react-navigation/native';

export type RootStackParamList = {
  Users: undefined;
  UsersList: undefined;
  UsersManage: undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// Navegar a una ruta sin parámetros
export function navigate(name: keyof RootStackParamList): void;
// Navegar a una ruta con parámetros
export function navigate<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params: RootStackParamList[RouteName]
): void;
export function navigate<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName]
) {
  if (navigationRef.isReady()) {
    if (params !== undefined) {
      (navigationRef as any).navigate(name, params);
    } else {
      (navigationRef as any).navigate(name);
    }
  }
}

// Reemplazar la pantalla actual sin parámetros
export function replace(name: keyof RootStackParamList): void;
// Reemplazar la pantalla actual con parámetros
export function replace<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params: RootStackParamList[RouteName]
): void;
export function replace<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName]
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name as any, params));
  }
}

// Push sin parámetros
export function push(name: keyof RootStackParamList): void;
// Push con parámetros
export function push<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params: RootStackParamList[RouteName]
): void;
export function push<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName]
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name as any, params));
  }
}

// Reset sin parámetros
export function resetTo(name: keyof RootStackParamList): void;
// Reset con parámetros
export function resetTo<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params: RootStackParamList[RouteName]
): void;
export function resetTo<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName]
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: name as any, params }],
      })
    );
  }
}

// Ir hacia atrás
export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

// Eliminar la pantalla actual del stack
export function pop(count: number = 1) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(count));
  }
}

// Volver al tope del stack
export function popToTop() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop());
  }
}

// Verifica si se puede ir atrás
export function canGoBack(): boolean {
  return navigationRef.isReady() && navigationRef.canGoBack();
}

// Obtener la ruta actual
export function getCurrentRoute() {
  return navigationRef.getCurrentRoute();
}

// Ejecutar una acción personalizada
export function dispatch(action: NavigationAction) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(action);
  }
}

export function goToLogin() {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [
        {
          name: 'Login',
        },
      ],
    });
  }
}