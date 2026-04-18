import { MapsLayout } from "@/layout/maps/MapsLayout";
import { DEFAULT_MAPS_SEO } from "@/modules/map/containers/map-view-modal/mapSeoTexts";
import { MetaTags } from "@/ui/MetaTags/MetaTags";
import { VisuallyHidden } from "@/ui/VisuallyHidden/VisuallyHidden";
import { ReactElement } from "react";
import { NextPageWithLayout } from "@/pages/_app";

const MapsIndexPage: NextPageWithLayout = () => {
  return (
    <>
      <MetaTags
        title={DEFAULT_MAPS_SEO.title}
        description={DEFAULT_MAPS_SEO.description}
        keywords={DEFAULT_MAPS_SEO.keywords}
        url={"https://onlyplanks.ru/maps"}
      />
      <VisuallyHidden as={"h1"}>Прохождения карт Transformice</VisuallyHidden>
    </>
  );
};

MapsIndexPage.getLayout = (page: ReactElement) => <MapsLayout>{page}</MapsLayout>;

export default MapsIndexPage;
