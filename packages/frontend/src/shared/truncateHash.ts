export const truncateHash = (hash: string | undefined, length = 38): string | undefined => {
  if (!hash) return undefined
  return hash.replace(hash.substring(6, length), '...')
}
