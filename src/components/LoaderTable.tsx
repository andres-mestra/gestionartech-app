import { Skeleton, Stack } from '@mui/material'

//Generate array with 5 elements
const array = Array.from(Array(5).keys())

export function LoaderTable() {
  return (
    <Stack width="100%">
      {array.map((i) => (
        <Skeleton
          key={i}
          variant="rounded"
          height={60}
          style={{ marginBottom: '0.5rem' }}
        />
      ))}
    </Stack>
  )
}
