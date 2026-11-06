export default function EmptyState({ title, children }: { title: string; children?: React.ReactNode }) { return <div className="empty-state"><h2>{title}</h2>{children && <p>{children}</p>}</div> }
