"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const system_1 = require("@mui/system");
const IconButton_1 = tslib_1.__importDefault(require("@mui/material/IconButton"));
const SearchBarContainer = (0, system_1.styled)('div')({
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    borderRadius: '5px',
    width: '800px',
    height: '40px',
    boxSizing: 'border-box',
    background: '#FFFFFF',
});
const SearchInput = (0, system_1.styled)('input')({
    width: '221.79px',
    height: '24px',
    border: 'none',
    outline: 'none',
    flex: 1,
});
const SearchBar = ({ searchTerm = '' }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [inputValue, setInputValue] = (0, react_1.useState)(searchTerm);
    (0, react_1.useEffect)(() => {
        setInputValue(searchTerm);
    }, [searchTerm]);
    const handleSearchChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search?query=${inputValue}`);
        }
    };
    return (<SearchBarContainer>
      <IconButton_1.default>
        <img src="/images/Header/Vector.svg" alt="Search Icon"/>
      </IconButton_1.default>
      <SearchInput placeholder="Find guitars you love..." value={inputValue} onChange={handleSearchChange} onKeyDown={handleKeyDown} style={{
            fontFamily: 'Roboto, Arial, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '22px',
            textAlign: 'left',
            color: '#595959',
        }}/>
    </SearchBarContainer>);
};
exports.default = SearchBar;
//# sourceMappingURL=SearchBar.js.map