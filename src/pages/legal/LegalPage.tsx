import Seo from '../../components/Seo'
import ArticleLayout from '../../components/article/ArticleLayout'
import { mdxComponents } from '../../components/mdx'
import { getLegalDoc } from '../../lib/content'
import { formatDate } from '../../lib/format'
import { breadcrumbLd } from '../../lib/jsonld'
import type { MdxBody } from '../../lib/content/types'

interface LegalPageProps {
  slug: string
  Body: MdxBody
}

export default function LegalPage({ slug, Body }: LegalPageProps) {
  const doc = getLegalDoc(slug)
  if (!doc) return null

  const crumbs = [{ label: doc.title, path: doc.path }]

  return (
    <>
      <Seo
        title={doc.title}
        description={doc.description}
        path={doc.path}
        jsonLd={breadcrumbLd(crumbs)}
      />

      <ArticleLayout
        crumbs={crumbs}
        title={doc.title}
        meta={
          doc.updated && (
            <p className="text-[0.8125rem] text-tertiary">
              Stand: {formatDate(doc.updated)}
            </p>
          )
        }
        toc={doc.toc}
        compact
      >
        <Body components={mdxComponents} />
      </ArticleLayout>
    </>
  )
}
