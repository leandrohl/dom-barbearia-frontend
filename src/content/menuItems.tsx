
import {
  UserIcon,
  UsersIcon,
  HomeIcon,
  IdentificationIcon,
  ScissorsIcon,
  WrenchScrewdriverIcon,
  ShoppingBagIcon,
  ClipboardIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

const menuItems = [
  {
    title: 'Home',
    icon: <HomeIcon className="w-6 h-6" />,
    link: '/admin',
  },
  {
    title: 'Comanda',
    icon: <ClipboardIcon className="w-6 h-6" />,
    link: '/admin/command',
  },
  {
    title: 'Usuário',
    icon: <UserIcon className="w-6 h-6" />,
    link: '/admin/user',
  },
  {
    title: 'Perfil',
    icon: <UsersIcon className="w-6 h-6" />,
    link: '/admin/profile',
  },
  {
    title: 'Cliente',
    icon: <IdentificationIcon className="w-6 h-6" />,
    link: '/admin/client',
  },
  {
    title: 'Funcionário',
    icon: <WrenchScrewdriverIcon className="w-6 h-6" />,
    link: '/admin/employee',
  },
  {
    title: 'Serviço',
    icon: <ScissorsIcon className="w-6 h-6" />,
    link: '/admin/service',
  },
  {
    title: 'Produto',
    icon: <ShoppingBagIcon className="w-6 h-6" />,
    link: '/admin/product',
  },
  {
    title: 'Relatórios',
    icon: <ChartBarIcon className="w-6 h-6" />,
    link: '',
    items: [
      {
        title: 'Classificação de Clientes',
        link: '/admin/reports/client-classification',
      },
      {
        title: 'Produção de barbeiros',
        link: '/admin/reports/barber-production',
      },
      {
        title: 'Relatório Diário',
        link: '/admin/reports/daily-report',
      }
    ]
  },
];

export default menuItems;
