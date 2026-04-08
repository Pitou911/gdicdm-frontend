import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const LanguageContext = createContext();

const translations = {
    en: {
        // Navbar
        navHome:     'Home',
        navAbout:    'About',
        navBonds:    'Bonds',
        navDebt:     'Debt Data',
        navDocs:     'Documents',
        navEdu:      'Education',
        navNews:     'News',
        navContact:  'Contact',
        navCalendar: 'Calendar',
        navAuction:  'Auction Result',

        // Hero
        heroSub2: 'Transparency & Accountability',
        heroSub:  'Access official debt statistics, bond information, and financial education resources from the General Department of International Cooperation and Debt Management.',
        heroBtn1: 'View Debt Data',
        heroBtn2: 'Explore Bonds',

        // KPIs
        kpi1:          'Published Documents',
        kpi2:          'Partner Organisations',
        kpi3:          'International Partners',
        kpiEducation:  'Learning Resources',

        // Education section
        eduTitle: 'Understand Public Debt',
        eduSub:   'Free guides, videos, and infographics on public debt and investment in Cambodia.',
        eduBtn:   'Browse Resources',

        // Section links
        linkDebtData:   'View All Data →',
        linkDocLibrary: 'View All Documents →',
        linkNewsRoom:   'View All News →',
    },
    km: {
        // Navbar
        navHome:     'ទំព័រដើម',
        navAbout:    'អំពីយើង',
        navBonds:    'មូលបត្រ',
        navDebt:     'ទិន្នន័យបំណុល',
        navDocs:     'ឯកសារ',
        navEdu:      'ការអប់រំ',
        navNews:     'ព័ត៌មាន',
        navContact:  'ទំនាក់ទំនង',
        navCalendar: 'ប្រតិទិន',
        navAuction:  'លទ្ធផលដេញថ្លៃ',

        // Hero
        heroSub2: 'តម្លាភាព និងគណនេយ្យភាព',
        heroSub:  'ចូលទៅកាន់ស្ថិតិបំណុលផ្លូវការ ព័ត៌មានអំពីមូលបត្រ និងធនធានអប់រំហិរញ្ញវត្ថុ ពីនាយកដ្ឋានទូទៅនៃកិច្ចសហប្រតិបត្តិការអន្តរជាតិ និងការគ្រប់គ្រងបំណុល។',
        heroBtn1: 'មើលទិន្នន័យបំណុល',
        heroBtn2: 'ស្វែងយល់អំពីមូលបត្រ',

        // KPIs
        kpi1:         'ឯកសារបោះពុម្ព',
        kpi2:         'អង្គការដៃគូ',
        kpi3:         'ដៃគូអន្តរជាតិ',
        kpiEducation: 'ធនធានសិក្សា',

        // Education section
        eduTitle: 'យល់ដឹងអំពីបំណុលសាធារណៈ',
        eduSub:   'មគ្គុទ្ទេសក៍ វីដេអូ និងអត្ថបទព័ត៌មានអំពីបំណុលសាធារណៈ និងការវិនិយោគនៅកម្ពុជា ដោយឥតគិតថ្លៃ។',
        eduBtn:   'រកមើលធនធាន',

        // Section links
        linkDebtData:   'មើលទិន្នន័យទាំងអស់ →',
        linkDocLibrary: 'មើលឯកសារទាំងអស់ →',
        linkNewsRoom:   'មើលព័ត៌មានទាំងអស់ →',
    },
};

export function LanguageProvider({ children }) {
    const [lang, setLangState] = useState(
        () => localStorage.getItem('lang') || 'en'
    );

    const setLang = (newLang) => {
        localStorage.setItem('lang', newLang);
        setLangState(newLang);
    };

    // Keep the <html lang> attribute in sync for accessibility and SEO
    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    const t = useCallback(
        (key) => translations[lang]?.[key] ?? translations.en[key] ?? key,
        [lang]
    );

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
