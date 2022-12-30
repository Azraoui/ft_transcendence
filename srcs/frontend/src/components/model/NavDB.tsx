
 import { EnvelopeIcon, UserGroupIcon, ArrowLeftOnRectangleIcon, HomeIcon, UserIcon } from '@heroicons/react/24/outline';

 export const navLinks = [
   {
     id: 0,
     to: "/",
     title: "Dashboard",
     icon: <HomeIcon className="nav-icon" />,
   },
   {
     id: 1,
     to: "/profile",
     title: "Profile",
     icon: <UserIcon className="nav-icon" />,
   },
   {
     id: 2,
     to: "/messages",
     title: "Messages",
     icon: <EnvelopeIcon className="nav-icon" />,
   },
   {
     id: 3,
     to: "/users",
     title: "Users",
     icon: <UserGroupIcon className="nav-icon" />,
   },
   {
     id: 4,
     to: "/login",
     title: "LogOut",
     icon: <ArrowLeftOnRectangleIcon className="nav-icon" />,
   },
 ];