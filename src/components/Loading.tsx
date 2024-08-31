import React from 'react';
import { Loader2 } from "lucide-react"

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-100">
      <div className="relative w-24 h-24 mb-4">
        <div className="absolute inset-0 bg-amber-800 rounded-full animate-pulse"></div>
        <div className="absolute inset-1 bg-amber-200 rounded-full"></div>
        <div className="absolute inset-3 bg-amber-800 rounded-full">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-amber-200 rounded-full animate-bounce"></div>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-amber-800 mb-2">Kahve ile güzel dostluklar</h2>
      <p className="text-amber-700 mb-4">Kahveniz hazır olana kadar bekleyin</p>
      <Loader2 className="h-8 w-8 text-amber-600 animate-spin" />
      <div className="sr-only" aria-live="polite">Yükleniyor, Lütfen Bekleyin</div>
    </div>
  );
};

export default Loading;