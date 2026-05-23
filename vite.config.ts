import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const REQUIRED_BUILD_ENV = [
  "VITE_SUPABASE_URL",
  "VITE_SUPABASE_PUBLISHABLE_KEY",
];

export default defineConfig(({ mode, command }) => {
  // Merge .env files (loadEnv) with process.env (Vercel injects vars here).
  const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };

  if (command === "build") {
    const missing = REQUIRED_BUILD_ENV.filter((k) => !env[k]);
    if (missing.length) {
      throw new Error(
        "\n\n" +
          "========================================================\n" +
          "  BUILD ABORTED — missing required environment variables\n" +
          "========================================================\n" +
          missing.map((k) => `  • ${k}`).join("\n") +
          "\n\n" +
          "  Vercel: Settings → Environment Variables\n" +
          "  Local:  copy .env.example to .env.local and fill in\n" +
          "========================================================\n\n",
      );
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
