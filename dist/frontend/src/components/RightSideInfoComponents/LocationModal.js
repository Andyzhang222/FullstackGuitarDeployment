"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const material_1 = require("@mui/material");
const Close_1 = tslib_1.__importDefault(require("@mui/icons-material/Close"));
const MyLocation_1 = tslib_1.__importDefault(require("@mui/icons-material/MyLocation"));
const system_1 = require("@mui/system");
const react_redux_1 = require("react-redux");
const locationSlice_1 = require("../../components/store/locationSlice");
const LocationModalContainer = (0, system_1.styled)(material_1.Box)({
    position: 'fixed',
    top: 0,
    right: 0,
    width: '420px',
    height: '100vh',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
});
const ContentContainer = (0, system_1.styled)(material_1.Box)({
    padding: '24px',
    overflowY: 'auto',
});
const ButtonContainer = (0, system_1.styled)(material_1.Box)({
    padding: '16px 24px',
    borderTop: '1px solid #f0f0f0',
    backgroundColor: '#fff',
});
const LocationModal = ({ onClose, onSave }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const [address, setAddress] = react_1.default.useState('');
    const fetchCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                dispatch((0, locationSlice_1.fetchAddressFromCoords)({ lat: latitude, lng: longitude }))
                    .unwrap()
                    .then((address) => setAddress(address))
                    .catch((error) => console.error('Failed to fetch address:', error));
            }, (error) => {
                console.error(error);
            });
        }
        else {
            alert('Geolocation is not supported by this browser.');
        }
    };
    const handleSave = () => {
        onSave(address); // 通过回调函数传递地址
    };
    return (<LocationModalContainer>
      <ContentContainer>
        <material_1.IconButton sx={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            color: '#000',
        }} onClick={onClose}>
          <Close_1.default />
        </material_1.IconButton>
        <material_1.Typography variant="h6" sx={{
            fontWeight: 500,
            fontSize: '20px',
            lineHeight: '28px',
            color: '#02000C',
            marginBottom: '8px',
        }}>
          Use your location
        </material_1.Typography>
        <material_1.Typography sx={{
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '22px',
            color: '#76757C',
            marginBottom: '16px',
        }}>
          Enter your zip code to find out if we deliver to your area.
        </material_1.Typography>
        <material_1.TextField fullWidth placeholder="Enter your zip code, e.g., M5G2G4" value={address} onChange={(e) => setAddress(e.target.value)} sx={{
            height: '40px',
            marginBottom: '16px',
        }} inputProps={{
            style: { height: '40px', padding: '10px 12px' },
        }}/>
        <material_1.Button variant="text" startIcon={<MyLocation_1.default />} onClick={fetchCurrentLocation} sx={{
            color: '#02000C',
            marginBottom: '16px',
            textTransform: 'none',
        }}>
          My current location
        </material_1.Button>
      </ContentContainer>
      <ButtonContainer>
        <material_1.Button variant="contained" color="primary" fullWidth onClick={handleSave} // 点击保存时，调用 handleSave
     sx={{
            backgroundColor: '#02000C',
            color: '#FFFFFF',
            height: '48px',
            textTransform: 'none',
            fontSize: '16px',
        }}>
          Save
        </material_1.Button>
      </ButtonContainer>
    </LocationModalContainer>);
};
exports.default = LocationModal;
//# sourceMappingURL=LocationModal.js.map