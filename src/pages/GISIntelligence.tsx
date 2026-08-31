import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


export function GISIntelligence() {
  const { workers, bookings } = useStore();

  const center: [number, number] = [21.1702, 72.8311]; // Surat

  return (
    <div className="flex-1 flex flex-col relative h-[calc(100vh-4rem)]">
      
      <div className="absolute top-4 left-4 z-[400] bg-white p-4 rounded-xl shadow-lg border border-slate-200 max-w-sm w-full">
        <h2 className="text-xl font-bold text-slate-900 mb-4">GIS Intelligence</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2 text-slate-700">
              <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
              Available Workers
            </span>
            <span className="font-medium text-slate-900">{workers.filter(w => w.status === 'Available').length}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2 text-slate-700">
              <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
              Active Jobs
            </span>
            <span className="font-medium text-slate-900">{bookings.filter(b => b.status !== 'Pending' && b.status !== 'Completed').length}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2 text-slate-700">
              <div className="w-4 h-4 bg-orange-500 rounded-full shadow-sm"></div>
              Service Demand
            </span>
            <span className="font-medium text-slate-900">18</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="bg-red-50 border border-red-100 rounded-lg p-3">
             <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">High Demand Zone</div>
             <div className="text-sm font-medium text-red-900">Plumbing (Zone 3)</div>
             <div className="text-xs text-red-700 mt-1">18 requests • 6 available workers</div>
             <div className="text-xs font-semibold text-red-600 mt-2 bg-red-100 px-2 py-1 rounded inline-block">Skill gap detected</div>
          </div>
        </div>
        
        <div className="mt-4 text-[10px] text-slate-400 uppercase text-center font-semibold">
          Illustrative prototype data
        </div>
      </div>

      <div className="flex-1 w-full h-full relative z-[100]">
        <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Demand Hotspot Circle */}
          <Circle 
            center={[21.185, 72.825]} 
            radius={800} 
            pathOptions={{ color: 'red', fillColor: '#ef4444', fillOpacity: 0.2 }}
          />

          {/* Worker Markers */}
          {workers.map(worker => {
            const hasActiveBooking = bookings.some(b => b.workerId === worker.id && b.status !== 'Pending' && b.status !== 'Completed');
            let icon = greenIcon; // default available
            if (hasActiveBooking) icon = blueIcon; // active job
            
            return (
              <Marker key={worker.id} position={worker.coordinates} icon={icon}>
                <Popup className="custom-popup">
                  <div className="font-sans min-w-[200px]">
                    <h3 className="font-bold text-base text-slate-900 m-0">{worker.name}</h3>
                    <p className="text-sm text-slate-500 m-0 mb-2">{worker.skill} • ⭐ {worker.rating}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                       <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                         <span className="text-slate-400 block">Distance</span>
                         <span className="font-medium">{worker.distance} km</span>
                       </div>
                       <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                         <span className="text-slate-400 block">Status</span>
                         <span className={cn("font-medium", hasActiveBooking ? "text-blue-600" : "text-green-600")}>
                           {hasActiveBooking ? 'Busy' : 'Available'}
                         </span>
                       </div>
                    </div>
                    {worker.matchScore && (
                      <div className="bg-teal-50 text-teal-700 text-xs font-bold px-2 py-1.5 rounded text-center mb-2">
                        {worker.matchScore}% AI Match Score
                      </div>
                    )}
                    <button className="w-full bg-slate-900 text-white py-1.5 rounded text-sm font-medium hover:bg-slate-800 transition-colors">
                      View Profile
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
          
          {/* Active Job / Demand Markers (Mocked) */}
          <Marker position={[21.185, 72.825]} icon={orangeIcon}>
            <Popup>
               <div className="font-sans">
                 <h3 className="font-bold text-orange-600">Service Demand</h3>
                 <p className="text-sm">Plumbing request (High Priority)</p>
               </div>
            </Popup>
          </Marker>
          <Marker position={[21.190, 72.835]} icon={orangeIcon} />
          
        </MapContainer>
      </div>
      
    </div>
  );
}
