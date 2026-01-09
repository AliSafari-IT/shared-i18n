import { useTranslation } from '@asafarim/shared-i18n'

interface KeyTableProps {
  namespace: string
  keys: string[]
}

export default function KeyTable({ namespace, keys }: KeyTableProps) {
  const { t } = useTranslation(namespace)

  return (
    <table className="key-table">
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {keys.map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{t(key)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
