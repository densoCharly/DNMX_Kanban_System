import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";



const ChatSide = () => {
    const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();
    const toggle = () => {
        toggleSidebar();
        if (toggled) {
            console.log(true);
            collapseSidebar();
        } else {
            console.log(false);
            collapseSidebar();
        }
    };

    return (
        <div >
            <Sidebar
                breakPoint="sm"
                transitionDuration={800}
                backgroundColor="rgb(42, 53, 60, 0.7)"
                rtl={false}
                style={{ height: "100vh" }}
            >
                {/* {!broken && ( */}
                <Menu>
                <MenuItem
                    icon={<MenuOutlinedIcon color='primary'/>}
                    onClick={() => {
                        toggle();
                    }}
                    style={{ textAlign: "center", color:"white" }}
                >
                    {""}
                    <h2>Admin</h2>
                </MenuItem>

                <MenuItem icon={<HomeOutlinedIcon color="primary" />}>Home</MenuItem>
                <MenuItem icon={<PeopleOutlinedIcon color="primary"/>}>Team</MenuItem>
                <MenuItem icon={<ContactsOutlinedIcon color="primary"/>}>Contacts</MenuItem>
                <MenuItem icon={<ReceiptOutlinedIcon color="primary"/>}>Profile</MenuItem>
                <MenuItem icon={<HelpOutlineOutlinedIcon color="primary"/>}>FAQ</MenuItem>
                <MenuItem icon={<CalendarTodayOutlinedIcon color="primary"/>}>Calendar</MenuItem>
                </Menu>
                {/* )} */}
            </Sidebar>
                
            </div>
    );
};


export default ChatSide