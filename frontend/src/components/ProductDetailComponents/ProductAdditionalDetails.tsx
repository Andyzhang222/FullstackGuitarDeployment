// components/ProductDetailComponents/ProductAdditionalDetails.tsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ProductAdditionalDetails: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Box sx={{ mt: 5, maxWidth: '800px', mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Listen to the sound
      </Typography>
      <Box sx={{ mb: 4 }}>
        <audio controls>
          <source src="/path/to/your/audio/file.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </Box>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Review from us
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout The point of using
        Lorem Ipsum is that it has a more-or-less normal distribution of letters
        as opposed to using Content here content here making it look like
        readable English
        <a href="#">View more</a>
      </Typography>

      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Specification</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Specification details content goes here...</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Shipping policy</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Shipping policy details content goes here...</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Return policy</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Return policy details content goes here...</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ProductAdditionalDetails;
