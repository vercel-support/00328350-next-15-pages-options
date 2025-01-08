import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/layout';
import type { Params } from 'next/dist/server/request/params';

const Page = ({
  page,
  builderLocale,
}: {
  page: {
    id: string;
    content: string;
  };
  builderLocale: string;
}) => {
  console.log({ page, builderLocale });
  
  return (
    <Layout>
      {page.content} - {builderLocale}
    </Layout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          slug: ['rpc'],
        },
      },
    ],
    fallback: 'blocking',
  };
}

export const getStaticProps = async ({
  locale = 'en',
  params,
}: {
  locale: string;
  params: Params;
}) => {
  try {
    const slug = Array.isArray(params.slug)
      ? params.slug.join('/')
      : params.slug;
    const isDefaultLocale = locale === 'en';
    const builderLocale = isDefaultLocale ? 'Default' : locale;

    console.log({ slug, locale, builderLocale });
    
    
    if (!slug) {
      return { notFound: true };
    }

    const page = {
      id: slug,
      content: `Hello /${slug}`,
    };

    return {
      props: {
        key: page?.id,
        builderLocale,
        page: page || null,
        ...(await serverSideTranslations(builderLocale || 'en', ['common'])),
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default Page;
