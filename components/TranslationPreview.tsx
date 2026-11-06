import Link from 'next/link'
import type { Article, ArticleLink } from '../types/content'
function href(link: Article | ArticleLink, fallbackIssue: string) { const edition = 'issueSlug' in link ? link.issueSlug : link.issue?.slug; return `/journal/${edition || fallbackIssue}/${link.slug}` }
export default function TranslationPreview({ article, issueSlug }: { article: Article; issueSlug: string }) {
  const original: Article | ArticleLink = article.translationOf || article
  const translated: Article | ArticleLink | undefined = article.translationOf ? article : article.translation
  const englishIsOriginal = (original.language || '').toLowerCase().startsWith('en')
  const english = englishIsOriginal ? original : translated && (translated.language || '').toLowerCase().startsWith('en') ? translated : undefined
  const originalLanguage = original.language ? original.language.toUpperCase() : 'ORIGINAL'
  const authorLine = article.authors?.map((author) => author.name).join(', ')
  return <article className="translation-preview">
    <p className="eyebrow">Article{authorLine ? ` · ${authorLine}` : ''}</p>
    <div className="translation-columns">
      <Link className="translation-option" href={href(original, issueSlug)}><span className="translation-label">Original language{originalLanguage !== 'ORIGINAL' ? ` · ${originalLanguage}` : ''}</span><strong>{original.title}</strong>{'abstract' in original && original.abstract && <span className="translation-abstract">{original.abstract}</span>}<span className="translation-read">Read this version →</span></Link>
      {english ? <Link className="translation-option english" href={href(english, issueSlug)}><span className="translation-label">English</span><strong>{english.title}</strong>{'abstract' in english && english.abstract && <span className="translation-abstract">{english.abstract}</span>}<span className="translation-read">Read in English →</span></Link> : <div className="translation-option translation-unavailable"><span className="translation-label">English</span><strong>Translation not available yet</strong><span className="translation-abstract">This article has not been linked to an English version.</span></div>}
    </div>
  </article>
}
