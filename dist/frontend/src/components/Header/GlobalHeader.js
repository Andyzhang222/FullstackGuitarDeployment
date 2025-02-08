"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const material_1 = require("@mui/material");
const react_redux_1 = require("react-redux");
const LocationModal_1 = tslib_1.__importDefault(require("../RightSideInfoComponents/LocationModal"));
const ContactModal_1 = tslib_1.__importDefault(require("../RightSideInfoComponents/ContactModal"));
const PickUpModal_1 = tslib_1.__importDefault(require("../RightSideInfoComponents/PickUpModal"));
const CategoryMenu_1 = tslib_1.__importDefault(require("./CategoryMenu"));
const locationSlice_1 = require("../../components/store/locationSlice"); // Import Redux actions and selectors
const GlobalHeader = () => {
    const address = (0, react_redux_1.useSelector)(locationSlice_1.selectAddress); // Get the address from Redux
    const dispatch = (0, react_redux_1.useDispatch)(); // Use AppDispatch type
    const [showLocationModal, setShowLocationModal] = (0, react_1.useState)(false);
    const [showContactModal, setShowContactModal] = (0, react_1.useState)(false);
    const [showPickUpModal, setShowPickUpModal] = (0, react_1.useState)(false);
    const handleToggleModal = () => {
        setShowLocationModal(!showLocationModal);
    };
    const handleContactToggleModal = () => {
        setShowContactModal(!showContactModal);
    };
    const handlePickUpToggleModal = () => {
        setShowPickUpModal(!showPickUpModal);
    };
    const handleSaveAddress = (newAddress) => {
        dispatch((0, locationSlice_1.setAddress)(newAddress)); // Save the address to Redux
        setShowLocationModal(false);
    };
    const isAddressSet = address !== '';
    const truncatedAddress = isAddressSet
        ? `${address.substring(0, 15)}...`
        : 'Deliver to your location';
    return (<material_1.Box sx={{
            width: '100%',
            height: '48px',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            justifyContent: 'center',
            margin: '0 auto',
            padding: '0 72px',
            boxSizing: 'border-box',
            position: 'relative',
            borderBottom: '1px solid #DDDCDE',
        }}>
      <material_1.Grid container sx={{
            width: '100%',
            maxWidth: '1300px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'nowrap',
        }}>
        {/* CategoryMenu Component */}
        <CategoryMenu_1.default />

        <material_1.Grid item sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            minWidth: 0,
            flexShrink: 1,
        }}>
          <material_1.Button sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            color: '#000000',
            textTransform: 'none',
            minWidth: 'fit-content',
            maxWidth: '150px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            flexShrink: 1,
        }} onClick={handleToggleModal}>
            <img src="/images/Header/truck.svg" alt="Delivery Icon"/>
            <material_1.Typography variant="body1" sx={{
            color: isAddressSet ? '#02000C' : '#000',
            textDecoration: isAddressSet ? 'underline' : 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        }}>
              {truncatedAddress}
            </material_1.Typography>
          </material_1.Button>

          <material_1.Button sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            color: '#000000',
            textTransform: 'none',
            minWidth: 'fit-content',
        }} onClick={handlePickUpToggleModal}>
            <img src="/images/Header/shop.svg" alt="Pickup Icon"/>
            <material_1.Typography variant="body1">Pick up at Halifax</material_1.Typography>
          </material_1.Button>

          <material_1.Button sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            color: '#000000',
            textTransform: 'none',
            minWidth: 'fit-content',
        }} onClick={handleContactToggleModal}>
            <img src="/images/Header/phone.svg" alt="Contact Icon"/>
            <material_1.Typography variant="body1">Contact Us</material_1.Typography>
          </material_1.Button>
        </material_1.Grid>
      </material_1.Grid>

      {showLocationModal && (<LocationModal_1.default onClose={handleToggleModal} onSave={handleSaveAddress}/>)}
      {showContactModal && <ContactModal_1.default onClose={handleContactToggleModal}/>}
      {showPickUpModal && <PickUpModal_1.default onClose={handlePickUpToggleModal}/>}
    </material_1.Box>);
};
exports.default = GlobalHeader;
//# sourceMappingURL=GlobalHeader.js.map