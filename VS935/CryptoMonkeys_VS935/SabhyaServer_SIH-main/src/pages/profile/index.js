import React from 'react';
import ProfileLayout from '../../styleGuide/layout/profile';
import SideNavLayout from '../../styleGuide/layout/sidenav';

function Profile() {
    return (
        <SideNavLayout
            activeTab="profile"
            pageHeader="Profile"
        >
            <div>
                <ProfileLayout
                    resources={2}
                    subscribers={6}
                    universityName="National Institute of Technology, Silchar"
                    imgLink={"https://images.unsplash.com/photo-1645423660753-74c9121fe6dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGluc3RpdHV0ZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"}
                />
            </div>
        </SideNavLayout>
    )
}

export default Profile