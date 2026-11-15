import Board from "@/components/Board";
import GatSymbol from "@/components/GatSymbol";
import { GateProvider } from "@/components/GateProvider";
import Hero from "@/components/Hero";
import OrgChart from "@/components/OrgChart";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Splash from "@/components/Splash";
import Staff from "@/components/Staff";

export default function Page() {
  return (
    <GateProvider>
      <Splash />
      <GatSymbol />
      <SiteHeader />
      <main className="wrap">
        <Hero />
        <OrgChart />
        <Board />
        <Staff />
      </main>
      <SiteFooter />
    </GateProvider>
  );
}
