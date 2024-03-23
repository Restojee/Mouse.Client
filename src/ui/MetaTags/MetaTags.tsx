import Head from 'next/head';

export type MetaTagsProps = {
  title?: string,
  description?: string,
  keywords?: string[],
  viewport?: string
}

export const MetaTags = ({title, description, keywords, viewport}: MetaTagsProps) => {
  return (
    <Head>
      { title && <title>{ `${title} • OnlyPlanks`}</title> }
      { description && <meta name="description" content={ description }/> }
      { keywords && <meta name="keywords" content={ keywords.join(',') }/> }
      { viewport && <meta name="viewport" content={ viewport }/> }
    </Head>
  );
};