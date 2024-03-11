import React from 'react';

export default function LoadingOverlay() {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
                <div className="relative">
                    <svg className="h-20 w-20 animate-spin stroke-teal-500" viewBox="0 0 256 256">
                        <line x1="128" y1="64" x2="128" y2="96" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"></line>
                        <line x1="172" y1="84" x2="149.4" y2="106.6" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"></line>
                        <line x1="192" y1="128" x2="160" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"></line>
                        <line x1="172" y1="172" x2="149.4" y2="149.4" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"></line>
                        <line x1="128" y1="192" x2="128" y2="160" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"></line>
                        <line x1="84" y1="172" x2="106.6" y2="149.4" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"></line>
                        <line x1="64" y1="128" x2="96" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"></line>
                        <line x1="84" y1="84" x2="106.6" y2="106.6" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"></line>
                        <circle cx="128" cy="128" r="25" className="text-teal-500" fill="currentColor" />
                        <circle cx="128" cy="128" r="256" fill="none" stroke-width="20" />
                    </svg>
                    <svg className="h-20 w-20 absolute top-0 left-0 stroke-teal-500" viewBox="0 0 256 256">
                        <line x1="128" y1="0" x2="300" y2="5" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"></line>
                        <line x1="230" y1="55" x2="420" y2="55" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"></line>
                        <line x1="252" y1="50" x2="252" y2="0" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"></line>
                    </svg>
                    <div className="absolute inset-4 flex items-center justify-center border-teal-500 border-2 rounded-full"></div>
                    <div className="absolute inset-0 flex items-center justify-center border-teal-500 border-2 rounded-full"></div>
                </div>
                <span className="text-4xl font-medium text-gray-400">Loading...</span>
            </div>
        </div>
    );
}
