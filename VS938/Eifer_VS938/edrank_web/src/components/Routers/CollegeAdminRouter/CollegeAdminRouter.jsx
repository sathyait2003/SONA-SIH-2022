import './CollegeAdminRouter.scss';
import { Navbar, Sidebar } from 'components';
import { Outlet } from 'react-router-dom';
// import { collegeAdminEndpoints } from 'constants/endpoints';

function CollegeAdminRouter() {
	// console.log('COLLEGE ADMIN BASE');
	// console.log(collegeAdminEndpoints.base);
	const toggleSidebar = () => {
		console.log("SIDEBAR TOGGLE")
		document.getElementById('sidebar').classList.toggle('active');
	};

	const vw = Math.max(
		document.documentElement.clientWidth || 0,
		window.innerWidth || 0,
	);
	
	const isDesktop = vw <= 960 ? false : true;
	
	return (
		<>
			<Navbar toggleSidebar={toggleSidebar} />
			<div className='college-admin-router-main page-view-wrapper'>
				<Sidebar toggleSidebar={toggleSidebar} isDesktop={isDesktop} />
				{/* <Route
					path='/college-admin/dashboard'
					element={<Dashboard />}
				/> */}
				<div className='college-admin-route-child'>
					<Outlet />
				</div>
			</div>
		</>
	);
}

export default CollegeAdminRouter;
