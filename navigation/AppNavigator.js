import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import EmployeeLogin from '@components/employee/EmployeeLogin';
import EmployeeDashboard from '@components/employee/EmployeeDashboard';
import EmployeeShift from '@components/employee/EmployeeShift';
import Inventory from '@components/employee/employeeShift/Inventory';
import Change from '@components/employee/employeeShift/Change';

import LoginScreen from '@components/LoginScreen';
import ManagerDashboard from '@components/manager/ManagerDashboard';
import ManagerEmployees from '@components/manager/ManagerEmployees';
import ManagerAddEmployee from '@components/manager/ManagerAddEmployee';
import ManagerEmployeeProfile from '@components/manager/ManagerEmployeeProfile';
import ManagerShifts from '@components/manager/ManagerShifts';
import ManagerSettings from '@components/manager/ManagerSettings';
import ManagerAccount from '@components/manager/ManagerAccount';
import ManageTrackedInventoryItems from '@components/manager/ManageTrackedInventoryItems';
import ManagerShift from '@components/manager/ManagerShift';

const AppStack = createStackNavigator(
  {
    Home: { screen: LoginScreen },
    ManagerDashboard: { screen: ManagerDashboard },
    ManagerEmployees: { screen: ManagerEmployees },
    ManagerAddEmployee: { screen: ManagerAddEmployee },
    ManagerEmployeeProfile: { screen: ManagerEmployeeProfile },
    ManagerShifts: { screen: ManagerShifts },
    ManagerSettings: { screen: ManagerSettings },
    ManagerAccount: { screen: ManagerAccount },
    ManageTrackedInventoryItems: { screen: ManageTrackedInventoryItems },
    ManagerShift: { screen: ManagerShift },

    EmployeeLogin: { screen: EmployeeLogin },
    EmployeeDashboard: { screen: EmployeeDashboard },
    EmployeeShift: { screen: EmployeeShift },
    Inventory: { screen: Inventory },
    Change: { screen: Change },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
);

export default createAppContainer(
  createSwitchNavigator({
    Main: AppStack,
  })
);
