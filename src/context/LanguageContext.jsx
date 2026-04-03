import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const LanguageContext = createContext();

const BASE_TRANSLATIONS = {
    en: {
        navHome: 'Home', navAbout: 'About', navBonds: 'Bonds',
        navDebt: 'Debt Data', navDocs: 'Documents', navEdu: 'Education',
        navNews: 'News', navContact: 'Contact', navCalendar: 'Calendar',
        heroSub2: 'Transparency & Accountability',
        heroSub: 'Access official debt statistics, bond information, and financial education resources from the General Department of International Cooperation and Debt Management.',
        heroBtn1: 'View Debt Data', heroBtn2: 'Explore Bonds',
        kpi1: 'Published Documents', kpi2: 'Partner Organisations', kpi3: 'International Partners',
        kpiEducation: 'Learning Resources', navAuction: 'Auction Result',
        eduTitle: 'Understand Public Debt', eduSub: 'Free guides, videos, and infographics on public debt and investment in Cambodia.', eduBtn: 'Browse Resources',
        linkDebtData: 'View All Data →', linkDocLibrary: 'View All Documents →', linkNewsRoom: 'View All News →',
    }
};

const CACHE_KEY = 'translation_cache_km';

export function LanguageProvider({ children }) {
    const [lang, setLang]             = useState('en');
    const [translations, setTranslations] = useState({});
    const [loading, setLoading]       = useState(false);

    const translateText = async (text) => {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|km`;
        const res  = await fetch(url);
        const data = await res.json();
        return data.responseData?.translatedText || text;
    };

    const loadKhmerTranslations = useCallback(async () => {
        // check cache first
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
            setTranslations(JSON.parse(cached));
            return;
        }

        setLoading(true);
        try {
            const entries  = Object.entries(BASE_TRANSLATIONS.en);
            const results  = {};

            // translate in batches of 5 to avoid rate limiting
            for (let i = 0; i < entries.length; i += 5) {
                const batch = entries.slice(i, i + 5);
                const translated = await Promise.all(
                    batch.map(async ([key, value]) => {
                        const text = await translateText(value);
                        return [key, text];
                    })
                );
                translated.forEach(([key, value]) => { results[key] = value; });
                // small delay between batches to respect rate limits
                if (i + 5 < entries.length) await new Promise(r => setTimeout(r, 300));
            }

            sessionStorage.setItem(CACHE_KEY, JSON.stringify(results));
            setTranslations(results);
        } catch (err) {
            console.error('Translation failed:', err);
            setTranslations({});
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (lang === 'km') loadKhmerTranslations();
    }, [lang, loadKhmerTranslations]);

    const t = useCallback((key) => {
        if (lang === 'en') return BASE_TRANSLATIONS.en[key] || key;
        return translations[key] || BASE_TRANSLATIONS.en[key] || key;
    }, [lang, translations]);

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, loading }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}