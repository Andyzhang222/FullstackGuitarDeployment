"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const material_1 = require("@mui/material");
const Footer = () => {
    return (<material_1.Box sx={{
            width: '100%',
            backgroundColor: '#02000C',
            color: '#FFFFFF',
            marginTop: '72px',
        }}>
      <material_1.Container maxWidth={false} sx={{
            width: '1600px', // 固定宽度为电脑端宽度
            margin: '0 auto', // 居中对齐
            padding: '40px 0', // 设置内边距
            boxSizing: 'border-box', // 确保边框和内边距包含在宽度和高度内
        }}>
        <material_1.Grid container spacing={4}>
          <material_1.Grid item xs={4}>
            {' '}
            {/* 确保各列宽度在手机和电脑端一致 */}
            <material_1.Typography variant="h6" sx={{ marginBottom: '16px' }}>
              Contact Us
            </material_1.Typography>
            <material_1.Typography variant="body2" sx={{ marginBottom: '8px', color: 'white' }}>
              Feel free to contact us if you need more information about our
              guitars or any of our services.
            </material_1.Typography>
            <material_1.Typography variant="body2" sx={{ marginBottom: '4px' }}>
              <strong>Contact number:</strong> 647-555-325
            </material_1.Typography>
            <material_1.Typography variant="body2" sx={{ marginBottom: '4px' }}>
              <strong>Email:</strong>{' '}
              <material_1.Link href="mailto:guitar123@guitar.com" sx={{ color: '#FFFFFF', textDecoration: 'none' }}>
                guitar123@guitar.com
              </material_1.Link>
            </material_1.Typography>
            <material_1.Typography variant="body2">
              <strong>Available hours:</strong> Mon - Fri, 10:00 am - 10:00 pm
              (EST) <br />
              Sat - Sun, 10:00 am - 6:00 pm (EST)
            </material_1.Typography>
          </material_1.Grid>
          <material_1.Grid item xs={4}>
            <material_1.Typography variant="h6" sx={{ marginBottom: '16px' }}>
              Store Address
            </material_1.Typography>
            <material_1.Typography variant="body2" sx={{ marginBottom: '8px', color: 'white' }}>
              Visit our store to pick up your guitar.
            </material_1.Typography>
            <material_1.Typography variant="body2">
              <strong>382 Yonge Street, Halifax</strong>
            </material_1.Typography>
          </material_1.Grid>
          <material_1.Grid item xs={4}>
            <material_1.Typography variant="h6" sx={{ marginBottom: '16px' }}>
              Follow Us
            </material_1.Typography>
            <material_1.Typography variant="body2" sx={{ marginBottom: '8px', color: 'white' }}>
              Stay connected through our social channels.
            </material_1.Typography>
            <material_1.Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <material_1.Link href="#" sx={{ color: '#FFFFFF', textDecoration: 'none' }}>
                Facebook
              </material_1.Link>
              <material_1.Link href="#" sx={{ color: '#FFFFFF', textDecoration: 'none' }}>
                Twitter
              </material_1.Link>
              <material_1.Link href="#" sx={{ color: '#FFFFFF', textDecoration: 'none' }}>
                Instagram
              </material_1.Link>
            </material_1.Box>
          </material_1.Grid>
        </material_1.Grid>
      </material_1.Container>
    </material_1.Box>);
};
exports.default = Footer;
//# sourceMappingURL=Footer.js.map