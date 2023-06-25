import React from 'react';
import { Container, Grid, IconButton, Typography } from '@mui/material';
import { Facebook, Twitter, Google, Instagram, LinkedIn, GitHub } from '@mui/icons-material';

export default function Footer() {
  return (
    <div className="text-center text-white footer" style={{ backgroundColor: '#592f73' }}>
      <Container>
        <Grid container justifyContent="center">
          <Grid item>
            <IconButton color="inherit" href="#!">
              <Facebook />
            </IconButton>
            <IconButton color="inherit" href="#!">
              <Twitter />
            </IconButton>
            <IconButton color="inherit" href="#!">
              <Google />
            </IconButton>
            <IconButton color="inherit" href="#!">
              <Instagram />
            </IconButton>
            <IconButton color="inherit" href="#!">
              <LinkedIn />
            </IconButton>
            <IconButton color="inherit" href="#!">
              <GitHub />
            </IconButton>
          </Grid>
        </Grid>
      </Container>

      <div className="text-center text-dark p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <Typography variant="body2" component="span">
          © 2023 SuperKuper Wordle
        </Typography>
      </div>
    </div>
  );
}
