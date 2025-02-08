"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const material_1 = require("@mui/material");
const ExpandMore_1 = tslib_1.__importDefault(require("@mui/icons-material/ExpandMore"));
const ProductAdditionalDetails = () => {
    const [expanded, setExpanded] = (0, react_1.useState)(false);
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return (<material_1.Box sx={{ mt: 5, maxWidth: '800px', mx: '72px' }}>
      <material_1.Typography variant="h5" sx={{ mb: 2, fontSize: '24px', lineHeight: '1.5' }}>
        Listen to the sound
      </material_1.Typography>
      <material_1.Box sx={{
            mb: 4,
            backgroundColor: '#fbe9c3',
            borderRadius: '8px',
            padding: '16px',
        }}>
        <audio controls style={{ width: '100%' }}>
          <source src="/path/to/your/audio/file.mp3" type="audio/mp3"/>
          Your browser does not support the audio element.
        </audio>
      </material_1.Box>

      <material_1.Typography variant="h5" sx={{ mb: 2, fontSize: '24px', lineHeight: '1.5' }}>
        Review from us
      </material_1.Typography>
      <material_1.Typography variant="body1" sx={{ mb: 2, fontSize: '16px', lineHeight: '1.5' }}>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, making it look like readable English. Many desktop publishing
        packages and web page editors now use Lorem Ipsum as their default model
        text.
        <a href="#">View more</a>
      </material_1.Typography>

      <material_1.Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <material_1.AccordionSummary expandIcon={<ExpandMore_1.default />}>
          <material_1.Typography sx={{ fontSize: '18px', lineHeight: '1.5' }}>
            Specification
          </material_1.Typography>
        </material_1.AccordionSummary>
        <material_1.AccordionDetails>
          <material_1.Typography sx={{ fontSize: '16px', lineHeight: '1.5' }}>
            This product is made from high-quality materials. It meets all
            relevant industry standards and is designed to be durable and
            reliable. The product dimensions are 12 x 8 x 6 inches, and it
            weighs approximately 1.5 pounds. It is available in multiple colors
            and includes a 1-year warranty.
          </material_1.Typography>
        </material_1.AccordionDetails>
      </material_1.Accordion>

      <material_1.Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <material_1.AccordionSummary expandIcon={<ExpandMore_1.default />}>
          <material_1.Typography sx={{ fontSize: '18px', lineHeight: '1.5' }}>
            Shipping policy
          </material_1.Typography>
        </material_1.AccordionSummary>
        <material_1.AccordionDetails>
          <material_1.Typography sx={{ fontSize: '16px', lineHeight: '1.5' }}>
            We offer free standard shipping on all orders within the United
            States. Orders are processed within 2-3 business days and delivery
            typically takes 5-7 business days. Expedited shipping options are
            available at an additional cost. We ship to most international
            locations with applicable shipping fees and delivery times vary by
            region.
          </material_1.Typography>
        </material_1.AccordionDetails>
      </material_1.Accordion>

      <material_1.Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <material_1.AccordionSummary expandIcon={<ExpandMore_1.default />}>
          <material_1.Typography sx={{ fontSize: '18px', lineHeight: '1.5' }}>
            Return policy
          </material_1.Typography>
        </material_1.AccordionSummary>
        <material_1.AccordionDetails>
          <material_1.Typography sx={{ fontSize: '16px', lineHeight: '1.5' }}>
            If you are not completely satisfied with your purchase, you may
            return the item within 30 days of receipt for a full refund. The
            item must be in its original condition with all tags and packaging
            intact. Return shipping costs are the responsibility of the customer
            unless the item is defective or damaged upon arrival. Please contact
            our customer service team to initiate a return.
          </material_1.Typography>
        </material_1.AccordionDetails>
      </material_1.Accordion>
    </material_1.Box>);
};
exports.default = ProductAdditionalDetails;
//# sourceMappingURL=ProductAdditionalDetails.js.map