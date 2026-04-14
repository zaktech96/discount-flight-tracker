export const config = {
  features: {
    auth: true,
    payments: false,
    convex: true,
    email: false,
    monitoring: false,
  },
  services: {
    clerk: { enabled: true },
    convex: { enabled: true },
  },
  ui: {
    showAuth: true,
    showDashboard: true,
    showChat: false,
    showPricing: false,
  }
};
