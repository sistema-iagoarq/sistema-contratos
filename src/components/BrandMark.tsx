type Props = {
  /** Mostra apenas o símbolo IS. Default: true */
  symbolOnly?: boolean
  /** Altura em px do símbolo (largura proporcional). Default: 32 */
  size?: number
  /** Cor base. Default: currentColor */
  color?: string
  className?: string
}

/**
 * Símbolo oficial da IS Arquitetura — paths extraídos do PDF da identidade
 * visual (Id Visual - Iago Siqueira - Alterações 2.pdf, página 2).
 */
export function BrandMark({
  symbolOnly = true,
  size = 32,
  color = 'currentColor',
  className,
}: Props) {
  const vbW = 91.844
  const vbH = 92.926
  const width = (size * vbW) / vbH

  const symbol = (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      width={width}
      height={size}
      fill={color}
      aria-label="IS Arquitetura"
    >
      <g transform="translate(-725.465,-493.797)">
        <path d="M 738.730469 586.722656 L 725.464844 586.722656 L 725.464844 493.796875 L 738.730469 493.796875 Z M 738.730469 586.722656 " />
        <path d="M 765.644531 562.234375 C 768.414062 567.78125 773.597656 571.777344 779.671875 573.023438 C 781.019531 573.300781 782.394531 573.4375 783.769531 573.4375 C 794.960938 573.4375 804.023438 564.375 804.023438 553.183594 C 804.023438 548.332031 802.777344 543.917969 799.855469 540 C 796.171875 535.054688 790.570312 531.863281 785.371094 528.746094 C 780.050781 525.554688 774.820312 522.269531 770.816406 517.433594 C 765.226562 510.679688 763.320312 502.382812 763.101562 493.796875 L 776.386719 493.796875 C 776.597656 501.660156 778.398438 507.574219 784.863281 512.554688 C 789.003906 515.746094 793.578125 518.285156 798.003906 521.039062 C 802.9375 524.109375 807.015625 527.371094 810.507812 532.0625 C 815.140625 538.277344 817.308594 545.464844 817.308594 553.183594 C 817.308594 559.703125 815.4375 566.035156 811.875 571.492188 C 805.664062 581.007812 795.132812 586.722656 783.769531 586.722656 C 771.304688 586.722656 759.855469 579.808594 754.0625 568.769531 L 753.992188 568.632812 L 765.566406 562.085938 Z M 765.644531 562.234375 " />
      </g>
    </svg>
  )

  if (symbolOnly) {
    return <span className={className}>{symbol}</span>
  }

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size * 0.38,
      }}
    >
      {symbol}
      <span
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          lineHeight: 1.05,
          letterSpacing: '0.12em',
          color,
          fontFamily: 'var(--sans)',
          fontWeight: 500,
        }}
      >
        <span style={{ fontSize: size * 0.4 }}>IAGO SIQUEIRA</span>
        <span style={{ fontSize: size * 0.4, fontWeight: 300 }}>ARQUITETURA</span>
      </span>
    </span>
  )
}
