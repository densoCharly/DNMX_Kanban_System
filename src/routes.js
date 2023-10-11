import ProductionPlanPage from './pages/ProductionPlanPage/ProductionPlanPage';
import PPReportPage from './pages/PPReportPage/PPReportPage';
import PPTeamL from './pages/PPTeamLPage/PPTeamLPage';
import PlantPage from './pages/PlantPage/PlantPage';
import DepartmentPage from './pages/DepartmentPage/DepartmentPage';
import AreaPage from './pages/AreaPage/AreaPage';
import LinePage from './pages/LinePage/LinePage';
import ProductPage from './pages/ProductPage/ProductPage';
import UserPage from './pages/UserPage/UserPage';
import ComponentPage from './pages/ComponentPage/ComponentPage';
import HomeFilter from './pages/Home/HomeFilter';
import TypeSubPage from './pages/SubassyPages/TypeSubPage';
import TypeProductPage from './pages/TypeProductPage/TypeProductPage';
import ClientPage from './pages/ClientPage/ClientPage';
import ProviderPage from './pages/ProviderPage/ProviderPage';
import BomProduct from './pages/ProductPage/BomProduct';
import PackagePage from './pages/PackagePages/PackagePage';
import StockPage from './pages/PackagePages/StockPage';
import InventoryPage from './pages/PackagePages/InventoryPage';
import InventoryPagePC from './pages/PackagePages/InventoryPagePC';
import PackageHistory from './pages/PackagePages/PackageHistory';
import SubassyPage from './pages/SubassyPages/SubassyPage';
import BomSubassy from './pages/SubassyPages/BomSubassy';
import SubInventoryPage from './pages/SubassyPages/SubInventoryPage';
import InventoryPC from './pages/SubassyPages/InventoryPC';
import SubassyHistory from './pages/SubassyPages/SubassyHistoryPage';
import FinishGoodPage from './pages/FinishGood/FinishGoodPage';
import InventoryFGPage from './pages/FinishGood/InventoryFGPage';
import HistoryFG from './pages/FinishGood/HistoryFG';
import EditProfilePage from './pages/UserPage/EditProfilePage';
import ConfigurePage from './pages/ComponentPage/ConfigurePage';
import ShoppingListPage from './pages/ShoppingPage/ShoppingListPage';
import BomLocalPage from './pages/ProductPage/BomLocalPage';
import TrainPage from './pages/TrainPage/TrainPage';
import AsignPage from './pages/TrainPage/AsignPage';
import TrainFollow from './pages/TrainPage/TrainFollow';
import LineRoute from './pages/TrainPage/LineRoute';
import AbortTrain from './pages/TrainPage/AbortTrain';
import PartialPage from './pages/PartialPage/PartialPage';
import ExtraComponentPage from './pages/ComponentPage/ExtraComponentPage';

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
        index: 40,
        path: "/kanban_system/viewReportPlan",
        name: "Reporte de Plan de Producción",
        icon: "fa fa-file-o",
        component: PPReportPage,
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
        index: 40,
        path: "/kanban_system/partialView",
        name: "Inventario de Parciales",
        icon: "fa fa-cubes",
        component: PartialPage
    },
];

export const adminRoutes = [
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
        index: 40,
        path: "/kanban_system/viewReportPlan",
        name: "Ver Reporte de Plan de Producción",
        icon: "fa fa-file-o",
        component: PPReportPage,
    },
    {
        index: 13,
        path: "/kanban_system/productionPlanTL",
        name: "Plan de Producción TL",
        icon: "fa fa-file-o",
        component: PPTeamL,
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
        index: 18,
        path: "/kanban_system/stockPackage",
        name: "Recepción Empaque",
        icon: "fa fa-cubes",
        component: StockPage,
    },
    {
        index: 19,
        path: "/kanban_system/inventoryPackage",
        name: "Inventario Empaque",
        icon: "fa fa-cubes",
        component: InventoryPage,
    },
    {
        index: 20,
        path: "/kanban_system/inventoryPC",
        name: "Inventario de Empaque PC",
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
        index: 24,
        path: "/kanban_system/subinventory",
        name: "Subensambles TL",
        icon: "fa fa-cubes",
        component: SubInventoryPage,
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
        index: 28,
        path: "/kanban_system/inventoryFG",
        name: "Finish Good",
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
        index: 31,
        path: "/kanban_system/shoppingLists",
        name: "Materialista Logistica",
        icon: "fa fa-list",
        component: ShoppingListPage
    },
    {
        index: 34,
        path: "/kanban_system/shoppingRoute",
        name: "Materialista Ruta",
        icon: "fa fa-list",
        component: AsignPage
    },
    {
        index: 36,
        path: "/kanban_system/lineRoute",
        name: "Materialista Linea",
        icon: "fa fa-list",
        component: LineRoute
    },
    {
        index: 35,
        path: "/kanban_system/trainFollow",
        name: "Seguimiento de Trenes",
        icon: "fa fa-list",
        component: TrainFollow
    },
    {
        index: 37,
        path: "/kanban_system/abortTrain",
        name: "Abortar Viaje",
        icon: "fa fa-warning",
        component: AbortTrain
    },
    {
        index: 38,
        path: "/kanban_system/partials",
        name: "Parciales en Linea",
        icon: "fa fa-cubes",
        component: PartialPage
    },
    {
        index: 39,
        path: "/kanban_system/extraComp",
        name: "Material Extra",
        icon: "fa fa-cubes",
        component: ExtraComponentPage
    },
 
];

export const developRoutes = [
    {
        index: 1,
        path: "/kanban_system/users",
        name: "Usuarios",
        icon: "fa fa-users",
        component: UserPage,
    },
    {
        index: 2,
        path: "/kanban_system/plants",
        name: "Plantas",
        icon: "fa fa-laptop",
        component: PlantPage,
    },
    {
        index: 3,
        path: "/kanban_system/departments",
        name: "Departamentos",
        icon: "fa fa-laptop",
        component: DepartmentPage,
    },
    {
        index: 4,
        path: "/kanban_system/areas",
        name: "Areas",
        icon: "fa fa-laptop",
        component: AreaPage,
    },
    {
        index: 5,
        path: "/kanban_system/lines",
        name: "Lineas",
        icon: "fa fa-laptop",
        component: LinePage,
    },
    {
        index: 6,
        path: "/kanban_system/type_subassy",
        name: "Tipos Subensambles",
        icon: "fa fa-laptop",
        component: TypeSubPage,
    },
    {
        index: 7,
        path: "/kanban_system/type_product",
        name: "Tipos de Producto",
        icon: "fa fa-laptop",
        component: TypeProductPage,
    },
    {
        index: 8,
        path: "/kanban_system/client",
        name: "Clientes",
        icon: "fa fa-laptop",
        component: ClientPage,
    },
    {
        index: 9,
        path: "/kanban_system/provider",
        name: "Proveedores Empaque",
        icon: "fa fa-laptop",
        component: ProviderPage,
    },
    {
        index: 30,
        path: "/kanban_system/configureComponent",
        name: "Componentes Importados",
        icon: "fa fa-laptop",
        component: ConfigurePage
    },
    {
        index: 32,
        path: "/kanban_system/localBom",
        name: "BOM Local",
        icon: "fa fa-laptop",
        component: BomLocalPage
    },
    {
        index: 33,
        path: "/kanban_system/train",
        name: "Trenes y Carros",
        icon: "fa fa-laptop",
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
        name: "Materialista Logistica",
        icon: "fa fa-list",
        component: ShoppingListPage
    },
    {
        index: 34,
        path: "/kanban_system/shoppingRoute",
        name: "Materialista Ruta",
        icon: "fa fa-list",
        component: AsignPage
    },
    {
        index: 36,
        path: "/kanban_system/lineRoute",
        name: "Materialista Linea",
        icon: "fa fa-list",
        component: LineRoute
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
        index: 38,
        path: "/kanban_system/extraComp",
        name: "Material Extra",
        icon: "fa fa-cubes",
        component: ExtraComponentPage
    },
    {
        index: 38,
        path: "/kanban_system/partials",
        name: "Parciales en Linea",
        icon: "fa fa-cubes",
        component: PartialPage
    },
    {
        index: 35,
        path: "/kanban_system/trainFollow",
        name: "Seguimiento de Trenes",
        icon: "fa fa-list",
        component: TrainFollow
    },
    {
        index: 37,
        path: "/kanban_system/abortTrain",
        name: "Abortar Viaje",
        icon: "fa fa-warning",
        component: AbortTrain
    },
    {
        index: 39,
        path: "/kanban_system/extraComp",
        name: "Material Extra",
        icon: "fa fa-puzzle-piece",
        component: ExtraComponentPage
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