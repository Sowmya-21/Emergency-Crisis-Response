import axios from 'axios';
import { EmergencyEvent, EmergencyResponse } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL || 'https://emergency-crisis-response-production.up.railway.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Increased timeout for Railway spin-up
});

// High-quality mock data for demo purposes when backend is unreachable
const MOCK_RESPONSE: EmergencyResponse = {
  confidence: 95,
  status: "CRITICAL",
  roles: {
    "staff1": "Security Lead",
    "staff2": "Medical Support"
  },
  route: "Main Exit A",
  path_coords: [{ x: 50, y: 50 }, { x: 60, y: 70 }, { x: 80, y: 90 }],
  alert: "Simulation Mode: Tactical Failover Active",
  checklist: ["Secure Perimeter", "Evacuate Zone A", "Initialize Comms"],
  priority_tasks: ["Evacuate North Atrium", "Deploy Smoke Curtains"],
  zone_actions: ["Lobby: Lock Doors", "North Atrium: Evacuate"],
  risk_type: "Fire",
  proximity_alerts: ["User staff2 near fire zone"],
  crowd_status: "High",
  response_time: "2 mins",
  explanation: ["Multiple sensor triggers", "SOS signal active"],
  log: {
    event: "SIMULATED_ALERT",
    timestamp: new Date().toISOString(),
    input: { sos: true, sensor: true, crowd: false, location: "floor1" },
    decision: { confidence: 95, status: "CRITICAL", route: "Exit A" },
    roles_assigned: { "staff1": "Security Lead" }
  },
  sensor_data: { "temp": "45C", "smoke": "Detected" },
  report: "Simulated Data for Tactical Decision Support",
  timeline: ["14:22 - Zone B Perimeter Breach", "14:20 - Water Mist System Activated"],
  situation: "Elevated Risk detected in North Sector",
  prediction: "Likely fire spread to Level 2 in 5 minutes",
  resources: ["Fire Unit 4", "Medic 2"],
  decision_confidence: "High",
  coordination: { command: ["Lead Shepard"], support: ["Medic Team"], evacuation: ["Staff Group A"] },
  justification: "Multi-point sensor confirmation with SOS authentication.",
  learning_status: "Active",
  anomaly: "None",
  acknowledgment: "Sent to all units",
  channels: ["Tactical-1", "Emergency-Broadcast"],
  crisis_stage: "Response",
  stakeholders: ["City Fire", "Building Security"],
  priority_level: "High",
  final_decision: "Evacuate",
  time_to_impact: "Immediate",
  context_alerts: [],
  reliability: "High",
  auto_actions: ["Activate Sprinklers"],
  shared_awareness: "Synced",
  kpis: { "time_to_decision_sec": 4, "sla_met": true },
  after_action: [],
  special_support: [],
  incident_id: "SIM-8821-X",
  playback: {},
  risk_action_map: {},
  action_sequence: {},
  spatial_info: { unit: "Floor 1 - North Wing" },
  blockchain_log: [
    {
      timestamp: new Date().toISOString(),
      event_type: "INITIAL_ALERT",
      details: "Emergency signal detected at floor1.",
      prev_hash: "0x000000000000",
      hash: "0x1a2b3c4d5e6f"
    }
  ],
  digital_twin: { 
    map_url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1000", 
    hotspots: [{ id: "lobby", label: "Lobby Area", coords: { x: 50, y: 50 }, status: "DANGER" }] 
  },
  raw_stream: { 
    smoke_ppm: [0, 5, 2, 8, 1], 
    thermal_gradient: "Elevated", 
    camera_feed: "Live", 
    external_bridge: "Connected" 
  },
  active_sop: { 
    version: "1.0", 
    last_updated: new Date().toISOString(), 
    steps: [{ id: "1", task: "Acknowledge Alert", mandatory: true, completed: false }] 
  },
  pr_narrative: { 
    headline: "Incident Handled Promptly", 
    body: "Tactical response units deployed. No casualties reported.", 
    approval_status: "PENDING_LEGAL", 
    timeline_summary: ["Event triggered", "Units deployed"] 
  },
  lone_worker_alerts: [],
  resilience: { mode: "CLOUD_SYNC", status: "Healthy", peer_count: 0 },
  command_center: {
    staff: [
      { id: "S1", name: "John Doe", role: "Security Lead", status: "busy", sub_status: "Evacuating Zone A", location: "North Atrium", coords: { x: 25, y: 30 } },
      { id: "S2", name: "Sarah Smith", role: "Medical Staff", status: "available", location: "Emergency Room", coords: { x: 75, y: 20 } }
    ],
    zones: [
      { id: "Z1", name: "North Atrium", status: "risk", staff_assigned: ["S1"], guests_count: 45, evacuation_progress: 65 },
      { id: "Z2", name: "Main Lobby", status: "safe", staff_assigned: [], guests_count: 12, evacuation_progress: 90 }
    ],
    fire_spread: { origin: "floor1", affected_zones: ["North Atrium"], rate: "2.5m/min" },
    evacuation_stats: { total_guests: 150, evacuated_count: 112, remaining_count: 38, progress_percentage: 74 },
    active_risks: [{ type: "SMOKE", location: "Exit B", severity: "high" }],
    iot_controls: { fire_suppression: false, door_locks: { "Exit A": "unlocked" }, elevators: "override", ventilation: "smoke_extraction" },
    operational_tasks: [
      { id: "T1", owner: "John Doe", task: "Evacuate North Atrium", status: "in_progress", due_time: "21:45", overdue: false }
    ],
    ai_suggestions: ["Redirect guests from Exit B to Emergency Stairs."],
    timeline_log: [{ time: "21:30", event: "Initial Alert Triggered", type: "auto" }],
    resources: [{ id: "R1", type: "Fire Extinguisher", status: "in_use", location: "Zone A" }]
  },
  responder_data: {
    next_best_action: { task: "Proceed to Floor 2 via Stairwell B", target: "Zone A (North Atrium)", distance: "15m", eta: "45s", hazard_warning: "High Smoke Density" },
    navigation: [{ instruction: "Forward 5m", distance: "5m" }],
    biometrics: { heart_rate: 115, stress_level: "ELEVATED", oxygen_level: 82, exposure_time: "12m" },
    nearby_teams: [{ id: "R2", name: "Medic Team", role: "Medic", distance: "12m" }],
    nearby_equipment: [{ id: "E1", type: "Fire Extinguisher", status: "AVAILABLE", location: "Hallway 2", distance: "8m" }],
    hazard_predictions: [{ type: "FLASHOVER", timer: "90s", action: "Ventilate" }],
    micro_sop: ["Check door temperature"],
    mission_status: { objective: "Evacuate Floor 2", progress: 70 }
  }
};

export const emergencyApi = {
  processEvent: async (event: EmergencyEvent): Promise<EmergencyResponse> => {
    try {
      const response = await api.post('/process', event);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      console.warn("Backend unreachable. Using Tactical Mock Data for demo.");
      return MOCK_RESPONSE;
    }
  },
  
  checkHealth: async (): Promise<{ message: string }> => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      return { message: "Tactical Hub: Running in Simulated Mode" };
    }
  },

  getGlobalIntelligence: async (): Promise<any> => {
    try {
      const response = await api.get('/global-intelligence');
      return response.data;
    } catch (error) {
      return { 
        incidents: [{ type: "Fire", location: [17.3850, 78.4867], severity: "Critical" }],
        active_responders: 12,
        system_health: "Optimal"
      };
    }
  },
};

export default api;
