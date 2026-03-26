import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar(){
    const {lang, setLang, t} = useLanguage();
    const location = useLocation();

    const navLinks = [
        { id: 'Home', path: '/' ,label: t('navHome')},
        { id: 'About', path: '/about' ,label: t('navAbout')},
        { id: 'Bonds', path: '/bonds' ,label: t('navBonds')},
        { id: 'Debt Data', path: '/debt' ,label: t('navDebt')},
        { id: 'Documents', path: '/documents' ,label: t('navDocs')},
        { id: 'Education', path: '/education' ,label: t('navEdu')},
        { id: 'News', path: '/news' ,label: t('navNews')},
        { id: 'Contact', path: '/contact' ,label: t('navContact')},
    ];

    return (
        <nav className='bg-white border-b border-light-2 sticky top-0 z-200 shadow-[0_1px_0_var(--color-light-2),0_2px_12px_rgba(0,0,0,0.04)]'>
            <div className='max-w-325 mx-auto px-8 flex items-center h-16'>
                <Link to='/' className='flex items-center gap-3 cursor-pointer shrink-0 mr-10 no-underline'>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-sm flex items-center justify-center text-[17px] shrink-0"><img src='mef_logo.png'/></div>
                        <div>
                            <div className='font-display text-[15px] font-bold text-text tracking-[-0.2px]'>GDICDM</div>
                            <div className='text-[10px] text-text-3 mt-px font-normal'>Ministry of Economy &amp; Finance</div>
                        </div>
                    </div>
                </Link>
                <div className='flex items-center gap-0.5 flex-1'>
                    {navLinks.map(link => (
                        <Link
                            key={link.id}
                            to={link.path}
                            className={`text-[13.5px] font-medium text-text-3 px-3 py-1.75 cursor-pointer rounded-sm transition-all duration-150 whitespace-nowrap hover:text-text hover:bg-light ${location.pathname === link.path ? 'font-semibold text-teal bg-teal-4' : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
                <div className='flex items-center gap-2 ml-auto shrink-0'>
                    <div className='flex bg-light rounded-sm p-0.75 gap-0.5'>
                        <div
                            className={`font-mono text-[11px] font-semibold px-2.5 py-1 cursor-pointer text-text-3 rounded-[6px] transition-all duration-150 ${lang === 'en' ? 'text-teal bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : ''}`}
                            onClick={() => setLang('en')}
                        >
                            EN
                        </div>
                        <div
                            className={`font-mono text-[11px] font-semibold px-2.5 py-1 cursor-pointer text-text-3 rounded-[6px] transition-all duration-150 ${lang === 'km' ? 'text-teal bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : ''}`}
                            onClick={() => setLang('km')}
                        >
                            ខ្មែរ
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
    
}
