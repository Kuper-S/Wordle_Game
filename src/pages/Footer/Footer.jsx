import React from 'react';
import { Container, Grid, IconButton, Typography } from '@mui/material';
import { LinkedIn, GitHub } from '@mui/icons-material';

export default function Footer() {
  return (
    <div className="text-center text-white footer">
      <Container>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <div className="footer-icons">
              <IconButton color="inherit" href="#!">
                <LinkedIn />
              </IconButton>
              <IconButton color="inherit" href="https://github.com/Kuper-S/Wordle_Game">
                <GitHub />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item>
          <div className="text-center text-white p-3 footer-content" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
                <Typography variant="body2" component="span">
                    © 2023 SuperKuper Wordle
                </Typography>
        </div>

          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
