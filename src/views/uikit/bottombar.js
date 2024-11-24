import React, { useState, useEffect } from 'react';
import { Home, History, BarChart2, Bell, Menu, X } from 'lucide-react';

const FloatingBottomNavBar = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [notifications, setNotifications] = useState(16);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showApps, setShowApps] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExpanded(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleHomeDoubleClick = () => {
        setIsExpanded(false);
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        setShowNotifications(false);
        setShowApps(false);
    };

    const toggleNotifications = (e) => {
        e.stopPropagation();
        setShowNotifications(!showNotifications);
        setShowApps(false);
    };

    const toggleApps = (e) => {
        e.stopPropagation();
        setShowApps(!showApps);
        setShowNotifications(false);
    };

    const NotificationCard = () => (
        <div className="absolute bottom-full mb-2 right-0 w-64 bg-black bg-opacity-80 rounded-lg p-4 max-h-96 overflow-y-auto custom-scrollbar">
            <h3 className="text-white mb-2">Notifications</h3>
            {[...Array(16)].map((_, i) => (
                <div key={i} className="text-white mb-2 pb-2 border-b border-gray-700">
                    Notification {i + 1}
                </div>
            ))}
        </div>
    );

    const AppsCard = () => (
        <div className="absolute bottom-full mb-2 left-0 w-72 bg-black bg-opacity-80 rounded-lg p-4 h-80 overflow-y-auto custom-scrollbar">
            <h3 className="text-white mb-2">Applications</h3>
            <div className="grid grid-cols-3 gap-4">
                {[...Array(32)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-gray-300 rounded-lg mb-1"></div>
                        <span className="text-white text-xs">App {i + 1}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
            <div
                className={`bg-black bg-opacity-70 rounded-full p-2 flex items-center justify-around transition-all duration-300 ease-in-out ${isExpanded ? 'w-64 h-14' : 'w-14 h-14'
                    }`}


            >
                {isExpanded ? (
                    <>
                        <Menu className="text-white w-5 h-5" onClick={toggleApps} />
                        <Home className="text-white w-5 h-5" onDoubleClick={handleHomeDoubleClick} />
                        <History className="text-white w-5 h-5" />
                        <BarChart2 className="text-white w-5 h-5" />
                        <div className="relative">
                            <Bell className="text-white w-5 h-5" onClick={toggleNotifications} />
                            {notifications > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    {notifications}
                                </span>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <span className="text-black font-bold text-xs" onClick={toggleExpand}>LOGO</span>
                        {notifications > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                {notifications}
                            </span>
                        )}
                    </div>
                )}
            </div>
            {showNotifications && <NotificationCard />}
            {showApps && <AppsCard />}
        </div>
    );
};

export default FloatingBottomNavBar;