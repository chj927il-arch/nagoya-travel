"use client";

import { useState } from "react";
import FlightPanel from "./components/FlightPanel";
import SpotsPanel from "./components/SpotsPanel";
import FoodPanel from "./components/FoodPanel";
import HotelPanel from "./components/HotelPanel";
import TransitPanel from "./components/TransitPanel";
import TranslatorPanel from "./components/TranslatorPanel";
import CurrencyPanel from "./components/CurrencyPanel";

const TABS = [
  { id: "flight",   label: "✈️ 항공편" },
  { id: "spots",    label: "🏯 관광지" },
  { id: "food",     label: "🍜 맛집" },
  { id: "hotel",    label: "🏨 숙소" },
  { id: "transit",  label: "🚇 교통" },
  { id: "currency", label: "💴 환율" },
  { id: "lang",     label: "🗣️ 일본어" },
];

export default function Home() {
  const [active, setActive] = useState("flight");

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
      <div style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)", padding: "20px 20px 0", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Noto Serif KR', serif", color: "var(--color-text)" }}>나고야 여행</h1>
            <span style={{ fontSize: 13, color: "var(--color-text-muted)" }}>名古屋 Travel Guide</span>
          </div>
          <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 14 }}>
            {TABS.map((t) => (
              <button key={t.id} className={`tab-btn${active === t.id ? " active" : ""}`} onClick={() => setActive(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "16px 16px 40px" }}>
        {active === "flight"   && <FlightPanel />}
        {active === "spots"    && <SpotsPanel />}
        {active === "food"     && <FoodPanel />}
        {active === "hotel"    && <HotelPanel />}
        {active === "transit"  && <TransitPanel />}
        {active === "currency" && <CurrencyPanel />}
        {active === "lang"     && <TranslatorPanel />}
      </div>
    </div>
  );
}
