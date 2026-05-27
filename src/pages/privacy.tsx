import { MapsLayout } from "@/layout/maps/MapsLayout";
import { PrivacyPolicyController } from "@/modules/auth/containers/privacy-policy/PrivacyPolicyController";
import { NextPageWithLayout } from "@/pages/_app";
import { MetaTags } from "@/ui/MetaTags/MetaTags";
import { VisuallyHidden } from "@/ui/VisuallyHidden/VisuallyHidden";
import { ReactElement } from "react";

const PrivacyPage: NextPageWithLayout = () => (
  <>
    <MetaTags
      title="Политика конфиденциальности OnlyPlanks"
      description="Политика обработки персональных данных пользователей OnlyPlanks."
      keywords={["onlyplanks", "политика конфиденциальности", "персональные данные"]}
      url="https://onlyplanks.ru/privacy"
    />
    <VisuallyHidden as={"h1"}>Политика конфиденциальности OnlyPlanks</VisuallyHidden>
    <PrivacyPolicyController />
  </>
);

PrivacyPage.getLayout = (page: ReactElement) => <MapsLayout>{page}</MapsLayout>;

export default PrivacyPage;
