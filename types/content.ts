export interface ImageData { asset?: { url?: string }; alt?: string; hotspot?: unknown }
export interface Author { name: string; slug?: string; bio?: string; affiliation?: string }
export interface Article { _id?: string; title: string; slug: string; publishedAt?: string; abstract?: string; disclaimer?: string; language?: string; references?: string[]; body?: unknown[]; pdf?: string; heroImage?: ImageData; authors?: Author[]; issue?: { title: string; slug: string }; translation?: ArticleLink; original?: ArticleLink; more?: Article[] }
export interface ArticleLink { title: string; slug: string; language?: string; issueSlug: string }
export interface Issue { _id?: string; title: string; slug: string; editionNumber?: number; publishedAt?: string; description?: string; featured?: boolean; coverImage?: ImageData; pdf?: { url?: string; size?: number }; articleCount?: number; articles?: Article[] }
export interface BlogPost { _id?: string; title: string; slug: string; publishedAt?: string; excerpt?: string; body?: unknown[]; coverImage?: ImageData; author?: Author }
export interface StaffMember { _id: string; name: string; slug?: string; role?: string; bio?: string; funFact?: string; email?: string; linkedin?: string; photo?: ImageData }
export interface SiteSettings { submissionsOpen?: boolean; submissionsFormUrl?: string; submissionsClosedMessage?: string; submissionGuidelines?: unknown[]; contactEmail?: string; socialLinks?: {label: string; url: string}[]; aboutBlurb?: string }
export interface AboutPage { mission?: string; history?: string; values?: string; howItWorks?: unknown[]; body?: unknown[] }
