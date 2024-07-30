import { Prestamo } from '@/types'
import {
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { CustomImage } from './CustomImage'

interface Props {
  open: boolean
  onClose: () => void
  prestamo: Prestamo
}

export function ActivosModal({ open, onClose, prestamo }: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper sx={{ minHeight: '300px', padding: '1rem' }}>
          <Typography variant="h6">Prestamo: {prestamo?.id}</Typography>
          <Stack flexDirection="row" gap="1rem">
            <Typography fontWeight="bold">Usuario:</Typography>
            <Typography textTransform="capitalize">
              {prestamo?.user?.username}
            </Typography>
          </Stack>
          <Typography variant="h6">Activos del prestamo</Typography>
          <List sx={{ width: 500, bgcolor: 'background.paper' }}>
            {prestamo?.activos?.map((activo) => (
              <ListItem key={activo.id}>
                <ListItemAvatar>
                  <CustomImage
                    src={activo?.image}
                    alt={activo.name}
                    width={50}
                    height={50}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={activo.name}
                  secondaryTypographyProps={{ component: 'div' }}
                  secondary={
                    <Chip
                      size="small"
                      label={activo?.state || 'N/A'}
                      color={activo?.state === 'bueno' ? 'success' : 'warning'}
                    />
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Stack>
    </Modal>
  )
}
