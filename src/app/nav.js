import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MedicationIcon from "@mui/icons-material/Medication";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PersonIcon from "@mui/icons-material/Person";
import Inventory2Icon from "@mui/icons-material/Inventory2";
const sidnav = [
  {
    name: "Dashboard",
    file: "dashboard",
    navigations: true,
    live: true,
    buttons: [],
    icon: <DashboardIcon style={{ color: "white" }} />,
    link_to: "/dashboard",
  },

  {
    name: "Business",
    file: "orders",
    navigations: true,
    live: true,
    buttons: [],
    icon: <BusinessCenterIcon style={{ color: "white" }} />,
    link_to: "/businesses",
  },
  {
    name: "Stores",
    file: "stores",
    navigations: true,
    live: true,
    buttons: [],
    icon: <MedicationIcon style={{ color: "white" }} />,
    link_to: "/stores",
  },
  {
    name: "Orders",
    file: "orders",
    navigations: true,
    live: true,
    buttons: [],
    icon: <BorderColorIcon style={{ color: "white" }} />,
    link_to: "/orders",
  },
  {
    name: "Products",
    file: "products",
    navigations: true,
    live: true,
    buttons: [],
    icon: <Inventory2Icon style={{ color: "white" }} />,
    link_to: "/products",
  },

  {
    name: "Business Members",
    file: "orders",
    navigations: true,
    live: true,
    buttons: [],
    icon: <PersonIcon style={{ color: "white" }} />,
    link_to: "/members",
  },
];
export default sidnav;
