import { useEffect, useState } from 'react'
import { Prestamo } from '@/types'
import { API_URL } from '@/constants'
import { PrestamosResponse } from '@/types/responses'
import { mapperPrestamo } from '@/helpers/mapper'
import {
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import AssessmentIcon from '@mui/icons-material/Assessment'
import { LoaderTable } from '@/components/LoaderTable'
import { ActivosModal } from '@/components/ActivosModal'
import { RefreshButton } from '@/components/RefreshButton'

export default function PrestamosScreen() {
  const [loading, setLoading] = useState(false)
  const [prestamos, setPrestamos] = useState<Prestamo[]>([])
  const [prestamo, setPrestamo] = useState<Prestamo | undefined>(undefined)

  function onGetPrestamos() {
    setLoading(true)
    getPrestamos()
      .then((resp) => {
        setPrestamos(resp)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    onGetPrestamos()
  }, [])

  return (
    <Stack sx={{ gap: '2rem', padding: '3rem' }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3">Prestamos</Typography>
        <RefreshButton disabled={loading} onClick={() => onGetPrestamos()} />
      </Stack>
      <TableContainer component={Paper}>
        {loading && <LoaderTable />}
        {!loading && (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Usuario</TableCell>
                <TableCell align="right">Estado</TableCell>
                <TableCell align="right">Fecha expiración</TableCell>
                <TableCell align="right">Activos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prestamos.map((item) => (
                <TableRow
                  key={item?.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{item.id}</TableCell>
                  <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                    {item.user?.username || 'N/A'}
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={item?.state || 'N/A'}
                      color={item?.state === 'activo' ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {item?.endDate.toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color={item.activos?.length ? 'primary' : 'inherit'}
                      onClick={() => setPrestamo(item)}
                    >
                      <AssessmentIcon fontSize="large" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <ActivosModal
        open={Boolean(prestamo)}
        prestamo={prestamo!}
        onClose={() => {
          console.log('CLOSE')
          setPrestamo(undefined)
        }}
      />
    </Stack>
  )
}

async function getPrestamos() {
  try {
    const response = await fetch(`${API_URL}/prestamos?populate=*`)
    const base: PrestamosResponse = await response.json()
    return base.data.map((prestamo) => mapperPrestamo({ data: prestamo }))
  } catch (error) {
    console.error('GET ACTIVES: ', error)
    return []
  }
}
