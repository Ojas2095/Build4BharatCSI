import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers, MapPin, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const MapPage = () => {
  const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  const districts = [
    { name: 'Dehradun', coords: [30.3165, 78.0322], beneficiaries: 85000, color: '#00c97a' },
    { name: 'Haridwar', coords: [29.9457, 78.1642], beneficiaries: 140000, color: '#00c97a' },
    { name: 'Udham Singh Nagar', coords: [28.9844, 79.4005], beneficiaries: 120000, color: '#d4a820' },
    { name: 'Nainital', coords: [29.3919, 79.4542], beneficiaries: 70000, color: '#00c97a' },
    { name: 'Pauri Garhwal', coords: [30.1458, 78.7758], beneficiaries: 40000, color: '#cc2222' }
  ];

  return (
    <div className="flex flex-col h-full bg-white/95 rounded-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.4)] overflow-hidden"
         style={{ borderTop: '5px solid #1a7c45' }}>
      
      {/* Map Header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <h2 className="text-xl font-black text-pmddky-dark tracking-wide flex items-center gap-2">
            <MapPin className="text-pmddky-accent" /> GIS Map
          </h2>
          <p className="text-sm text-gray-500 font-bold">Uttarakhand District Overlays & Heatmaps</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => toast('GIS Filtering Panel (Demo Mode)')} className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm text-xs font-bold text-gray-600 hover:bg-gray-50">
            <Filter className="w-4 h-4" /> Filter Districts
          </button>
          <button onClick={() => toast.success('Heatmap toggled successfully')} className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-pmddky-dark text-white rounded-md shadow-sm text-xs font-bold hover:bg-pmddky-mid">
            <Layers className="w-4 h-4 text-pmddky-accent" /> Toggle Heatmap
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative z-0">
        <div className="absolute bottom-6 right-6 z-[400] bg-white/95 backdrop-blur-md p-4 rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.3)] border border-gray-100 min-w-[160px]">
          <h4 className="text-[10px] font-black text-pmddky-dark uppercase tracking-widest mb-3 border-b border-gray-100 pb-2">Density Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3"><span className="w-3 h-3 rounded-full bg-[#00c97a] shadow-sm"></span><span className="text-xs font-bold text-gray-700">Healthy</span></div>
            <div className="flex items-center gap-3"><span className="w-3 h-3 rounded-full bg-[#d4a820] shadow-sm"></span><span className="text-xs font-bold text-gray-700">Warning Monitor</span></div>
            <div className="flex items-center gap-3"><span className="w-3 h-3 rounded-full bg-[#cc2222] shadow-sm"></span><span className="text-xs font-bold text-gray-700">Critical Anomaly</span></div>
          </div>
        </div>
        <MapContainer center={[30.0668, 79.0193]} zoom={8} className="w-full h-full" zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {districts.map((d, i) => (
             <Circle 
               key={i} 
               center={d.coords} 
               radius={d.beneficiaries / 5} 
               pathOptions={{ fillColor: d.color, color: d.color, fillOpacity: 0.4 }}
             >
               <Popup className="font-sans">
                 <div className="font-bold text-pmddky-dark mb-1">{d.name}</div>
                 <div className="text-xs text-gray-600">Beneficiaries: <span className="text-pmddky-bright font-black">{d.beneficiaries.toLocaleString()}</span></div>
                 <button onClick={() => toast(`Downloading report for ${d.name}...`)} className="cursor-pointer mt-2 text-[10px] bg-pmddky-offwhite border border-gray-200 w-full py-1 rounded text-pmddky-mid font-bold hover:bg-gray-100">View Detail Report</button>
               </Popup>
               <Marker position={d.coords} icon={icon} />
             </Circle>
          ))}
        </MapContainer>
      </div>
      
    </div>
  );
};

export default MapPage;
