import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Navigate } from 'react-router-dom';
import { Register } from './register.jsx'
import { Login } from './login.jsx';
import { Shop } from './shop.jsx';
import { Departments } from './departments.jsx';
import { isAuthenticated } from './auth.js';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AccessDenied } from './access-denied.jsx';
import { AccessDeniedAuthenticated } from './access-denied-authenticated.jsx';
import { Profile } from './profile.jsx';
import { ITServices } from './Departments/ITServices.jsx';
import { Marketing } from './Departments/marketing.jsx';
import { HumanResources } from './Departments/human-resources.jsx';
import { Financial } from './Departments/financial.jsx';
import { Administration } from './Departments/administration.jsx';
import { Accounting } from './Departments/Financial/accounting.jsx';
import { Auditing } from './Departments/Financial/auditing.jsx'
import { Budgeting} from './Departments/Financial/budgeting.jsx'
import { Investments } from './Departments/Financial/investments.jsx'
import { Taxation } from './Departments/Financial/taxation.jsx'
import { FinancialPlanning } from './Departments/Financial/financial-planning.jsx'
import { CustomerServices } from './Departments/Administration/customer-services.jsx';
import { Legal } from './Departments/Administration/legal.jsx';
import { FacilitiesManagement } from './Departments/Administration/facilities-management.jsx';
import { Logistics } from './Departments/Administration/logistics.jsx';
import { OfficeManagement } from './Departments/Administration/office-management.jsx';
import { Procurement } from './Departments/Administration/procurement.jsx';
import { Compliance } from './Departments/HumanResources/compliance.jsx';
import { Training } from './Departments/HumanResources/training.jsx';
import { Recruitment } from './Departments/HumanResources/recruitment.jsx';
import { Payroll } from './Departments/HumanResources/payroll.jsx';
import { EmployeeRelations } from './Departments/HumanResources/employee-relations.jsx';
import { EmployeeEngagement } from './Departments/HumanResources/employee-engagement.jsx';
import { CloudServices } from './Departments/ITServices/cloud-services.jsx';
import { Cybersecurity } from './Departments/ITServices/cybersecurity.jsx';
import { DataAnalytics } from './Departments/ITServices/data-analytics.jsx';
import { Development } from './Departments/ITServices/development.jsx';
import { Networking } from './Departments/ITServices/networking.jsx';
import { Support } from './Departments/ITServices/support.jsx';
import { Advertising } from './Departments/marketing/advertising.jsx';
import { MarketResearch } from './Departments/marketing/market-research.jsx';
import { SEO } from './Departments/marketing/seo.jsx';
import { SocialMedia } from './Departments/marketing/social-media.jsx';
import { Events } from './Departments/marketing/events.jsx';
import { Branding } from './Departments/marketing/branding.jsx';

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/access-denied" replace/>;
};

const PublicRoute = ({ element }) => {
  return isAuthenticated() ? <Navigate to="/access-denied-authenticated" replace /> : element;
};

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<PublicRoute element={<Register />} />} />    
      <Route path="/login" element={<PublicRoute element={<Login />} />} />   
      <Route path="/shop" element={<PrivateRoute element={<Shop />} />} />
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      <Route path="/access-denied" element={<AccessDenied />} />
      <Route path="/access-denied-authenticated" element={<AccessDeniedAuthenticated />} />
      <Route path="/departments" element={<PrivateRoute element={<Departments />} />} />
      <Route path="/departments/it-services" element={<PrivateRoute element={<ITServices />} />} />
      <Route path="/departments/marketing" element={<PrivateRoute element={<Marketing />} />} />
      <Route path="/departments/human-resources" element={<PrivateRoute element={<HumanResources />} />} />
      <Route path="/departments/administration" element={<PrivateRoute element={<Administration />} />} />
      <Route path="/departments/financial" element={<PrivateRoute element={<Financial />} />} />
      <Route path="/departments/financial/Accounting" element={<PrivateRoute element={<Accounting />} />} />
      <Route path="/departments/financial/Auditing" element={<PrivateRoute element={<Auditing />} />} />
      <Route path="/departments/financial/Budgeting" element={<PrivateRoute element={<Budgeting />} />} />
      <Route path="/departments/financial/Investments" element={<PrivateRoute element={<Investments />} />} />
      <Route path="/departments/financial/Taxation" element={<PrivateRoute element={<Taxation />} />} />
      <Route path="/departments/financial/Financial Planning" element={<PrivateRoute element={<FinancialPlanning />} />} />
      <Route path="/departments/administration/Customer Services" element={<PrivateRoute element={<CustomerServices />} />} />
      <Route path="/departments/administration/Legal" element={<PrivateRoute element={<Legal />} />} />
      <Route path="/departments/administration/Facilities Management" element={<PrivateRoute element={<FacilitiesManagement />} />} />
      <Route path="/departments/administration/Logistics" element={<PrivateRoute element={<Logistics />} />} />
      <Route path="/departments/administration/Office Management" element={<PrivateRoute element={<OfficeManagement />} />} />
      <Route path="/departments/administration/Procurement" element={<PrivateRoute element={<Procurement />} />} />
      <Route path="/departments/human-resources/Compliance" element={<PrivateRoute element={<Compliance />} />} />
      <Route path="/departments/human-resources/Training" element={<PrivateRoute element={<Training />} />} />
      <Route path="/departments/human-resources/Recruitment" element={<PrivateRoute element={<Recruitment />} />} />
      <Route path="/departments/human-resources/Payroll" element={<PrivateRoute element={<Payroll />} />} />
      <Route path="/departments/human-resources/Employee Relations" element={<PrivateRoute element={<EmployeeRelations />} />} />
      <Route path="/departments/human-resources/Employee Engagement" element={<PrivateRoute element={<EmployeeEngagement />} />} />
      <Route path="/departments/it-services/Cloud Services" element={<PrivateRoute element={<CloudServices />} />} />	
      <Route path="/departments/it-services/Cybersecurity" element={<PrivateRoute element={<Cybersecurity />} />} />
      <Route path="/departments/it-services/Data Analytics" element={<PrivateRoute element={<DataAnalytics />} />} />
      <Route path="/departments/it-services/Development" element={<PrivateRoute element={<Development />} />} />
      <Route path="/departments/it-services/Networking" element={<PrivateRoute element={<Networking />} />} />
      <Route path="/departments/it-services/Support" element={<PrivateRoute element={<Support />} />} />
      <Route path="/departments/marketing/Advertising" element={<PrivateRoute element={<Advertising />} />} />
      <Route path="/departments/marketing/Market Research" element={<PrivateRoute element={<MarketResearch />} />} />
      <Route path="/departments/marketing/SEO" element={<PrivateRoute element={<SEO />} />} />
      <Route path="/departments/marketing/Social Media" element={<PrivateRoute element={<SocialMedia />} />} />
      <Route path="/departments/marketing/Events" element={<PrivateRoute element={<Events />} />} />
      <Route path="/departments/marketing/Branding" element={<PrivateRoute element={<Branding />} />} />

    </Routes>
  </BrowserRouter>,
)
