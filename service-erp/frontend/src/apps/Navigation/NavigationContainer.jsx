import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';

import { useAppContext } from '@/context/appContext';
import { useSelector } from 'react-redux';
import { selectCurrentAdmin } from '@/redux/auth/selectors';

import useLanguage from '@/locale/useLanguage';
import logoIcon from '@/style/images/logo-icon.svg';
import logoText from '@/style/images/logo-text.svg';

import useResponsive from '@/hooks/useResponsive';

import { MenuOutlined } from '@ant-design/icons';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  FileSignature, 
  CreditCard, 
  Wallet, 
  Landmark, 
  Settings, 
  Info 
} from 'lucide-react';

const { Sider } = Layout;

export default function Navigation() {
  const { isMobile } = useResponsive();

  return isMobile ? <MobileSidebar /> : <Sidebar collapsible={false} />;
}

function Sidebar({ collapsible, isMobile = false }) {
  let location = useLocation();

  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);
  const [currentPath, setCurrentPath] = useState(location.pathname.slice(1));

  const translate = useLanguage();
  const navigate = useNavigate();
  const currentAdmin = useSelector(selectCurrentAdmin);
  const role = currentAdmin?.role || 'owner';

  const items = [
    {
      key: 'dashboard',
      icon: <LayoutDashboard size={20} strokeWidth={1.5} />,
      label: <Link to={'/'}>{translate('dashboard')}</Link>,
      roles: ['owner', 'manager', 'sales', 'accountant'],
    },
    {
      key: 'customer',
      icon: <Users size={20} strokeWidth={1.5} />,
      label: <Link to={'/customer'}>{translate('customers')}</Link>,
      roles: ['owner', 'manager', 'sales'],
    },

    {
      key: 'invoice',
      icon: <FileText size={20} strokeWidth={1.5} />,
      label: <Link to={'/invoice'}>{translate('invoices')}</Link>,
      roles: ['owner', 'manager', 'sales', 'accountant'],
    },
    {
      key: 'quote',
      icon: <FileSignature size={20} strokeWidth={1.5} />,
      label: <Link to={'/quote'}>{translate('quote')}</Link>,
      roles: ['owner', 'manager', 'sales'],
    },
    {
      key: 'payment',
      icon: <CreditCard size={20} strokeWidth={1.5} />,
      label: <Link to={'/payment'}>{translate('payments')}</Link>,
      roles: ['owner', 'manager', 'accountant'],
    },

    {
      key: 'paymentMode',
      label: <Link to={'/payment/mode'}>{translate('payments_mode')}</Link>,
      icon: <Wallet size={20} strokeWidth={1.5} />,
      roles: ['owner', 'manager', 'accountant'],
    },
    {
      key: 'taxes',
      label: <Link to={'/taxes'}>{translate('taxes')}</Link>,
      icon: <Landmark size={20} strokeWidth={1.5} />,
      roles: ['owner', 'manager', 'accountant'],
    },
    {
      key: 'generalSettings',
      label: <Link to={'/settings'}>{translate('settings')}</Link>,
      icon: <Settings size={20} strokeWidth={1.5} />,
      roles: ['owner'],
    },
    {
      key: 'about',
      label: <Link to={'/about'}>{translate('about')}</Link>,
      icon: <Info size={20} strokeWidth={1.5} />,
      roles: ['owner', 'manager', 'sales', 'accountant'],
    },
  ];

  const filteredItems = items.filter((item) => item.roles.includes(role));

  useEffect(() => {
    if (location)
      if (currentPath !== location.pathname) {
        if (location.pathname === '/') {
          setCurrentPath('dashboard');
        } else setCurrentPath(location.pathname.slice(1));
      }
  }, [location, currentPath]);

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);
  const onCollapse = () => {
    navMenu.collapse();
  };

  return (
    <Sider
      collapsible={collapsible}
      collapsed={collapsible ? isNavMenuClose : collapsible}
      onCollapse={onCollapse}
      className="navigation"
      width={256}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: isMobile ? 'absolute' : 'relative',
        left: 0,
        top: 0,
        bottom: 0,
        background: '#0f172a',
        boxShadow: 'none',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        zIndex: 100,
      }}
      theme={'dark'}
    >
      <div
        className="logo"
        onClick={() => navigate('/')}
        style={{
          cursor: 'pointer',
          padding: '24px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsible && isNavMenuClose ? 'center' : 'flex-start',
        }}
      >
        <div style={{
          width: '24px',
          height: '24px',
          background: '#ffffff',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: collapsible && isNavMenuClose ? '0' : '12px',
          flexShrink: 0
        }}>
          <div style={{ width: '8px', height: '8px', background: '#0f172a', borderRadius: '50%' }}></div>
        </div>
        
        {!showLogoApp && (
          <span style={{
            color: '#fff',
            fontSize: '18px',
            fontWeight: '600',
            letterSpacing: '1px',
            whiteSpace: 'nowrap'
          }}>
            Prestige Maroc
          </span>
        )}
      </div>
      <Menu
        items={filteredItems}
        mode="inline"
        theme={'dark'}
        selectedKeys={[currentPath]}
        style={{
          width: 256,
          background: 'transparent',
          padding: '0 12px'
        }}
      />
    </Sider>
  );
}

function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        type="text"
        size="large"
        onClick={showDrawer}
        className="mobile-sidebar-btn"
        style={{ ['marginLeft']: 25 }}
      >
        <MenuOutlined style={{ fontSize: 18 }} />
      </Button>
      <Drawer
        width={250}
        // style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
        placement={'left'}
        closable={false}
        onClose={onClose}
        open={visible}
      >
        <Sidebar collapsible={false} isMobile={true} />
      </Drawer>
    </>
  );
}
