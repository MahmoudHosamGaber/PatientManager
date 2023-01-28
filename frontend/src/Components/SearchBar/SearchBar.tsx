import { FormEvent } from "react";
import {
    Search,
    SearchIconWrapper,
    StyledInputBase,
    SearchOptionsWrapper,
} from "./SeachBarStyles";
import SearchIcon from "@mui/icons-material/Search";
import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Menu, MenuItem, Switch, Typography } from "@mui/material";

function NavSearchBar() {
    const navigate = useNavigate();
    const searchRef = useRef<HTMLInputElement>(null);
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const val = encodeURIComponent(
            (searchRef?.current?.children[0] as HTMLInputElement).value
        );
        navigate("/search?course=" + val);
    };

    // Search Options State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Search onSubmit={onSubmit}>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                ref={searchRef}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
            />
        </Search>
    );
}

export default NavSearchBar;
