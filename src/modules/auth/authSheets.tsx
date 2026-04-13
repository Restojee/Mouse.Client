import React, { Suspense } from "react";
import { createSheet } from "@/ui/Sheet/core/createSheet";

const LazyLogin = React.lazy(() =>
  import("@/modules/auth/containers/login/Login/Login").then((m) => ({ default: m.Login })),
);

const LazyRegister = React.lazy(() =>
  import("@/modules/auth/containers/register/Register").then((m) => ({ default: m.Register })),
);

const LoginSheetContent = () => (
  <Suspense fallback={null}>
    <LazyLogin />
  </Suspense>
);

const RegisterSheetContent = () => (
  <Suspense fallback={null}>
    <LazyRegister />
  </Suspense>
);

export const loginSheet = createSheet(LoginSheetContent, {
  withoutTitle: true,
  withoutButtons: true,
  width: 350,
});

export const registerSheet = createSheet(RegisterSheetContent, {
  withoutTitle: true,
  withoutButtons: true,
  width: 300,
});
