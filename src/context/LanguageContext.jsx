import { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    ann: 'Government Bond Series 6 — Subscription open 15 Jan – 28 Jan 2025. Contact your authorised primary dealer.',
    heroSub2: 'Transparent, Responsible & Sustainable',
    heroSub: 'Official debt data, publications, and investment information from the General Department of International Cooperation and Debt Management.',
    heroBtn1: 'View Debt Data',
    heroBtn2: 'Bond Issuances →',
    kpi1: 'Publications available',
    kpi2: 'Bond series issued',
    kpi3: 'Partner organisations',
    linkDebtData: 'View Debt Data',
    linkDocLibrary: 'Explore Document Library',
    eduTitle: 'Understand Public Debt & Investment',
    eduSub: 'Free guides, videos, and infographics on government bonds, debt management, and Cambodia\'s fiscal landscape.',
    eduBtn: 'Explore Education Centre',
    navHome: 'Home',
    navDebt: 'Debt Data',
    navDocs: 'Documents',
    navEdu: 'Education',
    navBonds: 'Bonds & T-Bills',
    navNews: 'News',
    navAbout: 'About',
    navContact: 'Contact',
    btnAdmin: 'CMS Admin',
  },
  km: {
    ann: 'សញ្ញាប័ណ្ណរដ្ឋ ស៊េរីទី ៦ — ការជាវបើក ១៥ – ២៨ មករា ២០២៥ ។ ទាក់ទងធនាគារចែកចាយ',
    heroSub2: 'ប្រកបដោយតម្លាភាព ទទួលខុសត្រូវ និងចីរភាព',
    heroSub: 'ទិន្នន័យបំណុល ការបោះផ្សាយ និងព័ត៌មានវិនិយោគ ពីអគ្គនាយកដ្ឋានសហប្រតិបត្តិការអន្តរជាតិ និងការគ្រប់គ្រងបំណុល',
    heroBtn1: 'មើលទិន្នន័យបំណុល',
    heroBtn2: 'ការចេញសញ្ញាប័ណ្ណ →',
    kpi1: 'ឯកសារអាចទាញយក',
    kpi2: 'ស៊េរីសញ្ញាប័ណ្ណ',
    kpi3: 'អង្គការដៃគូ',
    linkDebtData: 'មើលទិន្នន័យបំណុល',
    linkDocLibrary: 'ស្វែងរកបណ្ណាល័យឯកសារ',
    eduTitle: 'យល់ដឹងអំពីបំណុលសាធារណៈ',
    eduSub: 'មគ្គុទ្ទេស វីដេអូ និងរូបភាពព័ត៌មានស្តីពីសញ្ញាប័ណ្ណរដ្ឋ',
    eduBtn: 'ស្វែងយល់ →',
    navHome: 'ទំព័រដើម',
    navDebt: 'ទិន្នន័យ',
    navDocs: 'ឯកសារ',
    navEdu: 'ការអប់រំ',
    navBonds: 'សញ្ញាប័ណ្ណអន្តរការ',
    navNews: 'ព័ត៌មាន',
    navAbout: 'អំពីយើង',
    navContact: 'ទំនាក់ទំនង',
    btnAdmin: 'រដ្ឋបាល',
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  
  const t = (key) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
