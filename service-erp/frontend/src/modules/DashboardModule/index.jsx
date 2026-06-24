import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import { Tag, Row, Col } from 'antd';
import useLanguage from '@/locale/useLanguage';

import { useMoney } from '@/settings';

import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import useOnFetch from '@/hooks/useOnFetch';

import RecentTable from './components/RecentTable';

import SummaryCard from './components/SummaryCard';
import PreviewCard from './components/PreviewCard';
import CustomerPreviewCard from './components/CustomerPreviewCard';

import { selectMoneyFormat } from '@/redux/settings/selectors';
import { useSelector } from 'react-redux';

export default function DashboardModule() {
  const translate = useLanguage();
  const { moneyFormatter } = useMoney();
  const money_format_settings = useSelector(selectMoneyFormat);

  const getStatsData = async ({ entity, currency }) => {
    return await request.summary({
      entity,
      options: { currency },
    });
  };

  const {
    result: invoiceResult,
    isLoading: invoiceLoading,
    onFetch: fetchInvoicesStats,
  } = useOnFetch();

  const { result: quoteResult, isLoading: quoteLoading, onFetch: fetchQuotesStats } = useOnFetch();

  const {
    result: paymentResult,
    isLoading: paymentLoading,
    onFetch: fetchPayemntsStats,
  } = useOnFetch();

  const { result: clientResult, isLoading: clientLoading } = useFetch(() =>
    request.summary({ entity: 'client' })
  );

  useEffect(() => {
    const currency = money_format_settings.default_currency_code || null;

    if (currency) {
      fetchInvoicesStats(getStatsData({ entity: 'invoice', currency }));
      fetchQuotesStats(getStatsData({ entity: 'quote', currency }));
      fetchPayemntsStats(getStatsData({ entity: 'payment', currency }));
    }
  }, [money_format_settings.default_currency_code]);

  const dataTableColumns = [
    {
      title: translate('number'),
      dataIndex: 'number',
    },
    {
      title: translate('Client'),
      dataIndex: ['client', 'name'],
    },

    {
      title: translate('Total'),
      dataIndex: 'total',
      onCell: () => {
        return {
          style: {
            textAlign: 'right',
            whiteSpace: 'nowrap',
            direction: 'ltr',
          },
        };
      },
      render: (total, record) => moneyFormatter({ amount: total, currency_code: record.currency }),
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
    },
  ];

  const entityData = [
    {
      result: invoiceResult,
      isLoading: invoiceLoading,
      entity: 'invoice',
      title: translate('Invoices'),
    },
    {
      result: quoteResult,
      isLoading: quoteLoading,
      entity: 'quote',
      title: translate('quote'),
    },
  ];

  const statisticCards = entityData.map((data, index) => {
    const { result, entity, isLoading, title } = data;

    return (
      <PreviewCard
        key={index}
        title={title}
        isLoading={isLoading}
        entity={entity}
        statistics={
          !isLoading &&
          result?.performance?.map((item) => ({
            tag: item?.status,
            color: 'blue',
            value: item?.percentage,
          }))
        }
      />
    );
  });

  // Données réalistes pour une agence de location (Saisonnalité : forte en été)
  // Facturé = Chiffre d'affaires total (Devis acceptés/Factures)
  // Encaissé = Ce qui a été réellement payé par les clients
  const revenueData = [
    { name: 'Jan', facture: 45000, encaisse: 42000 },
    { name: 'Fév', facture: 48000, encaisse: 45000 },
    { name: 'Mar', facture: 55000, encaisse: 51000 },
    { name: 'Avr', facture: 62000, encaisse: 59000 },
    { name: 'Mai', facture: 75000, encaisse: 70000 },
    { name: 'Juin', facture: 110000, encaisse: 98000 },
    { name: 'Juil', facture: 145000, encaisse: 135000 },
    { name: 'Août', facture: 160000, encaisse: 150000 },
    { name: 'Sep', facture: 95000, encaisse: 85000 },
    { name: 'Oct', facture: 60000, encaisse: 55000 },
    { name: 'Nov', facture: 50000, encaisse: 45000 },
    { name: 'Déc', facture: 65000, encaisse: 60000 },
  ];

  if (money_format_settings) {
    return (
      <>
        <Row gutter={[32, 32]}>
          <SummaryCard
            title={translate('Invoices')}
            prefix={translate('This month')}
            isLoading={invoiceLoading}
            data={invoiceResult?.total}
          />
          <SummaryCard
            title={translate('Quote')}
            prefix={translate('This month')}
            isLoading={quoteLoading}
            data={quoteResult?.total}
          />
          <SummaryCard
            title={translate('paid')}
            prefix={translate('This month')}
            isLoading={paymentLoading}
            data={paymentResult?.total}
          />
          <SummaryCard
            title={translate('Unpaid')}
            prefix={translate('Not Paid')}
            isLoading={invoiceLoading}
            data={invoiceResult?.total_undue}
          />
        </Row>
        <div className="space30"></div>
        <Row gutter={[32, 32]}>
          <Col className="gutter-row w-full" sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 18 }}>
            <div className="whiteBox shadow" style={{ height: 458, padding: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ color: '#22075e', margin: 0, fontSize: '18px', fontWeight: 600 }}>
                  Analyse Financière : Facturé vs Encaissé (Saison 2026)
                </h3>
                <Tag color="cyan" style={{ fontSize: '14px', padding: '5px 10px' }}>Vue Globale</Tag>
              </div>
              <div style={{ width: '100%', height: 340 }}>
                <ResponsiveContainer>
                  <AreaChart
                    data={revenueData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorFacture" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1677ff" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#1677ff" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorEncaisse" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#52c41a" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#52c41a" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} dy={10} />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tickFormatter={(val) => `${val/1000}k MAD`} 
                      tick={{ fill: '#666', fontSize: 12 }}
                      dx={-10}
                    />
                    <Tooltip 
                      formatter={(value, name) => [`${value.toLocaleString()} MAD`, name === 'facture' ? 'Total Facturé' : 'Montant Encaissé']}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Legend verticalAlign="top" height={36} iconType="circle" />
                    <Area type="monotone" name="facture" dataKey="facture" stroke="#1677ff" strokeWidth={3} fillOpacity={1} fill="url(#colorFacture)" />
                    <Area type="monotone" name="encaisse" dataKey="encaisse" stroke="#52c41a" strokeWidth={3} fillOpacity={1} fill="url(#colorEncaisse)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Col>
          <Col className="gutter-row w-full" sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }}>
            <CustomerPreviewCard
              isLoading={clientLoading}
              activeCustomer={clientResult?.active}
              newCustomer={clientResult?.new}
            />
          </Col>
        </Row>
        <div className="space30"></div>
        <Row gutter={[32, 32]}>
          <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
            <div className="whiteBox shadow pad20" style={{ height: '100%' }}>
              <h3 style={{ color: '#22075e', marginBottom: 5, padding: '0 20px 20px' }}>
                {translate('Recent Invoices')}
              </h3>

              <RecentTable entity={'invoice'} dataTableColumns={dataTableColumns} />
            </div>
          </Col>

          <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
            <div className="whiteBox shadow pad20" style={{ height: '100%' }}>
              <h3 style={{ color: '#22075e', marginBottom: 5, padding: '0 20px 20px' }}>
                {translate('Recent Quotes')}
              </h3>
              <RecentTable entity={'quote'} dataTableColumns={dataTableColumns} />
            </div>
          </Col>
        </Row>
      </>
    );
  } else {
    return <></>;
  }
}
