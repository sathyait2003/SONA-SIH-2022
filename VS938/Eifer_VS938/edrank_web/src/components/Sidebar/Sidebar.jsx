import './Sidebar.css';
import { useState } from 'react';
import { SidebarData, SideBarPathIndex } from './SidebarData';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ isDesktop, toggleSidebar }) {
	let location = useLocation();
	const tenant_type = localStorage.getItem('tenant_type');
	const [selectedOption, setSelectedOption] = useState(
		SideBarPathIndex[tenant_type][location?.pathname],
	);

	console.log(selectedOption);
	return (
		<div className='sidebar' id='sidebar'>
			{/* <div className='sidebar-option'>
				<div className='sidebar-option-icon'>icon</div>
				<div className='sidebar-option-name'>name</div>
			</div> */}
			{/* map on array of objects in SidebarData according to the tenant */}
			{SidebarData[tenant_type].map((item, index) => {
				return (
					<Link
						to={item.path}
						key={index}
						onClick={() => {
							setSelectedOption(index);
							// if (isDesktop)
							toggleSidebar();
						}}
						className={
							selectedOption === index
								? 'sidebar-option-wrapper active'
								: 'sidebar-option-wrapper'
						}
					>
						<div className='sidebar-option'>
							<div className='sidebar-option-icon'>
								{/* <i className={item.icon}></i> */}
								<img src={item.icon} alt='' />
							</div>
							<div className='sidebar-option-name'>{item.option_name}</div>
						</div>
						{item.sub_menu && (
							<div className='sidebar-option-sub-menu'>
								{item.sub_menu.map((sub_item, sub_index) => {
									return (
										<Link
											to={sub_item.path}
											key={sub_index}
											onClick={() => {
												setSelectedOption(index);
												// if (isDesktop)
												toggleSidebar();
											}}
										>
											<div className='sidebar-option-sub-menu-item'>
												{sub_item.option_name}
											</div>
										</Link>
									);
								})}
							</div>
						)}
					</Link>
				);
			})}
		</div>
	);
}

export default Sidebar;
