import { Button } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'

interface Props {
  onClick: () => void
  disabled?: boolean
}
export const RefreshButton = ({ onClick, disabled }: Props) => {
  return (
    <Button disabled={disabled} endIcon={<RefreshIcon />} onClick={onClick}>
      Recargar
    </Button>
  )
}
