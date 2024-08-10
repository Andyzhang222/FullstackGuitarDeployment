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
    <Box sx={{ mt: 5, maxWidth: '800px', mx: '72px' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Listen to the sound
      </Typography>
      <Box
        sx={{
          mb: 4,
          backgroundColor: '#fbe9c3', // 设置背景颜色
          borderRadius: '8px', // 添加圆角
          padding: '16px', // 添加内边距
        }}
      >
        <audio controls style={{ width: '100%' }}>
          <source src="/path/to/your/audio/file.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </Box>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Review from us
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, making it look like readable English. Many desktop publishing
        packages and web page editors now use Lorem Ipsum as their default model
        text.
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
          <Typography>
            This product is made from high-quality materials. It meets all
            relevant industry standards and is designed to be durable and
            reliable. The product dimensions are 12 x 8 x 6 inches, and it
            weighs approximately 1.5 pounds. It is available in multiple colors
            and includes a 1-year warranty.
          </Typography>
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
          <Typography>
            We offer free standard shipping on all orders within the United
            States. Orders are processed within 2-3 business days and delivery
            typically takes 5-7 business days. Expedited shipping options are
            available at an additional cost. We ship to most international
            locations with applicable shipping fees and delivery times vary by
            region.
          </Typography>
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
          <Typography>
            If you are not completely satisfied with your purchase, you may
            return the item within 30 days of receipt for a full refund. The
            item must be in its original condition with all tags and packaging
            intact. Return shipping costs are the responsibility of the customer
            unless the item is defective or damaged upon arrival. Please contact
            our customer service team to initiate a return.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ProductAdditionalDetails;
