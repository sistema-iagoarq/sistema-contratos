type Props = {
  onClick: () => void
  label?: string
}

export function BackLink({ onClick, label = 'Voltar' }: Props) {
  return (
    <button type="button" className="back-link" onClick={onClick}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      {label}
    </button>
  )
}
