"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const material_1 = require("@mui/material");
const customStyles_1 = require("../../theme/customStyles");
const LargeCategoryCard = ({ name, imgSrc, }) => (<material_1.Box sx={{
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        width: '432px',
        height: '374px', // 确保与右边的总高度一致
        backgroundColor: '#FFEACE',
        borderRadius: '8px',
        overflow: 'hidden',
        justifyContent: 'space-between', // 水平分布
        padding: '0 16px', // 添加一些内边距
    }}>
    <customStyles_1.TitleText sx={{}}>{name}</customStyles_1.TitleText>
    <img src={imgSrc} alt={`${name} Image`} style={{ maxHeight: '100%' }}/>
  </material_1.Box>);
const SmallCategoryCard = ({ name, imgSrc, }) => (<material_1.Box sx={{
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        width: '408px',
        height: '175px',
        backgroundColor: '#FFEACE',
        borderRadius: '8px',
        overflow: 'hidden',
        justifyContent: 'space-between', // 水平分布
        padding: '0 16px', // 添加一些内边距
    }}>
    <customStyles_1.TitleText sx={{ color: '#000', margin: '0 auto' }}>{name}</customStyles_1.TitleText>
    <img src={imgSrc} alt={`${name} Image`} style={{ maxHeight: '100%' }}/>
  </material_1.Box>);
const BrowseByCategory = () => {
    return (<material_1.Box sx={{
            width: 'calc(100% - 144px)', // 确保两边有72px的间距
            margin: '0 auto', // 居中对齐
        }}>
      <customStyles_1.SectionHeader sx={{ marginBottom: '16px', textAlign: 'left' }}>
        Browse by category
      </customStyles_1.SectionHeader>
      <material_1.Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start', // 顶部对齐
            gap: '16px',
        }}>
        <LargeCategoryCard name="Classical Guitar" imgSrc="/images/MarketingBanner/1.png"/>
        <material_1.Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            height: '374px',
        }}>
          <SmallCategoryCard name="Acoustic Guitar" imgSrc="/images/MarketingBanner/2.png"/>
          <SmallCategoryCard name="Ukulele" imgSrc="/images/MarketingBanner/3.png"/>
        </material_1.Box>
        <material_1.Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            height: '374px',
        }}>
          <SmallCategoryCard name="Semi-Acoustic Guitar" imgSrc="/images/MarketingBanner/4.png"/>
          <SmallCategoryCard name="Banjo" imgSrc="/images/MarketingBanner/5.png"/>
        </material_1.Box>
      </material_1.Box>
    </material_1.Box>);
};
exports.default = BrowseByCategory;
//# sourceMappingURL=BrowseByCategory.js.map