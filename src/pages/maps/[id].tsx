import { mapsApi } from "@/api/mapsApi";
import { MapsLayout } from "@/layout/maps/MapsLayout";
import { MapJsonLd } from "@/modules/map/containers/map-view-modal/MapJsonLd";
import { MapsByIdController } from "@/modules/map/containers/map-view-modal/MapsByIdController";
import {
  buildMapSeoDescription,
  buildAbsoluteSeoImageUrl,
  buildMapSeoKeywords,
  buildMapSeoTitle,
  buildMapSeoUrl,
  DEFAULT_MAPS_SEO,
} from "@/modules/map/containers/map-view-modal/mapSeoTexts";
import { NextPageWithLayout } from "@/pages/_app";
import { MetaTags } from "@/ui/MetaTags/MetaTags";
import { VisuallyHidden } from "@/ui/VisuallyHidden/VisuallyHidden";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";

type MapMeta = {
  id: number;
  code: string;
  description: string;
  image: string | null;
  authorName: string | null;
  tags: string[];
  createdUtcDate: string | null;
  modifiedUtcDate: string | null;
  commentsCount: number;
  completedCount: number;
  favoritesCount: number;
  visitsCount: number;
};

type MapsByIdPageProps = {
  initialMapMeta: MapMeta | null;
  levelId: number | null;
};

const MapsByIdPage: NextPageWithLayout<MapsByIdPageProps> = ({ initialMapMeta, levelId }) => {
  if (!initialMapMeta) {
    return (
      <>
        <MetaTags
          title={DEFAULT_MAPS_SEO.title}
          description={DEFAULT_MAPS_SEO.description}
          keywords={DEFAULT_MAPS_SEO.keywords}
          url={levelId ? buildMapSeoUrl(levelId) : undefined}
        />
        <VisuallyHidden as={"h1"}>Прохождения карт Transformice</VisuallyHidden>
        <MapsByIdController />
      </>
    );
  }

  const seoInput = {
    code: initialMapMeta.code,
    authorName: initialMapMeta.authorName,
    description: initialMapMeta.description,
    tags: initialMapMeta.tags,
  };
  const description = buildMapSeoDescription(seoInput);
  const url = buildMapSeoUrl(initialMapMeta.id);
  const image = buildAbsoluteSeoImageUrl(initialMapMeta.image);

  return (
    <>
      <MetaTags
        title={buildMapSeoTitle(seoInput)}
        description={description}
        keywords={buildMapSeoKeywords(seoInput)}
        image={image}
        url={url}
        type={"article"}
      />
      <MapJsonLd
        id={initialMapMeta.id}
        code={initialMapMeta.code}
        description={description}
        image={image}
        url={url}
        authorName={initialMapMeta.authorName}
        tags={initialMapMeta.tags}
        createdUtcDate={initialMapMeta.createdUtcDate}
        modifiedUtcDate={initialMapMeta.modifiedUtcDate}
        commentsCount={initialMapMeta.commentsCount}
        completedCount={initialMapMeta.completedCount}
        favoritesCount={initialMapMeta.favoritesCount}
        visitsCount={initialMapMeta.visitsCount}
      />
      <article>
        <VisuallyHidden as={"h1"}>Прохождение карты {initialMapMeta.code} в Transformice</VisuallyHidden>
      </article>
      <MapsByIdController />
    </>
  );
};

MapsByIdPage.getLayout = (page: ReactElement) => <MapsLayout>{page}</MapsLayout>;

export const getServerSideProps: GetServerSideProps<MapsByIdPageProps> = async (ctx) => {
  const raw = ctx.params?.id;
  const levelId = Number(Array.isArray(raw) ? raw[0] : raw);

  if (!levelId || Number.isNaN(levelId)) {
    return { notFound: true };
  }

  try {
    const m = await mapsApi.getMapsById({ levelId });
    if (m?.id) {
      return {
        props: {
          levelId,
          initialMapMeta: {
            id: m.id,
            code: m.name ?? `#${m.id}`,
            description: m.description ?? "",
            image: m.image?.variants.display ?? null,
            authorName: m.user?.username ?? null,
            tags: m.tags?.map((t) => t.name).filter(Boolean) ?? [],
            createdUtcDate: m.createdUtcDate,
            modifiedUtcDate: m.modifiedUtcDate,
            commentsCount: m.commentsCount,
            completedCount: m.completedCount,
            favoritesCount: m.favoritesCount,
            visitsCount: m.visitsCount,
          },
        },
      };
    }
  } catch {
    // fall-through with null meta
  }

  return { props: { initialMapMeta: null, levelId } };
};

export default MapsByIdPage;
