import { Button, Result } from 'antd';

import useLanguage from '@/locale/useLanguage';

const About = () => {
  const translate = useLanguage();
  return (
    <Result
      status="info"
      title={'Prestige Maroc'}
      subTitle={'Plateforme ERP & CRM de location de voitures'}
      extra={
        <>
          <p>
            Projet de Fin d'Études
          </p>
          <p>
            Développé avec ❤️ pour la gestion de location
          </p>
        </>
      }
    />
  );
};

export default About;
