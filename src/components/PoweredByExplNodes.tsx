import React from 'react'

interface PoweredByExplNodesProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  href?: string
  newTab?: boolean
}

const STYLES = {
  fontFamily: "'Roboto Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
  textColor: '#ffffff',
  backgroundColor: 'oklch(0.18 0.04 252)',
  backgroundColorHover: 'oklch(0.18 0.04 252 / 0.8)',
  borderColor: 'oklch(0.62 0.16 55)',
  sizes: {
    sm: { fontSize: '14px', paddingX: '8px', paddingY: '4px', borderRadius: '4px' },
    md: { fontSize: '12px', paddingX: '12px', paddingY: '6px', borderRadius: '6px' },
    lg: { fontSize: '14px', paddingX: '16px', paddingY: '8px', borderRadius: '8px' },
  },
  shadow: {
    default: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
    hover: '0 4px 8px rgba(0,0,0,0.4), 0 0 12px oklch(0.62 0.16 55 / 0.6), inset 0 1px 0 rgba(255,255,255,0.15)',
  },
} as const

export function PoweredByExplNodes({
  size = 'md',
  className = '',
  href = 'https://node.expl.one',
  newTab = true,
}: PoweredByExplNodesProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const sizeStyles = STYLES.sizes[size]

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    fontFamily: STYLES.fontFamily,
    fontSize: sizeStyles.fontSize,
    fontWeight: 400,
    color: STYLES.textColor,
    textDecoration: 'none',
    padding: `${sizeStyles.paddingY} ${sizeStyles.paddingX}`,
    backgroundColor: isHovered ? STYLES.backgroundColorHover : STYLES.backgroundColor,
    border: `1px solid ${STYLES.borderColor}`,
    borderRadius: sizeStyles.borderRadius,
    boxShadow: isHovered ? STYLES.shadow.hover : STYLES.shadow.default,
    transform: isHovered ? 'translateY(-1px) scale(1.1)' : 'translateY(0) scale(1)',
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
  }

  return (
    <a
      href={href}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
      style={baseStyles}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      // Powered by EXPL Nodes
    </a>
  )
}
