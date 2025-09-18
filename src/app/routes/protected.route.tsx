import React from "react";
import ToastManager from 'toastify-react-native';
import { loading$ } from "@/presentation/plugins/loading";
import LoadingScreen from "@/presentation/screens/shared/components/Loading";
import CustomToast from "@/presentation/screens/shared/components/customToast";

export const ProtectedRoute = ({
  children
}: {
  children: React.ReactElement;
}) => {

  const toastConfig = {
    default: (props) => <CustomToast {...props} />,
  };

  return (
    <>
      {children}
      <ToastManager config={toastConfig} />
    </>
  );
};

