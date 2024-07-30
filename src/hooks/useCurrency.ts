import { useFormatterCurrency } from './useFormatterCurrency'

export const useCurrency = () => {
  const [formatterCurrency] = useFormatterCurrency('es', 'COP')

  const formatter = (value: number | string) => {
    if (typeof value === 'string') {
      return formatterCurrency(Number(value))
    } else {
      return formatterCurrency(value)
    }
  }

  return formatter
}
