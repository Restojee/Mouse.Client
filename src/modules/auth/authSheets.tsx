import React, { Suspense } from "react";
import { createSheet } from "@/ui/Sheet/core/createSheet";
import { SheetKind } from "@/ui/Sheet/core/sheetKind";

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

export const loginSheet = createSheet(LoginSheetContent, SheetKind.Login, {
  withoutTitle: true,
  withoutButtons: true,
  width: 350,
});

export const registerSheet = createSheet(RegisterSheetContent, SheetKind.Register, {
  withoutTitle: true,
  withoutButtons: true,
  width: 300,
});
