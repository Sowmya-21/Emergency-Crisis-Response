import axios from 'axios';
import { EmergencyEvent, EmergencyResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://emergency-crisis-response-production.up.railway.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// High-quality mock data for demo purposes when backend is unreachable
const MOCK_RESPONSE: EmergencyResponse = {
  confidence: 95,
  status: "CRITICAL",
  roles: {},
  route: "Main Exit A",
  path_coords: [],
  alert: "Simulation Mode: Tactical Failover Active",
  checklist: [],
  priority_tasks: [],
  zone_actions: [],
  risk_type: "Fire",
  proximity_alerts: [],
  crowd_status: "High",
  response_time: "2 mins",
  explanation: [],
  log: {
    event: "SIMULATED_ALERT",
    timestamp: new Date().toISOString(),
    input: { sos: true, sensor: true, crowd: false, location: "floor1" },
    decision: { confidence: 95, status: "CRITICAL", route: "Exit A" },
    roles_assigned: {}
  },
  sensor_data: {},
  report: "Simulated Data",
  timeline: [],
  situation: "Elevated",
  prediction: "Stable",
  resources: [],
  decision_confidence: "High",
  coordination: { command: [], support: [], evacuation: [] },
  justification: "Mock failover",
  learning_status: "Active",
  anomaly: "None",
  acknowledgment: "Sent",
  channels: [],
  crisis_stage: "Response",
  stakeholders: [],
  priority_level: "High",
  final_decision: "Evacuate",
  time_to_impact: "Immediate",
  context_alerts: [],
  reliability: "High",
  auto_actions: [],
  shared_awareness: "Synced",
  kpis: {},
  after_action: [],
  special_support: [],
  incident_id: "SIM-123",
  playback: {},
  risk_action_map: {},
  action_sequence: {},
  spatial_info: { unit: "Floor 1" },
  blockchain_log: [],
  digital_twin: { map_url: "", hotspots: [] },
  raw_stream: { smoke_ppm: [], thermal_gradient: "Normal", camera_feed: "Live", external_bridge: "Connected" },
  active_sop: { version: "1.0", last_updated: "", steps: [] },
  pr_narrative: { headline: "", body: "", approval_status: "PENDING", timeline_summary: [] },
  lone_worker_alerts: [],
  resilience: { mode: "CLOUD_SYNC", status: "Healthy", peer_count: 0 },
  responder_data: {
    next_best_action: { task: "Proceed to Floor 2 via Stairwell B", target: "Zone A (North Atrium)", distance: "45m", eta: "45s" },
    navigation: [],
    biometrics: { heart_rate: 82, oxygen_level: 98, stress_level: "NORMAL", exposure_time: "5m" },
    nearby_teams: [],
    nearby_equipment: [],
    hazard_predictions: [{ type: "Structural Integrity", timer: "22:45", action: "Monitor" }],
    micro_sop: ["Secure immediate area", "Verify structural integrity", "Establish local comms uplink"],
    mission_status: { objective: "Evacuate Zone A", progress: 65 }
  }
};

export const emergencyApi = {
  processEvent: async (event: EmergencyEvent): Promise<EmergencyResponse> => {
    try {
      const response = await api.post('/process', event);
      return response.data;
    } catch (error) {
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
