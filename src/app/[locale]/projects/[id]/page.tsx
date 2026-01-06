import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectDetails from '@/components/ProjectDetails';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const t = await getTranslations();

  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} />
      <div className="pt-32">
        <ProjectDetails projectId={id} locale={locale} />
      </div>
      <Footer locale={locale} />
    </div>
  );
}

