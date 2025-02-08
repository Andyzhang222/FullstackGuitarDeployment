"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const material_1 = require("@mui/material");
const react_redux_1 = require("react-redux");
const locationSlice_1 = require("../../components/store/locationSlice");
const LocationModal_1 = tslib_1.__importDefault(require("../RightSideInfoComponents/LocationModal"));
// 使用本地 SVG 图标
const TruckIcon = () => (<img src="/images/Header/truck.svg" alt="Truck Icon" style={{ width: '24px', height: '24px' }}/>);
const ShopIcon = () => (<img src="/images/Header/shop.svg" alt="Shop Icon" style={{ width: '24px', height: '24px' }}/>);
const AddressSelectionContainer = (0, material_1.styled)(material_1.Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    marginBottom: '16px',
    width: '365px',
    height: '102px',
});
const StyledLabelText = (0, material_1.styled)(material_1.Typography)({
    fontWeight: 500,
    fontSize: '16px',
    color: '#02000C',
    marginLeft: '8px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '240px',
});
const StyledSubText = (0, material_1.styled)(material_1.Typography)({
    fontSize: '12px',
    color: '#76757C',
    marginTop: '4px',
});
const StyledRadio = (0, material_1.styled)(material_1.Radio)({
    color: '#000',
    '&.Mui-checked': {
        color: '#000',
    },
});
const AddressSelection = () => {
    const address = (0, react_redux_1.useSelector)(locationSlice_1.selectAddress);
    const dispatch = (0, react_redux_1.useDispatch)();
    const [showLocationModal, setShowLocationModal] = react_1.default.useState(false);
    // 计算当前时间加一周
    const today = new Date();
    const nextWeek = new Date(today.setDate(today.getDate() + 7));
    const formattedDate = nextWeek.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });
    const handleAddressChange = (event) => {
        if (event.target.value === 'delivery' && !address) {
            setShowLocationModal(true);
        }
    };
    const handleLocationSave = (newAddress) => {
        dispatch((0, locationSlice_1.setAddress)(newAddress)); // 保存地址到 Redux
        setShowLocationModal(false); // 隐藏 LocationModal
    };
    return (<material_1.Box sx={{ mb: 4 }}>
      <material_1.RadioGroup row defaultValue="delivery" onChange={handleAddressChange} sx={{ gap: '16px' }}>
        <AddressSelectionContainer>
          <material_1.Box sx={{ display: 'flex', alignItems: 'center' }}>
            {' '}
            {/* 确保图标和 "Deliver to" 在一行 */}
            <StyledRadio value="delivery"/>
            <material_1.Box sx={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '8px',
        }}>
              <material_1.Box sx={{ display: 'flex', alignItems: 'center' }}>
                {' '}
                {/* 卡车图标和第一行文本 */}
                <TruckIcon />
                <StyledLabelText>
                  Deliver to {address || 'your location'}
                </StyledLabelText>
              </material_1.Box>
              <StyledSubText sx={{ marginTop: '4px' }}>
                {' '}
                {/* 第二行文本 */}
                $30 Shipping, Get it by {formattedDate}
              </StyledSubText>
            </material_1.Box>
          </material_1.Box>
        </AddressSelectionContainer>

        <AddressSelectionContainer>
          <material_1.Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StyledRadio value="pickup"/>
            <ShopIcon />
            <StyledLabelText>Pick up at Toronto Downtown</StyledLabelText>
          </material_1.Box>
        </AddressSelectionContainer>
      </material_1.RadioGroup>

      {showLocationModal && (<LocationModal_1.default onClose={() => setShowLocationModal(false)} onSave={handleLocationSave}/>)}
    </material_1.Box>);
};
exports.default = AddressSelection;
//# sourceMappingURL=AddressSelection.js.map