import axios from 'axios';
import { EmergencyEvent, EmergencyResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://emergency-crisis-response-production.up.railway.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// High-quality mock data for demo purposes when backend is unreachable
const MOCK_RESPONSE: EmergencyResponse = {
  action_plan: ["Establish perimeter at Sector 4", "Deploy medical drones to East Wing", "Initiate level 2 evacuation"],
  priority: "High",
  eta: "4 mins",
  resource_allocation: "Tactical Unit B + EMS Alpha",
  responder_data: {
    biometrics: { heart_rate: 82, oxygen_level: 98, body_temp: 36.8, stress_level: "Optimal" },
    next_best_action: { task: "Proceed to Floor 2 via Stairwell B", target: "Zone A (North Atrium)", distance: "45m" },
    micro_sop: ["Secure immediate area", "Verify structural integrity", "Establish local comms uplink"],
    hazard_predictions: [{ type: "Structural Integrity", probability: "Low", timer: "22:45", action: "Monitor" }]
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
