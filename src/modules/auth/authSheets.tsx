import React, { Suspense } from "react";
import { createSheet } from "@/ui/Sheet/core/createSheet";
import { SheetKind } from "@/ui/Sheet/core/sheetKind";
import { SheetComponentProps } from "@/ui/Sheet/core/createSheet";

const LazyLogin = React.lazy(() =>
  import("@/modules/auth/containers/login/Login/Login").then((m) => ({ default: m.Login })),
);

const LazyRegister = React.lazy(() =>
  import("@/modules/auth/containers/register/Register").then((m) => ({ default: m.Register })),
);

const LazyPrivacyPolicy = React.lazy(() =>
  import("@/modules/auth/containers/privacy-policy/PrivacyPolicy").then((m) => ({ default: m.PrivacyPolicy })),
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

const PrivacyPolicySheetContent = (props: SheetComponentProps<void>) => (
  <Suspense fallback={null}>
    <LazyPrivacyPolicy {...props} />
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
  width: 360,
});

export const privacyPolicySheet = createSheet(PrivacyPolicySheetContent, SheetKind.PrivacyPolicy, {
  title: "Политика конфиденциальности",
  withoutButtons: true,
  width: 640,
  height: "80dvh",
});
