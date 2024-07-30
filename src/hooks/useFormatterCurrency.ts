export const useFormatterCurrency = (locales: string, currency: string) => {
  const formatter = (value: number) => {
    return new Intl.NumberFormat(locales, {
      style: 'currency',
      currency: currency,
    }).format(value)
  }

  return [formatter] as const
}
