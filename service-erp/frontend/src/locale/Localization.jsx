import { ConfigProvider } from 'antd';

export default function Localization({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2563eb', // Enterprise Blue
          colorBgBase: '#ffffff',
          colorTextBase: '#0f172a',
          colorInfo: '#2563eb',
          colorSuccess: '#10b981',
          colorWarning: '#f59e0b',
          colorError: '#ef4444',
          colorLink: '#2563eb',
          borderRadius: 6, // Slightly sharper edges for a more serious look
          wireframe: false,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          colorBgContainer: '#ffffff',
          colorBgLayout: '#f8fafc',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        },
        components: {
          Card: {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
            headerBg: '#ffffff',
          },
          Button: {
            controlHeight: 40, // Taller, friendlier buttons
            paddingInline: 24,
            fontWeight: 500,
          },
          Input: {
            controlHeight: 40,
          },
          Select: {
            controlHeight: 40,
          },
          Table: {
            headerBg: '#f8fafc',
            headerColor: '#475569',
            rowHoverBg: '#f1f5f9',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
