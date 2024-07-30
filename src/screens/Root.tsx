import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import { useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import AssessmentIcon from '@mui/icons-material/Assessment'
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay'
import { Outlet, useNavigate } from 'react-router-dom'

const routers = [
  {
    path: '/activos',
    name: 'Activos',
    icon: AssessmentIcon,
  },
  {
    path: '/prestamos',
    name: 'Prestamos',
    icon: CalendarViewDayIcon,
  },
]

export function Root() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  return (
    <>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, padding: '1rem' }}
          role="presentation"
          onClick={toggleDrawer(false)}
          component="nav"
        >
          <Typography variant="h5">Gestionartech</Typography>
          <List>
            {routers.map(({ name, path, icon: Icon }) => (
              <ListItem key={path} disablePadding>
                <ListItemButton onClick={() => navigate(path)}>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridTemplateRows: 'max-content 1fr',
          gridTemplateAreas: `
        "header" 
        "section"`,
          height: '100%',
        }}
      >
        <AppBar sx={{ position: 'relative', gridArea: 'header' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="root"
              sx={{ mr: 2 }}
              onClick={() => navigate('/')}
            >
              <AssessmentIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Gestionartech
            </Typography>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box component="section" sx={{ gridArea: 'section' }}>
          <Outlet />
        </Box>
      </Box>
    </>
  )
}
