
import {
  UserIcon,
  UsersIcon,
  HomeIcon,
  IdentificationIcon,
  ScissorsIcon,
  WrenchScrewdriverIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline'

const menuItems = [
  {
    title: 'Home',
    icon: <HomeIcon className="w-6 h-6" />,
    link: '/admin',
  },
  {
    title: 'Usuário',
    icon: <UserIcon className="w-6 h-6" />,
    link: '/admin/user',
  },
  {
    title: 'Perfil',
    icon: <UsersIcon className="w-6 h-6" />,
    link: '#',
  },
  {
    title: 'Cliente',
    icon: <IdentificationIcon className="w-6 h-6" />,
    link: '#',
  },
  {
    title: 'Funcionário',
    icon: <WrenchScrewdriverIcon className="w-6 h-6" />,
    link: '#',
  },
  {
    title: 'Serviço',
    icon: <ScissorsIcon className="w-6 h-6" />,
    link: '#',
  },
  {
    title: 'Produto',
    icon: <ShoppingBagIcon className="w-6 h-6" />,
    link: '#',
  },
];

export default menuItems;
