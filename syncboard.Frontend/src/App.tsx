import { SparklesBackground } from "./components/sparkles-background";
import SyncBoard from "./sync-board";

export default function App() {
  return (
    <SparklesBackground>
      <main className="mx-auto max-w-6xl">
        <SyncBoard />
      </main>
    </SparklesBackground>
  );
}
