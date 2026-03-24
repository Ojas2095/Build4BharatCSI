const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

// Parse user's generated anomalies.csv
let anomaliesData = [];
try {
  const csvPath = path.join(__dirname, '../datasets/anomalies.csv');
  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = fileContent.split('\n').filter(l => l.trim().length > 0);
  const headers = lines[0].split(',');
  
  for(let i = 1; i < lines.length; i++) {
    const vals = lines[i].split(',');
    anomaliesData.push({
      month: vals[0],
      district: vals[1],
      type: vals[2],
      description: vals[3],
      severity: vals[4],
      flagged_by: vals[5]
    });
  }
} catch (e) {
  console.log("Error loading CSV, using fallback data...", e.message);
}

// Parse user's generated pmddky_dashboard_dummy.csv for Analytics Page
let analyticsData = [];
try {
  const analyticsPath = path.join(__dirname, '../pmddky_dashboard_dummy.csv');
  const fileContent = fs.readFileSync(analyticsPath, 'utf-8');
  const lines = fileContent.split('\n').filter(l => l.trim().length > 0);
  
  for(let i = 1; i < lines.length; i++) {
    const vals = lines[i].split(',');
    analyticsData.push({
      category: vals[0],
      subcategory: vals[1],
      state: vals[2],
      district: vals[3],
      score: parseFloat(vals[4])
    });
  }
} catch (e) {
  console.log("Error loading Analytics CSV:", e.message);
}

// Initial Database State
let stats = { beneficiaries: 580210, funds: 847.2, progress: 76.1 };

// REST APIs
app.get('/api/stats', (req, res) => res.json(stats));
app.get('/api/anomalies', (req, res) => res.json(anomaliesData));
app.get('/api/analytics', (req, res) => {
  // Group analytics by district to generate the BarChart data
  const distMap = {};
  analyticsData.forEach(d => {
    if(!distMap[d.district]) distMap[d.district] = { scoreSum: 0, count: 0, anomalies: Math.floor(Math.random() * 5) };
    distMap[d.district].scoreSum += d.score;
    distMap[d.district].count++;
  });
  
  const formattedForChart = Object.keys(distMap).slice(0, 6).map(dist => ({
    name: dist,
    verified: Math.round((distMap[dist].scoreSum / distMap[dist].count) * 20), // Scale fake score to something visual
    anomalies: distMap[dist].anomalies
  }));
  res.json(formattedForChart);
});

// Mock LLM API Endpoint for Hackathon
app.post('/api/chat', express.json(), (req, res) => {
  const query = req.body.message.toLowerCase();
  let response = "I am the PM-DDKY Policy AI. How can I assist you with the currently loaded datasets?";
  
  if (query.includes('haridwar') || query.includes('drop')) {
    response = "Based on the recent `anomalies.csv` ingestion, Haridwar experienced a 12% enrollment drop due to 45 pending Aadhaar re-verifications in the Laksar block. I recommend releasing an emergency ₹12Cr buffer.";
  } else if (query.includes('anomaly') || query.includes('fraud')) {
    response = "My Isolation Forest model has detected High-Severity anomalies in `Pauri Garhwal`. Expected scheme leakage is currently at 4%. I have alerted the District Magistrate.";
  } else if (query.includes('status') || query.includes('report')) {
    response = `Statewide verification is at 76.1%. We have disbursed ₹${stats.funds}Cr to ${stats.beneficiaries.toLocaleString()} beneficiaries this fiscal year.`;
  } else {
    response = "Analyzing the current blockchain ledger and scheme parameters... Everything appears stable across the 13 targeted districts. Would you like me to run a predictive forecast for the upcoming Rabi season?";
  }

  setTimeout(() => res.json({ reply: response }), 1500); // Simulate ML delay
});

io.on('connection', (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);
  socket.emit('initial_data', stats);
});

// Broadcast Real CSV Data + Live Stats
let anomalyIndex = 0;
setInterval(() => {
  stats.beneficiaries += Math.floor(Math.random() * 5) + 1;
  stats.funds += Number((Math.random() * 0.05).toFixed(2));
  
  io.emit('kpi_update', {
    beneficiaries: `${(stats.beneficiaries / 100000).toFixed(2)}L+`,
    funds: `₹${stats.funds.toFixed(1)} Cr`,
    progress: `${(stats.progress + (Math.random() * 0.01)).toFixed(1)}%`
  });

  // Pick an anomaly from the real CSV file if available
  const isAnomalyEvent = Math.random() > 0.5;
  if(isAnomalyEvent && anomaliesData.length > 0) {
    const anomaly = anomaliesData[anomalyIndex % anomaliesData.length];
    anomalyIndex++;
    io.emit('activity_update', {
      type: anomaly.severity === 'HIGH' ? 'Critical Alert' : 'System Warning',
      district: anomaly.district,
      id: anomaly.type,
      isAnomaly: true,
      desc: anomaly.description
    });
  } else {
    // Normal verification event
    const districts = ['Dehradun', 'Haridwar', 'Pauri', 'Nainital', 'Chamoli'];
    io.emit('activity_update', {
      type: 'Verification Approved',
      district: districts[Math.floor(Math.random() * districts.length)],
      id: Math.floor(1000 + Math.random() * 9000),
      isAnomaly: false,
      desc: 'Aadhaar synced successfully'
    });
  }
}, 4000);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 PMDDKY Data Server running. Loaded ${anomaliesData.length} anomalies from CSV.`);
});
