import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon
} from "@material-ui/icons";
import BarChartIcon from '@material-ui/icons/BarChart';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import StoreIcon from '@material-ui/icons/Store';
import ReceiptIcon from '@material-ui/icons/Receipt';
import MailIcon from '@material-ui/icons/Mail';
import ChatIcon from '@material-ui/icons/Chat';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import SettingsIcon from '@material-ui/icons/Settings';
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
  { id: 0, label: "Home", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "Dashboard",
    link: "/app/dashboard",
    icon: <BarChartIcon />,
  },
  { id: 2, label: "About Me", link: "/app/dashboard", icon: <AccountBoxIcon /> },
  {
    id: 3,
    label: "Products",
    link: "/app/dashboard",
    icon: <StoreIcon />,
  },
  {
    id: 4,
    label: "Invoices",
    link: "/app/dashboard",
    icon: <ReceiptIcon />
  },
  { id: 5, label: "Mailing Market", link: "/app/dashboard", icon: <MailIcon /> },
  { id: 6, label: "Chat Room", link: "/app/dashboard", icon: <ChatIcon /> },
  { id: 7, label: "Calendar", link: "/app/dashboard", icon: <CalendarTodayIcon /> },
  { id: 8, label: "Help Center", link: "/app/dashboard", icon: <LiveHelpIcon /> },
  { id: 9, label: "Setting", link: "/app/dashboard", icon: <SettingsIcon /> }
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
