interface SourceLinkProps {
  url: string | null
}

export function SourceLink({ url }: SourceLinkProps) {
  if (!url?.startsWith('https://')) return null
  let host = url
  try {
    host = new URL(url).host.replace(/^www\./, '')
  } catch {
    return null
  }
  return (
    <p>
      <a className="source-link" href={url} target="_blank" rel="noopener noreferrer">
        Consultar en {host}
      </a>
    </p>
  )
}
