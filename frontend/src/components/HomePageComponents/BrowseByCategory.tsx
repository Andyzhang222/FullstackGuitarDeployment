import React from 'react';
import { Box } from '@mui/material';
import { SectionHeader, TitleText } from '../../theme/customStyles';

const LargeCategoryCard: React.FC<{ name: string; imgSrc: string }> = ({
  name,
  imgSrc,
}) => (
  <Box
    sx={{
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
    }}
  >
    <TitleText sx={{}}>{name}</TitleText>
    <img src={imgSrc} alt={`${name} Image`} style={{ maxHeight: '100%' }} />
  </Box>
);

const SmallCategoryCard: React.FC<{ name: string; imgSrc: string }> = ({
  name,
  imgSrc,
}) => (
  <Box
    sx={{
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
    }}
  >
    <TitleText sx={{ color: '#000', margin: '0 auto' }}>{name}</TitleText>
    <img src={imgSrc} alt={`${name} Image`} style={{ maxHeight: '100%' }} />
  </Box>
);

const BrowseByCategory: React.FC = () => {
  return (
    <Box
      sx={{
        width: 'calc(100% - 144px)', // 确保两边有72px的间距
        margin: '0 auto', // 居中对齐
      }}
    >
      <SectionHeader sx={{ marginBottom: '16px', textAlign: 'left' }}>
        Browse by category
      </SectionHeader>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start', // 顶部对齐
          gap: '16px',
        }}
      >
        <LargeCategoryCard
          name="Classical Guitar"
          imgSrc="/images/MarketingBanner/1.png"
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            height: '374px',
          }}
        >
          <SmallCategoryCard
            name="Acoustic Guitar"
            imgSrc="/images/MarketingBanner/2.png"
          />
          <SmallCategoryCard
            name="Ukulele"
            imgSrc="/images/MarketingBanner/3.png"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            height: '374px',
          }}
        >
          <SmallCategoryCard
            name="Semi-Acoustic Guitar"
            imgSrc="/images/MarketingBanner/4.png"
          />
          <SmallCategoryCard
            name="Banjo"
            imgSrc="/images/MarketingBanner/5.png"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BrowseByCategory;
