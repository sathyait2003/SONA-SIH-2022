import './Navbar.scss';
import { Link, useNavigate } from 'react-router-dom';

import profileIcon from 'assets/images/icon-profile-2.png';
import logoutIcon from 'assets/images/icon-logout-1.png';
import menuIcon from 'assets/images/icon-menu-4.png';

function Navbar({ toggleSidebar }) {
	var navigate = useNavigate();
	const logOut = () => {
		localStorage.clear();
		navigate('/');
	};
	return (
		<div className='navbar-main'>
			<div className='navbar-main-burger-menu' onClick={toggleSidebar}>
				{/* <i className='fa-solid fa-bars'></i> */}
				<img
					// className='navbar-main-burger-menu'
					// onClick={toggleSidebar}
					src={menuIcon}
					alt=''
				/>
			</div>
			<div className='navbar-main-logo'>
				<span>ED</span>RANK
			</div>
			<div className='navbar-main-user-menu'>
				<Link to='/profile'>
					{/* <i className='fa-solid fa-circle-user'></i> */}
					<img src={profileIcon} alt='Profile' title='Go to Profile' />
				</Link>
				&nbsp; &nbsp; &nbsp;
				{/* <i
					onClick={logOut}
					className='fa-solid fa-arrow-right-from-bracket'
				></i> */}
				<img onClick={logOut} src={logoutIcon} alt='Log out' title='Logout' />
			</div>
		</div>
	);
}

export default Navbar;
