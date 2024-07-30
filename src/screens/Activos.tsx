import { useEffect, useState } from 'react'
import { Active } from '@/types'
import { API_URL } from '@/constants'
import { ActivesResponse } from '@/types/responses'
import { mapperActivo } from '@/helpers/mapper'
import {
  Chip,
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

import { useCurrency } from '@/hooks/useCurrency'
import { LoaderTable } from '@/components/LoaderTable'
import { RefreshButton } from '@/components/RefreshButton'
import { CustomImage } from '@/components/CustomImage'

export default function ActivosScreen() {
  const [loading, setLoading] = useState(false)
  const [actives, setActives] = useState<Active[]>([])

  const formatter = useCurrency()

  function onGetActives() {
    setLoading(true)
    getActives()
      .then((resp) => {
        setActives(resp)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    onGetActives()
  }, [])

  return (
    <Stack sx={{ gap: '2rem', padding: '3rem' }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3">Activos</Typography>
        <RefreshButton disabled={loading} onClick={() => onGetActives()} />
      </Stack>
      <TableContainer component={Paper}>
        {loading && <LoaderTable />}
        {!loading && (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right"></TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Placa</TableCell>
                <TableCell align="right">Estado</TableCell>
                <TableCell align="right">Prestamo</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Garantia</TableCell>
                <TableCell align="right">Locación</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {actives.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <CustomImage src={item.image} alt={item.name} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.placa}</TableCell>
                  <TableCell align="right">
                    <Chip label={item.state} color="primary" />
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={item?.prestamo?.state || 'N/A'}
                      color={
                        item?.prestamo?.state === 'activo'
                          ? 'success'
                          : 'warning'
                      }
                    />
                  </TableCell>
                  <TableCell align="right">{formatter(item.price)}</TableCell>
                  <TableCell align="right">
                    {item.warrantyDate.toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">{item.location?.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Stack>
  )
}

async function getActives() {
  try {
    const response = await fetch(`${API_URL}/activos?populate=*`)
    const base: ActivesResponse = await response.json()
    return base.data.map((active) => mapperActivo({ data: active }))
  } catch (error) {
    console.error('GET ACTIVES: ', error)
    return []
  }
}
