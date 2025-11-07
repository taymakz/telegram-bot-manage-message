export function useGetImageUrl(address: string): string {
  // Don't modify blob URLs, data URLs, or absolute URLs
  if (
    address
    && (address.startsWith('blob:')
      || address.startsWith('data:')
      || address.startsWith('http://')
      || address.startsWith('https://'))
  ) {
    return address
  }

  const config = useRuntimeConfig()
  return `${config.public.storageUrl}${address}`
}
