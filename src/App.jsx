import React from 'react';
//import AppRouter from './router/AppRouter';
import ProductionPlanPage from './pages/ProductionPlanPage/ProductionPlanPage';
import PPReportPage from './pages/PPReportPage/PPReportPage';
import "../src/pages/PackagePages/Package.css";
//import Navbar from './components/Navbar';
//import Sidebar from './components/Sidebar';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import {store} from './store';
import PPTeamL from './pages/PPTeamLPage/PPTeamLPage';
import PlantPage from './pages/PlantPage/PlantPage';
import DepartmentPage from './pages/DepartmentPage/DepartmentPage';
import AreaPage from './pages/AreaPage/AreaPage';
import LinePage from './pages/LinePage/LinePage';
import ProductPage from './pages/ProductPage/ProductPage';
import UserPage from './pages/UserPage/UserPage';
import ComponentPage from './pages/ComponentPage/ComponentPage';
//import LoginRoute from './router/login/LoginRoute';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Home/HomePage';
import Impresoras from './pages/PrinterPage/PrinterPage';
import HomeFilter from './pages/Home/HomeFilter';
import HomeL2 from './pages/Home/HomePageL2';
import PackagePage from './pages/PackagePages/PackagePage';
import StockPage from './pages/PackagePages/StockPage';
import InventoryPage from './pages/PackagePages/InventoryPage';
import InventoryPagePC from './pages/PackagePages/InventoryPagePC';
import EditProfilePage from './pages/UserPage/EditProfilePage';
import SubassyPage from './pages/SubassyPages/SubassyPage';
import SubInventoryPage from './pages/SubassyPages/SubInventoryPage';
import InventoryPC from './pages/SubassyPages/InventoryPC';
import BomProduct from './pages/ProductPage/BomProduct';
import BomSubassy from './pages/SubassyPages/BomSubassy';
import ProviderPage from './pages/ProviderPage/ProviderPage';
import ClientPage from './pages/ClientPage/ClientPage';
import TypeSubPage from './pages/SubassyPages/TypeSubPage';
import TypeProductPage from './pages/TypeProductPage/TypeProductPage';
import SubassyHistory from './pages/SubassyPages/SubassyHistoryPage';
import FinishGoodPage from './pages/FinishGood/FinishGoodPage';
import InventoryFGPage from './pages/FinishGood/InventoryFGPage';
import HistoryFG from './pages/FinishGood/HistoryFG';
import PackageHistory from './pages/PackagePages/PackageHistory';
import SidebarComp from './components/SidebarComp';
import ShoppingListPage from './pages/ShoppingPage/ShoppingListPage';
import ConfigurePage from './pages/ComponentPage/ConfigurePage';
import BomLocalPage from './pages/ProductPage/BomLocalPage';
import TrainPage from './pages/TrainPage/TrainPage';
import TrainFollow from './pages/TrainPage/TrainFollow';
import ShoppingRoute from './pages/ShoppingPage/ShoppingRoute';
import LineRoute from './pages/TrainPage/LineRoute';
import ChatSide from './components/ChatSide';
import ChatNav from './components/ChatNav';
import AbortTrain from './pages/TrainPage/AbortTrain';
import ViewReportPage from './pages/PPReportPage/ViewReportPage';
import ExtraComponentPage from './pages/ComponentPage/ExtraComponentPage';
import PartialPage from './pages/PartialPage/PartialPage';
import PartialView from './pages/PartialPage/PartialView';
import NotifyProduct from './pages/TypeProductPage/NotifyProduct';
import TicketPage from './pages/SubassyPages/TicketPage';
import PrinterPage from './pages/PrinterPage/PrinterPage';

const App = () => {
  // if(localStorage.getItem('token')){
  //   return <Redirect to='/login' />
  // }
  
  return (
    <Provider store={store}>
      <Router basename='../kanban_system/'>

        {/* <Route exact path='/login' component={LoginPage} />
        { !localStorage.getItem('token') ? <LoginPage /> :   */}
          <div className="App">      
            <div className="App-container" >
            {/* <div className="App-container" id="app" style={({ height: "100vh" }, { display: "flex", flexDirection: "row" })}> */}
              {/* <Navbar /> */}
              <SidebarComp />
              {/* <ChatNav /> */}
                <Switch>
                  <Route exact path='/kanban_system/home' component={HomePage} />
                  <Route exact path='/kanban_system/homeFilter' component={HomeFilter} />
                  <Route exact path='/kanban_system/homeL2' component={HomeL2} />
                  <Route exact path='/kanban_system/productionPlan' component={ProductionPlanPage} />
                  <Route exact path='/kanban_system/reportProductionPlan' component={PPReportPage} />
                  <Route exact path='/kanban_system/viewReportPlan' component={ViewReportPage} />
                  <Route exact path='/kanban_system/productionPlanTL' component={PPTeamL} />
                  <Route exact path='/kanban_system/plants' component={PlantPage} />
                  <Route exact path='/kanban_system/departments' component={DepartmentPage} />
                  <Route exact path='/kanban_system/areas' component={AreaPage} />
                  <Route exact path='/kanban_system/lines' component={LinePage} />
                  <Route exact path='/kanban_system/products' component={ProductPage} />
                  <Route exact path='/kanban_system/users' component={UserPage} />
                  <Route exact path='/kanban_system/components' component={ComponentPage} />
                  <Route exact path='/kanban_system/login' component={LoginPage} />
                  <Route exact path='/kanban_system/' component={HomeFilter} />
                  <Route exact path="/kanban_system/package" component={PackagePage} />
                  <Route exact path='/kanban_system/stockPackage' component={StockPage} />
                  <Route exact path='/kanban_system/inventoryPackage' component={InventoryPage} />
                  <Route exact path='/kanban_system/inventoryPC' component={InventoryPagePC} />
                  <Route exact path='/kanban_system/editProfile' component={EditProfilePage} />
                  <Route exact path='/kanban_system/subassy' component={SubassyPage} />
                  <Route exact path='/kanban_system/subinventory' component={SubInventoryPage} />
                  <Route exact path='/kanban_system/subinventoryPC' component={InventoryPC} />
                  <Route exact path='/kanban_system/bomproduct' component={BomProduct} />
                  <Route exact path='/kanban_system/bomsubassy' component={BomSubassy} />
                  <Route exact path='/kanban_system/provider' component={ProviderPage} />
                  <Route exact path='/kanban_system/client' component={ClientPage} />
                  <Route exact path='/kanban_system/type_subassy' component={TypeSubPage} />
                  <Route exact path='/kanban_system/type_product' component={TypeProductPage} />
                  <Route exact path='/kanban_system/subassyHistory' component={SubassyHistory} />
                  <Route exact path='/kanban_system/finishGood' component={FinishGoodPage} />
                  <Route exact path='/kanban_system/inventoryFG' component={InventoryFGPage} />
                  <Route exact path='/kanban_system/historyFG' component={HistoryFG} />
                  <Route exact path='/kanban_system/packageHistory' component={PackageHistory} />
                  <Route exact path='/kanban_system/configureComponent' component={ConfigurePage} />
                  <Route exact path='/kanban_system/shoppingLists' component={ShoppingListPage} />
                  <Route exact path='/kanban_system/localBOM' component={BomLocalPage} />
                  <Route exact path='/kanban_system/train' component={TrainPage} />
                  <Route exact path='/kanban_system/trainFollow' component={TrainFollow} />
                  <Route exact path='/kanban_system/shoppingRoute' component={ShoppingRoute} />
                  <Route exact path='/kanban_system/lineRoute' component={LineRoute} />
                  <Route exact path='/kanban_system/abortTrain' component={AbortTrain} />
                  <Route exact path='/kanban_system/extraComp' component={ExtraComponentPage} />
                  <Route exact path='/kanban_system/partials' component={PartialPage} />
                  <Route exact path='/kanban_system/partialView' component={PartialView} />
                  <Route exact path='/kanban_system/notifyProduct' component={NotifyProduct} />
                  <Route exact path='/kanban_system/subassyTicket' component={TicketPage} />
                  <Route exacr path='/kanban_system/printers' component={PrinterPage} />
                  <Route exact path='/kanban_system/PrinterPage' component={Impresoras} />
                  <Redirect from='*' to='/kanban_system/login' />
                </Switch>
            </div>
          </div>
        
        </Router>
    </Provider>
  );
}

export default App
