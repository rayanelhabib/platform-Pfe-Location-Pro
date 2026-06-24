import { ErpContextProvider } from '@/context/erp';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useEffect } from 'react';

const { Content } = Layout;

export default function ErpLayout({ children }) {
  const location = useLocation();

  useEffect(() => {
    // GSAP animation for internal elements when route changes
    gsap.fromTo('.whiteBox', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
    );
    // Slight delay for table rows
    gsap.fromTo('.ant-table-row', 
      { opacity: 0, x: -10 }, 
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power1.out', delay: 0.1 }
    );
  }, [location.pathname]);

  return (
    <ErpContextProvider>
      <Content
        className="erp-fluid-content"
        style={{
          width: '100%',
          minHeight: '600px',
        }}
      >
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ width: '100%', height: '100%' }}
        >
          {children}
        </motion.div>
      </Content>
    </ErpContextProvider>
  );
}
