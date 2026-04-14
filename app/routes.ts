import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("search", "routes/search.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  // The splat route handles 404s within your design
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
