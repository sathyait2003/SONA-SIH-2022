import endpoints from 'constants/endpoints';
import { Navbar, Sidebar } from 'components';
import { Link } from 'react-router-dom';
import './ProfilePage.scss';
import { useState, useEffect } from 'react';
import { makeRequest } from 'services';

function ProfilePage() {
	const [user, setUser] = useState({});
	const tenantType = localStorage.getItem('tenant_type');

	useEffect(() => {
		console.log('useEffect');
		async function fetchData() {
			const response = await makeRequest('my-profile', 'GET');
			console.log(response?.data.data);
			setUser(response?.data.data.profile);
		}
		fetchData();
	}, []);

	const toggleSidebar = () => {
		console.log('SIDEBAR TOGGLE');
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
			<div className='profile-page-main-wrapper'>
				<Sidebar toggleSidebar={toggleSidebar} isDesktop={isDesktop} />
				<div className='profile-page-main'>
					{/* <div className='col-1'>
						<img src='#' alt='#' />
					</div> */}
					<div className='col-2'>
						<div className='thead'>Name</div>
						<div className='tbody'>{user.name ?? 'Loading'}</div>
						<div className='thead'>Email</div>
						<div className='tbody'>{user.email ?? 'Loading'}</div>
						{tenantType === 'STUDENT' && (
							<>
								<div className='thead'>Enrollment No.</div>
								<div className='tbody'>{user.enrollment ?? 'Loading'}</div>
								<div className='thead'>Mother's Name</div>
								<div className='tbody'>{user.mother_name ?? 'Loading'}</div>
								<div className='thead'>Father's Name</div>
								<div className='tbody'>{user.fathers_name ?? 'Loading'}</div>
							</>
						)}
						<div className='change-password-btn'>
							<Link to={endpoints.changePasswordPage}>
								Change Your Password
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProfilePage;
