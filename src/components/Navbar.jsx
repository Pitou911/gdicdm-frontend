import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar(){
    const { lang, setLang, t } = useLanguage();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { id: 'Home',      path: '/',          label: t('navHome') },
        { id: 'Calendar',  path: '/calendar',   label: t('navCalendar') },
        { id: 'About',     path: '/about',      label: t('navAbout') },
        { id: 'Bonds',     path: '/bonds',      label: t('navBonds') },
        { id: 'Debt Data', path: '/debt',       label: t('navDebt') },
        { id: 'Documents', path: '/documents',  label: t('navDocs') },
        { id: 'Education', path: '/education',  label: t('navEdu') },
        { id: 'News',      path: '/news',       label: t('navNews') },
        { id: 'Contact',   path: '/contact',    label: t('navContact') },
    ];

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="bg-white border-b border-light-2 sticky top-0 z-200 shadow-[0_1px_0_var(--color-light-2),0_2px_12px_rgba(0,0,0,0.04)]">

            {/* desktop + mobile top bar */}
            <div className="max-w-325 mx-auto px-8 flex items-center h-16">

                {/* brand */}
                <Link to="/" onClick={closeMenu} className="flex items-center gap-3 cursor-pointer shrink-0 mr-10 no-underline">
                    <div className="w-9 h-9 rounded-sm flex items-center justify-center text-[17px] shrink-0 shadow-[0_2px_8px_rgba(0,109,110,0.3)]">
                        <img src="mef_logo.png" />
                    </div>
                    <div>
                        <div className="font-display text-[15px] font-bold text-text tracking-[-0.2px]">GDICDM</div>
                        <div className="text-[10px] text-text-3 mt-px font-normal">Ministry of Economy &amp; Finance</div>
                    </div>
                </Link>

                {/* desktop nav links */}
                <div className="hidden lg:flex items-center gap-0.5 flex-1">
                    {navLinks.map(link => (
                        <Link
                            key={link.id}
                            to={link.path}
                            className={`text-[13.5px] font-medium px-3 py-1.75 cursor-pointer rounded-sm transition-all duration-150 whitespace-nowrap hover:text-text hover:bg-light
                                ${location.pathname === link.path
                                    ? 'font-semibold text-teal bg-teal-4'
                                    : 'text-text-3'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* desktop lang toggle */}
                <div className="hidden lg:flex items-center gap-2 ml-auto shrink-0">
                    <div className="flex bg-light rounded-sm p-0.75 gap-0.5">
                        <div
                            onClick={() => setLang('en')}
                            className={`font-mono text-[11px] font-semibold px-2.5 py-1 cursor-pointer rounded-[6px] transition-all duration-150
                                ${lang === 'en' ? 'bg-white text-text-3 shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : 'text-teal'}`}
                        >
                            EN
                        </div>
                        <div
                            onClick={() => setLang('km')}
                            className={`font-mono text-[11px] font-semibold px-2.5 py-1 cursor-pointer rounded-[6px] transition-all duration-150
                                ${lang === 'km' ? 'bg-white text-text-3 shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : 'text-teal'}`}
                        >
                            ខ្មែរ
                        </div>
                    </div>
                </div>

                {/* hamburger button — mobile only */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden ml-auto flex flex-col justify-center items-center w-9 h-9 gap-1.25 cursor-pointer"
                >
                    <span className={`block w-5 h-0.5 bg-text rounded-full transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.75' : ''}`} />
                    <span className={`block w-5 h-0.5 bg-text rounded-full transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-5 h-0.5 bg-text rounded-full transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.75' : ''}`} />
                </button>

            </div>

            {/* mobile menu dropdown */}
            {menuOpen && (
                <div className="lg:hidden border-t border-light-2 bg-white px-4 pb-4">

                    {/* mobile nav links */}
                    <div className="flex flex-col gap-0.5 pt-2">
                        {navLinks.map(link => (
                            <Link
                                key={link.id}
                                to={link.path}
                                onClick={closeMenu}
                                className={`text-[14px] font-medium px-4 py-2.5 rounded-sm transition-all duration-150
                                    ${location.pathname === link.path
                                        ? 'font-semibold text-teal bg-teal-4'
                                        : 'text-text-3 hover:text-text hover:bg-light'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-light-2 flex items-center gap-2">
                        <span className="text-[11px] text-text-3 font-semibold tracking-[0.5px] uppercase">Language</span>
                        <div className="flex bg-light rounded-sm p-0.75 gap-0.5">
                            <div
                                onClick={() => { setLang('en'); closeMenu(); }}
                                className={`font-mono text-[11px] font-semibold px-2.5 py-1 cursor-pointer rounded-[6px] transition-all duration-150
                                    ${lang === 'en' ? 'bg-white text-text-3 shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : 'text-teal'}`}
                            >
                                EN
                            </div>
                            <div
                                onClick={() => { setLang('km'); closeMenu(); }}
                                className={`font-mono text-[11px] font-semibold px-2.5 py-1 cursor-pointer rounded-[6px] transition-all duration-150
                                    ${lang === 'km' ? 'bg-white text-text-3 shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : 'text-teal'}`}
                            >
                                ខ្មែរ
                            </div>
                        </div>
                    </div>

                </div>
            )}

        </nav>
    );
}