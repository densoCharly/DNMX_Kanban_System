import ProductionPlanPage from '../pages/ProductionPlanPage/ProductionPlanPage';
import PPReportPage from '../pages/PPReportPage/PPReportPage';
import PPTeamL from '../pages/PPTeamLPage/PPTeamLPage';
import PlantPage from '../pages/PlantPage/PlantPage';
import DepartmentPage from '../pages/DepartmentPage/DepartmentPage';
import AreaPage from '../pages/AreaPage/AreaPage';
import LinePage from '../pages/LinePage/LinePage';
import ProductPage from '../pages/ProductPage/ProductPage';
import UserPage from '../pages/UserPage/UserPage';
import ComponentPage from '../pages/ComponentPage/ComponentPage';
import HomeFilter from '../pages/Home/HomeFilter';
import TypeSubPage from '../pages/SubassyPages/TypeSubPage';
import TypeProductPage from '../pages/TypeProductPage/TypeProductPage';
import ClientPage from '../pages/ClientPage/ClientPage';
import ProviderPage from '../pages/ProviderPage/ProviderPage';
import BomProduct from '../pages/ProductPage/BomProduct';
import PackagePage from '../pages/PackagePages/PackagePage';
import StockPage from '../pages/PackagePages/StockPage';
import InventoryPage from '../pages/PackagePages/InventoryPage';
import InventoryPagePC from '../pages/PackagePages/InventoryPagePC';
import PackageHistory from '../pages/PackagePages/PackageHistory';
import SubassyPage from '../pages/SubassyPages/SubassyPage';
import BomSubassy from '../pages/SubassyPages/BomSubassy';
import SubInventoryPage from '../pages/SubassyPages/SubInventoryPage';
import InventoryPC from '../pages/SubassyPages/InventoryPC';
import SubassyHistory from '../pages/SubassyPages/SubassyHistoryPage';
import FinishGoodPage from '../pages/FinishGood/FinishGoodPage';
import InventoryFGPage from '../pages/FinishGood/InventoryFGPage';
import HistoryFG from '../pages/FinishGood/HistoryFG';
import ConfigurePage from '../pages/ComponentPage/ConfigurePage';
import ShoppingListPage from '../pages/ShoppingPage/ShoppingListPage';
import BomLocalPage from '../pages/ProductPage/BomLocalPage';
import TrainPage from '../pages/TrainPage/TrainPage';
import AsignPage from '../pages/TrainPage/AsignPage';
import TrainFollow from '../pages/TrainPage/TrainFollow';
import LineRoute from '../pages/TrainPage/LineRoute';
import AbortTrain from '../pages/TrainPage/AbortTrain';

import {
    AccountTreeIcon,
    AppsIcon,
    FlagCircleIcon,
    UserIcon,
    HomeIcon, PlaylistAddIcon, PrecisionManufacturingIcon,
    Inventory2Icon,
    ReceiptLongIcon,
    InventoryIcon,
    HistoryEduIcon,
    HubIcon,
    ChecklistIcon,
    AddShoppingCartIcon,
    RouteIcon,
    DownloadingIcon,
    MapIcon,
    WarningAmberIcon,
    FactoryIcon,
    AddBusinessIcon,
    AddLocationIcon,
    FormatLineSpacingIcon,
    SettingsSuggestionIcon,
    CategoryIcon,
    NaturePeopleIcon,
    HailIcon,
    GridViewICon,
    BikeScooterIcon,
    GroupWorkIcon,
    LibraryAddIcon,
    ExtensionIcon,
    PrintIcon,
    LocalPrintshopIcon,

} from "./Icons";
import PartialPage from '../pages/PartialPage/PartialPage';
import ExtraComponentPage from '../pages/ComponentPage/ExtraComponentPage';
import PartialView from '../pages/PartialPage/PartialView';
import TicketPage from '../pages/SubassyPages/TicketPage';

export const viewerRoutes = [
    {
        index: 10,
        path: "/kanban_system/homeFilter",
        name: "Home",
        icon: "fa fa-rebel",
        component: HomeFilter,
    },
    {
        index: 15,
        path: "/kanban_system/bomproduct",
        name: "BOM Productos",
        icon: "fa fa-th",
        component: BomProduct,
    },
    {
        index: 16,
        path: "/kanban_system/components",
        name: "Componentes",
        icon: "fa fa-cubes",
        component: ComponentPage,
    },
    {
        index: 20,
        path: "/kanban_system/inventoryPC",
        name: "Inventario de Empaque",
        icon: "fa fa-cubes",
        component: InventoryPagePC,
    },
    {
        index: 21,
        path: "/kanban_system/packageHistory",
        name: "Historial Empaque",
        icon: "fa fa-cubes",
        component: PackageHistory,
    },
    {
        index: 25,
        path: "/kanban_system/subinventoryPC",
        name: "Inventario Subensambles",
        icon: "fa fa-cubes",
        component: InventoryPC,
    },
    {
        index: 26,
        path: "/kanban_system/subassyHistory",
        name: "Historial Subensambles",
        icon: "fa fa-cubes",
        component: SubassyHistory,
    },
    {
        index: 28,
        path: "/kanban_system/inventoryFG",
        name: "Inventario Finish Good",
        icon: "fa fa-cubes",
        component: InventoryFGPage,
    },
    {
        index: 29,
        path: "/kanban_system/historyFG",
        name: "Historial Finish Good",
        icon: "fa fa-cubes",
        component: HistoryFG,
    },
];

//types     1 = Plan   2 = Producto    3 = Empaque    4 = subassy   5 = Finish Good     6 = Shopping List

export const homeItem = 
{
    index: 10,
    path: "/kanban_system/homeFilter",
    name: "Home",
    icon: <HomeIcon />,
    component: <HomeFilter />,
    type:1,
};

export const planRoutes = [
    {
        index: 10,
        path: "/kanban_system/homeFilter",
        name: "Home",
        icon: <HomeIcon sx={{color:'white'}} />,
        component: <HomeFilter />,
        type:1,
    },
    {
        index: 11,
        path: "/kanban_system/productionPlan",
        name: "Plan de Producción",
        icon: <PrecisionManufacturingIcon sx={{color:'white'}} />,
        component: <ProductionPlanPage />,
        type:1,
    },
    {
        index: 12,
        path: "/kanban_system/reportProductionPlan",
        name: "Reporte de Plan de Producción",
        icon: <FlagCircleIcon sx={{color:'white'}} />,
        component: <PPReportPage />,
        type:1,
    },
    {
        index: 13,
        path: "/kanban_system/productionPlanTL",
        name: "Plan de Producción TL",
        icon: <FlagCircleIcon sx={{color:'white'}} />,
        component: <PPTeamL />,
        type:1,
    },
];

export const productRoutes = [
    {
        index: 14,
        path: "/kanban_system/products",
        name: "Productos",
        icon: <PlaylistAddIcon sx={{color:'white'}}/>,
        component: <ProductPage />,
        type:2,
    },
    {
        index: 15,
        path: "/kanban_system/bomproduct",
        name: "BOM Productos",
        icon: <AccountTreeIcon sx={{color:'white'}}/>,
        component: <BomProduct />,
        type:2,
    },
    {
        index: 16,
        path: "/kanban_system/components",
        name: "Componentes",
        icon: <AppsIcon sx={{color:'white'}}/>,
        component: <ComponentPage />,
        type:2,
    },
];

export const packageRoutes = [
    {
        index: 17,
        path: "/kanban_system/package",
        name: "Empaque",
        icon: <Inventory2Icon sx={{color:'white'}}/>,
        component: <PackagePage />,
        type:3,
    },
    {
        index: 18,
        path: "/kanban_system/stockPackage",
        name: "Recepción Empaque",
        icon: <ReceiptLongIcon sx={{color:'white'}}/>,
        component: <StockPage />,
        type:3,
    },
    {
        index: 19,
        path: "/kanban_system/inventoryPackage",
        name: "Inventario Empaque",
        icon: <InventoryIcon sx={{color:'white'}}/>,
        component: <InventoryPage />,
        type:3,
    },
    {
        index: 20,
        path: "/kanban_system/inventoryPC",
        name: "Inventario de Empaque PC",
        icon: <InventoryIcon sx={{color:'white'}}/>,
        component: <InventoryPagePC />,
        type:3,
    },
    {
        index: 21,
        path: "/kanban_system/packageHistory",
        name: "Historial Empaque",
        icon: <HistoryEduIcon sx={{color:'white'}}/>,
        component: <PackageHistory />,
        type:3,
    },
];

export const subassyRoutes = [
    {
        index: 22,
        path: "/kanban_system/subassy",
        name: "Subensambles",
        icon: <HubIcon sx={{color:'white'}}/>,
        component: <SubassyPage />,
        type:4,
    },
    {
        index: 23,
        path: "/kanban_system/bomsubassy",
        name: "BOM Subensambles",
        icon: <AccountTreeIcon sx={{color:'white'}}/>,
        component: <BomSubassy />,
        type:4,
    },
    {
        index: 24,
        path: "/kanban_system/subinventory",
        name: "Subensambles TL",
        icon: <HubIcon sx={{color:'white'}}/>,
        component: <SubInventoryPage />,
        type:4,
    },
    {
        index: 25,
        path: "/kanban_system/subinventoryPC",
        name: "Inventario Subensambles",
        icon: <InventoryIcon sx={{color:'white'}}/>,
        component: <InventoryPC />,
        type:4,
    },
    {
        index: 26,
        path: "/kanban_system/subassyHistory",
        name: "Historial Subensambles",
        icon: <HistoryEduIcon sx={{color:'white'}}/>,
        component: <SubassyHistory />,
        type:4,
    },
    {
        index: 41,
        path: "/kanban_system/subassyTicket",
        name: "Ticket Subensambles",
        icon: <PrintIcon sx={{color:'white'}}/>,
        component: <TicketPage />,
        type:4,
    },
];

export const finishRoutes = [
    {
        index: 27,
        path: "/kanban_system/finishGood",
        name: "Finish Good Carga",
        icon: <ChecklistIcon sx={{color:'white'}}/>,
        component: <FinishGoodPage />,
        type:5,
    },
    {
        index: 28,
        path: "/kanban_system/inventoryFG",
        name: "Finish Good",
        icon: <ChecklistIcon sx={{color:'white'}}/>,
        component: <InventoryFGPage />,
        type:5,
    },
    {
        index: 29,
        path: "/kanban_system/historyFG",
        name: "Historial Finish Good",
        icon: <HistoryEduIcon sx={{color:'white'}}/>,
        component: <HistoryFG />,
        type:5,
    },
];

export const shoppingRoutes = [
    {
        index: 31,
        path: "/kanban_system/shoppingLists",
        name: "Materialista Logistica",
        icon: <AddShoppingCartIcon sx={{color:'white'}}/>,
        component: <ShoppingListPage />,
        type:6,
    },
    {
        index: 34,
        path: "/kanban_system/shoppingRoute",
        name: "Materialista Ruta",
        icon: <RouteIcon sx={{color:'white'}}/>,
        component: <AsignPage />,
        type:6,
    },
    {
        index: 36,
        path: "/kanban_system/lineRoute",
        name: "Materialista Linea",
        icon: <DownloadingIcon sx={{color:'white'}}/>,
        component: <LineRoute />,
        type:6,
    },
    {
        index: 35,
        path: "/kanban_system/trainFollow",
        name: "Seguimiento de Trenes",
        icon: <MapIcon sx={{color:'white'}}/>,
        component: <TrainFollow />,
        type:6,
    },
    {
        index: 37,
        path: "/kanban_system/abortTrain",
        name: "Abortar Viaje",
        icon: <WarningAmberIcon sx={{color:'white'}}/>,
        component: <AbortTrain />,
        type:6,
    },
    {
        index: 38,
        path: "/kanban_system/partials",
        name: "Parciales en Linea",
        icon: <GroupWorkIcon sx={{color:'white'}}/>,
        component: <PartialPage />
    },
    {
        index: 39,
        path: "/kanban_system/extraComp",
        name: "Material Extra",
        icon: <LibraryAddIcon sx={{color:'white'}}/>,
        component: <ExtraComponentPage />
    },
    {
        index: 40,
        path: "/kanban_system/partialView",
        name: "Inventario de Parciales",
        icon: <ExtensionIcon sx={{color:'white'}}/>,
        component: <PartialView />
    },
];

export const adminRoutes = [
    {
        index: 10,
        path: "/kanban_system/homeFilter",
        name: "Home",
        icon: <HomeIcon />,
        component: <HomeFilter />,
        type:1,
    },
    {
        index: 11,
        path: "/kanban_system/productionPlan",
        name: "Plan de Producción",
        icon: <PrecisionManufacturingIcon />,
        component: <ProductionPlanPage />,
        type:1,
    },
    {
        index: 12,
        path: "/kanban_system/reportProductionPlan",
        name: "Reporte de Plan de Producción",
        icon: <FlagCircleIcon />,
        component: <PPReportPage />,
        type:1,
    },
    {
        index: 13,
        path: "/kanban_system/productionPlanTL",
        name: "Plan de Producción TL",
        icon: <FlagCircleIcon />,
        component: <PPTeamL />,
        type:1,
    },
    {
        index: 14,
        path: "/kanban_system/products",
        name: "Productos",
        icon: <PlaylistAddIcon />,
        component: <ProductPage />,
        type:2,
    },
    {
        index: 15,
        path: "/kanban_system/bomproduct",
        name: "BOM Productos",
        icon: <AccountTreeIcon />,
        component: <BomProduct />,
        type:2,
    },
    {
        index: 16,
        path: "/kanban_system/components",
        name: "Componentes",
        icon: <AppsIcon />,
        component: <ComponentPage />,
        type:2,
    },
    {
        index: 17,
        path: "/kanban_system/package",
        name: "Empaque",
        icon: <Inventory2Icon />,
        component: <PackagePage />,
        type:3,
    },
    {
        index: 18,
        path: "/kanban_system/stockPackage",
        name: "Recepción Empaque",
        icon: <ReceiptLongIcon />,
        component: <StockPage />,
        type:3,
    },
    {
        index: 19,
        path: "/kanban_system/inventoryPackage",
        name: "Inventario Empaque",
        icon: <InventoryIcon />,
        component: <InventoryPage />,
        type:3,
    },
    {
        index: 20,
        path: "/kanban_system/inventoryPC",
        name: "Inventario de Empaque PC",
        icon: <InventoryIcon />,
        component: <InventoryPagePC />,
        type:3,
    },
    {
        index: 21,
        path: "/kanban_system/packageHistory",
        name: "Historial Empaque",
        icon: <HistoryEduIcon />,
        component: <PackageHistory />,
        type:3,
    },
    {
        index: 22,
        path: "/kanban_system/subassy",
        name: "Subensambles",
        icon: <HubIcon />,
        component: <SubassyPage />,
        type:4,
    },
    {
        index: 23,
        path: "/kanban_system/bomsubassy",
        name: "BOM Subensambles",
        icon: <AccountTreeIcon />,
        component: <BomSubassy />,
        type:4,
    },
    {
        index: 24,
        path: "/kanban_system/subinventory",
        name: "Subensambles TL",
        icon: <HubIcon />,
        component: <SubInventoryPage />,
        type:4,
    },
    {
        index: 25,
        path: "/kanban_system/subinventoryPC",
        name: "Inventario Subensambles",
        icon: <InventoryIcon />,
        component: <InventoryPC />,
        type:4,
    },
    {
        index: 26,
        path: "/kanban_system/subassyHistory",
        name: "Historial Subensambles",
        icon: <HistoryEduIcon />,
        component: <SubassyHistory />,
        type:4,
    },
    {
        index: 27,
        path: "/kanban_system/finishGood",
        name: "Finish Good Carga",
        icon: <ChecklistIcon />,
        component: <FinishGoodPage />,
        type:5,
    },
    {
        index: 28,
        path: "/kanban_system/inventoryFG",
        name: "Finish Good",
        icon: <ChecklistIcon />,
        component: <InventoryFGPage />,
        type:5,
    },
    {
        index: 29,
        path: "/kanban_system/historyFG",
        name: "Historial Finish Good",
        icon: <HistoryEduIcon />,
        component: <HistoryFG />,
        type:5,
    },
    {
        index: 31,
        path: "/kanban_system/shoppingLists",
        name: "Materialista Logistica",
        icon: <AddShoppingCartIcon />,
        component: <ShoppingListPage />,
        type:6,
    },
    {
        index: 34,
        path: "/kanban_system/shoppingRoute",
        name: "Materialista Ruta",
        icon: <RouteIcon />,
        component: <AsignPage />,
        type:6,
    },
    {
        index: 36,
        path: "/kanban_system/lineRoute",
        name: "Materialista Linea",
        icon: <DownloadingIcon />,
        component: <LineRoute />,
        type:6,
    },
    {
        index: 35,
        path: "/kanban_system/trainFollow",
        name: "Seguimiento de Trenes",
        icon: <MapIcon />,
        component: <TrainFollow />,
        type:6,
    },
    {
        index: 37,
        path: "/kanban_system/abortTrain",
        name: "Abortar Viaje",
        icon: <WarningAmberIcon />,
        component: <AbortTrain />,
        type:6,
    },
];

export const developRoutes = [
    {
        index: 1,
        path: "/kanban_system/users",
        name: "Usuarios",
        icon: <UserIcon sx={{color:'white'}} />,
        component: UserPage,
    },
    {
        index: 2,
        path: "/kanban_system/plants",
        name: "Plantas",
        icon: <FactoryIcon sx={{color:'white'}} />,
        component: PlantPage,
    },
    {
        index: 3,
        path: "/kanban_system/departments",
        name: "Departamentos",
        icon: <AddBusinessIcon sx={{color:'white'}} />,
        component: DepartmentPage,
    },
    {
        index: 4,
        path: "/kanban_system/areas",
        name: "Areas",
        icon: <AddLocationIcon sx={{color:'white'}} />,
        component: AreaPage,
    },
    {
        index: 5,
        path: "/kanban_system/lines",
        name: "Lineas",
        icon: <FormatLineSpacingIcon sx={{color:'white'}} />,
        component: LinePage,
    },
    {
        index: 6,
        path: "/kanban_system/type_subassy",
        name: "Tipos Subensambles",
        icon: <SettingsSuggestionIcon sx={{color:'white'}} />,
        component: TypeSubPage,
    },
    {
        index: 7,
        path: "/kanban_system/type_product",
        name: "Tipos de Producto",
        icon: <CategoryIcon sx={{color:'white'}} />,
        component: TypeProductPage,
    },
    {
        index: 8,
        path: "/kanban_system/client",
        name: "Clientes",
        icon: <HailIcon sx={{color:'white'}} />,
        component: ClientPage,
    },
    {
        index: 9,
        path: "/kanban_system/provider",
        name: "Proveedores Empaque",
        icon: <NaturePeopleIcon sx={{color:'white'}} />,
        component: ProviderPage,
    },
    {
        index: 32,
        path: "/kanban_system/localBom",
        name: "BOM Local",
        icon: <GridViewICon sx={{color:'white'}} />,
        component: BomLocalPage
    },
    {
        index: 33,
        path: "/kanban_system/train",
        name: "Trenes y Carros",
        icon: <BikeScooterIcon sx={{color:'white'}} />,
        component: TrainPage
    },
    {
        index: 34,
        path: "/kanban_system/PrinterPage",
        name: "Impresoras",
        icon: <LocalPrintshopIcon sx={{color:'white'}} />,
        component: TrainPage
    },
    
];

export const materialistRoutes = [
    {
        index: 10,
        path: "/kanban_system/homeFilter",
        name: "Home",
        icon: "fa fa-rebel",
        component: HomeFilter,
    },
    {
        index: 31,
        path: "/kanban_system/shoppingLists",
        name: "Shopping Lists",
        icon: "fa fa-list",
        component: ShoppingListPage
    },
    {
        index: 34,
        path: "/kanban_system/shoppingRoute",
        name: "Asignar Shoppings",
        icon: "fa fa-list",
        component: AsignPage
    },
];

export const finalAssyRoutes = [
    {
        index: 10,
        path: "/kanban_system/homeFilter",
        name: "Home",
        icon: "fa fa-rebel",
        component: HomeFilter,
    },
    {
        index: 13,
        path: "/kanban_system/productionPlanTL",
        name: "Plan de Producción TL",
        icon: "fa fa-file-o",
        component: PPTeamL,
    },
    {
        index: 15,
        path: "/kanban_system/bomproduct",
        name: "BOM Productos",
        icon: "fa fa-th",
        component: BomProduct,
    },
    {
        index: 16,
        path: "/kanban_system/components",
        name: "Componentes",
        icon: "fa fa-cubes",
        component: ComponentPage,
    },
    {
        index: 20,
        path: "/kanban_system/inventoryPC",
        name: "Inventario de Empaque",
        icon: "fa fa-cubes",
        component: InventoryPagePC,
    },
    {
        index: 21,
        path: "/kanban_system/packageHistory",
        name: "Historial Empaque",
        icon: "fa fa-cubes",
        component: PackageHistory,
    },
    {
        index: 25,
        path: "/kanban_system/subinventoryPC",
        name: "Inventario Subensambles",
        icon: "fa fa-cubes",
        component: InventoryPC,
    },
    {
        index: 26,
        path: "/kanban_system/subassyHistory",
        name: "Historial Subensambles",
        icon: "fa fa-cubes",
        component: SubassyHistory,
    },
    {
        index: 28,
        path: "/kanban_system/inventoryFG",
        name: "Inventario Finish Good",
        icon: "fa fa-cubes",
        component: InventoryFGPage,
    },
    {
        index: 29,
        path: "/kanban_system/historyFG",
        name: "Historial Finish Good",
        icon: "fa fa-cubes",
        component: HistoryFG,
    },
    {
        index: 37,
        path: "/kanban_system/abortTrain",
        name: "Abortar Viaje",
        icon: "fa fa-warning",
        component: AbortTrain
    },
];


export const plannerRoutes = [
    {
        index: 10,
        path: "/kanban_system/homeFilter",
        name: "Home",
        icon: "fa fa-rebel",
        component: HomeFilter,
    },
    {
        index: 11,
        path: "/kanban_system/productionPlan",
        name: "Plan de Producción",
        icon: "fa fa-file-o",
        component: ProductionPlanPage,
    },
    {
        index: 12,
        path: "/kanban_system/reportProductionPlan",
        name: "Reporte de Plan de Producción",
        icon: "fa fa-file-o",
        component: PPReportPage,
    },
    {
        index: 14,
        path: "/kanban_system/products",
        name: "Productos",
        icon: "fa fa-th",
        component: ProductPage,
    },
    {
        index: 15,
        path: "/kanban_system/bomproduct",
        name: "BOM Productos",
        icon: "fa fa-th",
        component: BomProduct,
    },
    {
        index: 16,
        path: "/kanban_system/components",
        name: "Componentes",
        icon: "fa fa-cubes",
        component: ComponentPage,
    },
    {
        index: 17,
        path: "/kanban_system/package",
        name: "Empaque",
        icon: "fa fa-cubes",
        component: PackagePage,
    },
    {
        index: 20,
        path: "/kanban_system/inventoryPC",
        name: "Inventario de Empaque",
        icon: "fa fa-cubes",
        component: InventoryPagePC,
    },
    {
        index: 21,
        path: "/kanban_system/packageHistory",
        name: "Historial Empaque",
        icon: "fa fa-cubes",
        component: PackageHistory,
    },
    {
        index: 22,
        path: "/kanban_system/subassy",
        name: "Subensambles",
        icon: "fa fa-cubes",
        component: SubassyPage,
    },
    {
        index: 23,
        path: "/kanban_system/bomsubassy",
        name: "BOM Subensambles",
        icon: "fa fa-cubes",
        component: BomSubassy,
    },
    {
        index: 25,
        path: "/kanban_system/subinventoryPC",
        name: "Inventario Subensambles",
        icon: "fa fa-cubes",
        component: InventoryPC,
    },
    {
        index: 26,
        path: "/kanban_system/subassyHistory",
        name: "Historial Subensambles",
        icon: "fa fa-cubes",
        component: SubassyHistory,
    },
    {
        index: 28,
        path: "/kanban_system/inventoryFG",
        name: "Inventario Finish Good",
        icon: "fa fa-cubes",
        component: InventoryFGPage,
    },
    {
        index: 29,
        path: "/kanban_system/historyFG",
        name: "Historial Finish Good",
        icon: "fa fa-cubes",
        component: HistoryFG,
    },
];


export const shippingRoutes = [
    {
        index: 10,
        path: "/kanban_system/homeFilter",
        name: "Home",
        icon: "fa fa-rebel",
        component: HomeFilter,
    },
    {
        index: 17,
        path: "/kanban_system/package",
        name: "Empaque",
        icon: "fa fa-cubes",
        component: PackagePage,
    },
    {
        index: 18,
        path: "/kanban_system/stockPackage",
        name: "Recepción Empaque",
        icon: "fa fa-cubes",
        component: StockPage,
    },
    {
        index: 19,
        path: "/kanban_system/inventoryPackage",
        name: "Carga de Empaque",
        icon: "fa fa-cubes",
        component: InventoryPage,
    },
    {
        index: 20,
        path: "/kanban_system/inventoryPC",
        name: "Inventario de Empaque",
        icon: "fa fa-cubes",
        component: InventoryPagePC,
    },
    {
        index: 21,
        path: "/kanban_system/packageHistory",
        name: "Historial Empaque",
        icon: "fa fa-cubes",
        component: PackageHistory,
    },
    {
        index: 25,
        path: "/kanban_system/subinventoryPC",
        name: "Inventario Subensambles",
        icon: "fa fa-cubes",
        component: InventoryPC,
    },
    {
        index: 26,
        path: "/kanban_system/subassyHistory",
        name: "Historial Subensambles",
        icon: "fa fa-cubes",
        component: SubassyHistory,
    },
    {
        index: 27,
        path: "/kanban_system/finishGood",
        name: "Finish Good Carga",
        icon: "fa fa-cubes",
        component: FinishGoodPage,
    },
    {
        index: 29,
        path: "/kanban_system/historyFG",
        name: "Historial Finish Good",
        icon: "fa fa-cubes",
        component: HistoryFG,
    },
];