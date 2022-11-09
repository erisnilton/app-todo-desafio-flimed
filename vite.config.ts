import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/app-todo-desafio",
  plugins: [
    react(),
    Pages({
      extendRoute(route, parent) {
        if (route.path === "/") {
          // Index is unauthenticated.
          return route;
        }
        // Augment the route with meta that indicates that the route requires authentication.
        return {
          ...route,
          meta: { auth: true },
        };
      },
    }),
  ],
});
