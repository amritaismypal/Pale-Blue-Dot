import { FormEvent, useEffect, useState } from 'react'
type Comment = { _id: string; name: string; message: string; submittedAt: string }
export default function BlogComments({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)
  useEffect(() => { fetch(`/api/comments?slug=${encodeURIComponent(postSlug)}`).then(async (response) => response.ok ? response.json() : { comments: [] }).then((data) => setComments(data.comments || [])).catch(() => setComments([])) }, [postSlug])
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSending(true); setStatus('')
    try {
      const response = await fetch('/api/comments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug: postSlug, name, message, website: new FormData(event.currentTarget).get('website') }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Your comment could not be submitted.')
      setName(''); setMessage(''); setStatus('Thanks. Your comment was sent for editorial approval before it appears here.')
    } catch (error) { setStatus(error instanceof Error ? error.message : 'Your comment could not be submitted.') }
    finally { setSending(false) }
  }
  return <section className="blog-comments" aria-labelledby="comments-heading"><h2 id="comments-heading">Comments</h2><p>Comments are reviewed by the editors before they appear.</p>{comments.length ? <ol className="comments-list">{comments.map((comment) => <li key={comment._id}><p>{comment.message}</p><p className="meta">{comment.name} · {new Date(comment.submittedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p></li>)}</ol> : <p className="meta">No approved comments yet. Be the first to join the conversation.</p>}<form className="comment-form" onSubmit={submit}><label htmlFor="comment-name">Your name</label><input id="comment-name" name="name" autoComplete="name" maxLength={80} required value={name} onChange={(event) => setName(event.target.value)} /><label htmlFor="comment-message">Comment</label><textarea id="comment-message" name="message" rows={5} maxLength={4000} required value={message} onChange={(event) => setMessage(event.target.value)} /><div className="comment-honeypot" aria-hidden="true"><label htmlFor="comment-website">Leave this field empty</label><input id="comment-website" name="website" tabIndex={-1} autoComplete="off" /></div><button className="button" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Submit comment'}</button><p className="form-status" role="status" aria-live="polite">{status}</p></form></section>
}
