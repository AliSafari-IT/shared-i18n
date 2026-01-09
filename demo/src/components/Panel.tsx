import { ReactNode } from 'react'

interface PanelProps {
  title: string
  children: ReactNode
}

export default function Panel({ title, children }: PanelProps) {
  return (
    <div className="panel">
      <h2 className="panel-title">{title}</h2>
      {children}
    </div>
  )
}
