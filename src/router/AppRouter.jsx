import React from 'react';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
import PrivateRouter from './private/PrivateRoute';
import EspecialistPCRouter from './private/EspecialistPCRoute';
import AdminRouter from './private/AdminRoute';
import LoginRoute from './login/LoginRoute';
//import {HomePage,LoginPage,AreaPage, PageNotFound, PlantPage, DepartmentPage, ComponentPage,UsersPage, LinePage, ProductPage, EmployeePage, ProductionPlanPage, PPTeamLPage, PPReportPage } from '../pages';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import AreaPage from '../pages/AreaPage/AreaPage';
import PlantPage from '../pages/PlantPage/PlantPage';
import DepartmentPage from '../pages/DepartmentPage/DepartmentPage';
import ComponentPage from '../pages/ComponentPage/ComponentPage';
import UsersPage from '../pages/UserPage/UserPage';
import LinePage from '../pages/LinePage/LinePage';
import ProductPage from '../pages/ProductPage/ProductPage';
import EmployeePage from '../pages/EmployeePage';
import ProductionPlanPage from '../pages/ProductionPlanPage/ProductionPlanPage';
import PPTeamLPage from '../pages/PPTeamLPage/PPTeamLPage';
import PPReportPage from '../pages/PPReportPage/PPReportPage';
import PageNotFound from '../pages/PageNotFound';
import Navbar from '../components/Navbar';

import {useDispatch} from 'react-redux';

const AppRouter = () => {
    const dispatch = useDispatch()
    // const dispatch = useDispatch();

    return (
        <>
            <Router>
                <Switch>
                    <LoginRoute exact path='/login' component={LoginPage}/>
                    {/* <PrivateRouter rol={[1,3,4,5,6]} exact path='/home' component={HomePage}/> */}

                    <PrivateRouter tokenP={localStorage.getItem('token')} rol={[]} exact path="/plants" component={PlantPage} />
                    <PrivateRouter rol={[1]} exact path="/areas" component={AreaPage} />
                    <PrivateRouter rol={[1]} exact path="/departments" component={DepartmentPage} />
                    <PrivateRouter rol={[1]} exact path="/users" component={UsersPage} />
                    <PrivateRouter rol={[1]} exact path="/lines" component={LinePage} />
                    <PrivateRouter rol={[1,6,4]} exact path="/products" component={ProductPage} />
                    <PrivateRouter rol={[1]} exact path="/employees" component={EmployeePage} />
                    <PrivateRouter rol={[1,3]} exact path="/productionPlan" component={ProductionPlanPage} />
                    <PrivateRouter rol={[1,6,4]} exact path="/components" component={ComponentPage} />
                    <PrivateRouter rol={[1,6,4]} exact path="/productionPlanTL" component={PPTeamLPage} />
                    <PrivateRouter rol={[1,6,4]} exact path="/productionPlanReport" component={PPReportPage} />
                    <Route path='/404' component={PageNotFound} />
                    <Redirect from='*' to='/login' />
                </Switch>
            </Router>
        </>        
    )
}

export default AppRouter
