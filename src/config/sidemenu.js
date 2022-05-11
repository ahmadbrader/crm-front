import IconUserManagement, { IconDashboard, IconMasterData, IconSetupNotification } from "components/commons/Icons";

const Menu = [
    {
        key: 'dashboard',
        text: 'Dashboard',
        icon: {
            unactive: <IconDashboard />,
            active: <IconDashboard color="#86efac" />
        },
        url: '/app'
    },
    {
        key: 'sales',
        text: 'Sales',
        icon: {
            unactive: <IconSetupNotification />,
            active: <IconSetupNotification color="#86efac" />
        },
        url: '/app/sales'
    },
    {
        key: 'process',
        text: 'Process',
        icon: {
            unactive: <IconMasterData />,
            active: <IconMasterData color="#86efac" />
        },
        url: '/app/process/prospecting',
        submenu: [
            {
                text: 'Prospecting',
                url: '/app/process/prospecting'
            },
            {
                text: 'Approaching',
                url: '/app/process/approaching'
            },
            {
                text: 'Presentation',
                url: '/app/process/presentation'
            },
            {
                text: 'Closing',
                url: '/app/process/closing'
            }
        ]
    },
    {
        key: 'user-management',
        text: 'User Management',
        icon: {
            unactive: <IconUserManagement />,
            active: <IconUserManagement color="#86efac" />
        },
        url: '#',
        submenu: [
            {
                text: 'Add User',
                url: '/app/user/add'
            },{
                text: 'User Roles',
                url: '/'
            },
            {
                text: 'User Access',
                url: '/'
            },

        ]
    },
];

export default Menu;
