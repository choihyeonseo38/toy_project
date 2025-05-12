// src/components/KakaoMap.tsx

import React, { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  lat: number;
  lng: number;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ lat, lng }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=b101df8730d1b0213a22d21f7e29186b&autoload=false&libraries=services';
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
        };
        new window.kakao.maps.Map(container, options);
      });
    };
    document.head.appendChild(script);
  }, [lat, lng]);

  return <div id="map" style={{ width: '100%', height: '300px' }} />;
};

export default KakaoMap;
