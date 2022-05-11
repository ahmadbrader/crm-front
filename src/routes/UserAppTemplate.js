import { Routes, Route } from "react-router-dom";

import Dashboard from "pages/dashboard/Dashboard";

import 'assets/css/AppUserTemplate.scss'

import SidebarMenu from "components/layout/SidebarMenu";
import Topbar from "components/layout/Topbar";
import SetupApplication from "pages/setup-application/SetupApplication";
import SetupCategory from "pages/setup-category/SetupCategory";
import SetupDepartment from "pages/setup-department/SetupDepartment";
import ListNotification from "pages/setup-notification/ListNotification";
import CreateNotification from "pages/setup-notification/CreateNotification";
import Prospecting from "pages/process-prospecting/Prospecting";
import Approaching from "pages/process-approaching/Approaching";
import Probing from "pages/process-probing/Probing";
import Presentation from "pages/process-presentation/Presentation";
import Sales from "pages/sales/Sales";
import CreateProspecting from "pages/process-prospecting/CreateProspecting";
import Closing from "pages/process-closing/Closing";
import ViewClosing from "pages/process-closing/ViewClosing";
import AddUser from "pages/user/AddUser";

function UserAppTemplate() {
  return (
      <>
        <SidebarMenu />
        <Topbar />
        <main className="enotif-main-body">
            <Routes>
                <Route index element={<Dashboard />} />
                <Route path="/setup-notification" element={<ListNotification />} />
                <Route path="/setup-notification/create" element={<CreateNotification />} />
                <Route path="/master/application" element={<SetupApplication />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/process/prospecting" element={<Prospecting />} />
                <Route path="/process/prospecting/create" element={<CreateProspecting />} />
                <Route path="/process/approaching" element={<Approaching />} />
                <Route path="/process/probing" element={<Probing />} />
                <Route path="/process/closing" element={<Closing />} />
                <Route path="/user/add" element={<AddUser />} />
                <Route path="/process/closing/:id" element={<ViewClosing />} />
                <Route path="/process/presentation" element={<Presentation />} />
                <Route path="/master/department" element={<SetupDepartment />} />
                <Route path="/master/category" element={<SetupCategory />} />
            </Routes>

        </main>
        <footer>
          {/* <p>Sinarmas . Inspiro . 2022</p> */}
        </footer>
      </>
  );
}

export default UserAppTemplate;
