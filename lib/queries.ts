export const issueFields = `"_id": _id, title, "slug": slug.current, editionNumber, publishedAt, description, featured, "coverImage": coverImage{..., "asset": asset->}, "pdf": pdf.asset->{url, size}`
export const articleFields = `"_id": _id, title, "slug": slug.current, publishedAt, abstract, disclaimer, language, references, body, "pdf": pdf.asset->url, "heroImage": heroImage{..., "asset": asset->}, "authors": authors[]->{name, "slug": slug.current}, "issue": issue->{title, "slug": slug.current}, "translationOf": translationOf->{title, "slug": slug.current, language, "issueSlug": issue->slug.current}, "translation": *[_type == "article" && translationOf._ref == ^._id][0]{title, "slug": slug.current, language, "issueSlug": issue->slug.current}`
export const blogFields = `"_id": _id, title, "slug": slug.current, publishedAt, excerpt, body, "coverImage": coverImage{..., "asset": asset->}, "author": author->{name, "slug": slug.current}`
export const issuesQuery = `*[_type == "issue"] | order(coalesce(editionNumber, 0) desc, publishedAt desc){${issueFields}, "articleCount": count(*[_type == "article" && references(^._id)])}`
export const featuredIssueQuery = `coalesce(*[_type == "issue" && featured == true] | order(publishedAt desc)[0]{${issueFields}}, *[_type == "issue"] | order(publishedAt desc)[0]{${issueFields}})`
export const issueBySlugQuery = `*[_type == "issue" && slug.current == $slug][0]{${issueFields}, "articles": *[_type == "article" && references(^._id)] | order(publishedAt desc){${articleFields}}}`
export const articleBySlugQuery = `*[_type == "article" && slug.current == $articleSlug && issue->slug.current == $issueSlug][0]{${articleFields}, "more": *[_type == "article" && references(^.issue._ref) && _id != ^._id] | order(publishedAt desc)[0...3]{${articleFields}}}`
export const articlePathsQuery = `*[_type == "article" && defined(slug.current) && defined(issue->slug.current)]{"slug": slug.current, "issueSlug": issue->slug.current}`
export const blogListQuery = `*[_type == "blogPost"] | order(publishedAt desc){${blogFields}}`
export const blogBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0]{${blogFields}}`
export const blogPathsQuery = `*[_type == "blogPost" && defined(slug.current)]{"slug": slug.current}`
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{submissionsOpen, submissionsFormUrl, submissionsClosedMessage, submissionGuidelines, contactEmail, socialLinks, aboutBlurb}`
export const staffQuery = `*[_type == "staffMember"] | order(displayOrder asc, name asc){_id, name, "slug": slug.current, role, bio, funFact, email, linkedin, "photo": photo{..., "asset": asset->}}`
export const aboutQuery = `*[_type == "aboutPage"][0]{mission, history, values, howItWorks, body}`
