import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/client/footer/Footer';
import { ArrowUpCircle } from 'lucide-react';

const MainLayout: React.FC = () => {
    const [showButton, setShowButton] = useState(false);

    // 📌 Scroll event listener to detect scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // 📌 Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div>
            {/* <Navbar /> */}
            <Outlet />
            <Footer />

            {/* 📌 Scroll to Top Button */}
            {showButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-5 right-5 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
                >
                    <ArrowUpCircle size={24} />
                </button>
            )}
        </div>
    );
};

export default MainLayout;
