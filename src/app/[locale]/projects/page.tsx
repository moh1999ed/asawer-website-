import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectsGrid from '@/components/ProjectsGrid';

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('projects');

  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 text-center">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            {locale === 'ar' 
              ? 'استكشف جميع مشاريعنا العقارية المتميزة'
              : 'Explore all our distinguished real estate projects'}
          </p>
        </div>
        <ProjectsGrid locale={locale} />
      </div>
      <Footer locale={locale} />
    </div>
  );
}

