/**
 * OMNI-NODE / Light Industrial Enterprise Dashboard
 * Drives the exact healthy, degradation, and critical state bands for the 30-second machine-protection demo.
 */
import { useCallback, useEffect, useMemo, useState } from "react";

export type MachineState = "healthy" | "warning" | "critical";
export type TelemetryPoint = { tick: string; x: number; y: number; z: number };
export type SpectrumPoint = { frequency: number; power: number };
export type MachineEvent = { level: "INFO" | "WATCH" | "CRITICAL"; message: string; score: string; stamp: string };

const baselineTelemetry: TelemetryPoint[] = [
  { tick: "-5", x: 0.13, y: 0.09, z: 0.17 }, { tick: "-4", x: 0.16, y: 0.12, z: 0.2 }, { tick: "-3", x: 0.12, y: 0.08, z: 0.16 }, { tick: "-2", x: 0.17, y: 0.1, z: 0.21 }, { tick: "-1", x: 0.14, y: 0.11, z: 0.18 }, { tick: "0", x: 0.16, y: 0.09, z: 0.2 },
];
const baselineSpectrum: SpectrumPoint[] = [{ frequency: 0, power: 3 }, { frequency: 60, power: 7 }, { frequency: 100, power: 21 }, { frequency: 110, power: 38 }, { frequency: 120, power: 86 }, { frequency: 130, power: 39 }, { frequency: 150, power: 20 }, { frequency: 220, power: 7 }, { frequency: 320, power: 4 }, { frequency: 500, power: 2 }];
const baselineEvents: MachineEvent[] = [
  { level: "INFO", message: "TensorRT FFT window validated", score: ".98", stamp: "NOW" }, { level: "INFO", message: "ESP32 packet validated", score: ".99", stamp: "-02s" }, { level: "WATCH", message: "120 Hz peak retained", score: ".81", stamp: "-05s" },
];
const clamp = (value: number, lower: number, upper: number) => Math.max(lower, Math.min(upper, value));

export function useMachineSimulation() {
  const [demoRunning, setDemoRunning] = useState(false);
  const [demoSeconds, setDemoSeconds] = useState(0);
  const [vibration, setVibration] = useState(1.42);
  const [temperature, setTemperature] = useState(36.5);
  const [health, setHealth] = useState(94);
  const [telemetry, setTelemetry] = useState<TelemetryPoint[]>(baselineTelemetry);
  const [spectrum, setSpectrum] = useState<SpectrumPoint[]>(baselineSpectrum);
  const [events, setEvents] = useState<MachineEvent[]>(baselineEvents);

  const state: MachineState = health <= 50 ? "critical" : health <= 72 ? "warning" : "healthy";
  const pushEvidence = useCallback((seconds: number, vibrationValue: number) => {
    const amplitude = clamp(vibrationValue / 8.8, 0.16, 1);
    setTelemetry((points) => [...points.slice(1), { tick: `${seconds}`, x: Number((0.12 + amplitude * 0.35 + (Math.random() - 0.5) * 0.1).toFixed(2)), y: Number((0.08 + amplitude * 0.25 + (Math.random() - 0.5) * 0.1).toFixed(2)), z: Number((0.16 + amplitude * 0.32 + (Math.random() - 0.5) * 0.1).toFixed(2)) }]);
    setSpectrum((points) => points.map((point) => ({ ...point, power: Number(clamp((point.frequency === 120 ? 30 + amplitude * 60 : 3 + amplitude * 22) + (Math.random() - 0.5) * 4, 1, 98).toFixed(1)) })));
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!demoRunning) {
        const nextVibration = Number(clamp(vibration + (Math.random() - 0.5) * 0.1, 1.32, 1.48).toFixed(2));
        const nextTemperature = Number(clamp(temperature + (Math.random() - 0.5) * 0.25, 36.1, 36.9).toFixed(1));
        setVibration(nextVibration);
        setTemperature(nextTemperature);
        pushEvidence(Date.now() % 999, nextVibration);
        return;
      }

      setDemoSeconds((elapsed) => {
        const second = elapsed + 1;
        let nextVibration = 1.42;
        let nextTemperature = 36.5;
        let nextHealth = 96;
        if (second <= 10) {
          nextVibration = Number((1.42 + (Math.random() - 0.5) * 0.08).toFixed(2));
          nextTemperature = Number((36.4 + (Math.random() - 0.5) * 0.3).toFixed(1));
          nextHealth = 96;
        } else if (second <= 20) {
          const progress = (second - 10) / 10;
          nextVibration = Number((1.42 + (4.5 - 1.42) * progress).toFixed(2));
          nextTemperature = Number((36.5 + (48 - 36.5) * progress).toFixed(1));
          nextHealth = Math.round(96 + (72 - 96) * progress);
        } else {
          const progress = (second - 20) / 10;
          nextVibration = Number((4.5 + (8.8 - 4.5) * progress).toFixed(2));
          nextTemperature = Number((48 + (68 - 48) * progress).toFixed(1));
          nextHealth = Math.round(72 + (50 - 72) * progress);
        }
        setVibration(nextVibration);
        setTemperature(nextTemperature);
        setHealth(nextHealth);
        pushEvidence(second, nextVibration);
        if (second === 11) setEvents((list) => ([{ level: "WATCH", message: "Chatter degradation trend detected", score: ".88", stamp: "NOW" } as MachineEvent, ...list].slice(0, 6)));
        if (second === 21) setEvents((list) => ([{ level: "WATCH", message: "Thermal threshold approach confirmed", score: ".86", stamp: "NOW" } as MachineEvent, ...list].slice(0, 6)));
        if (second >= 30) { setDemoRunning(false); setEvents((list) => ([{ level: "CRITICAL", message: "Feed-Hold Actuated", score: "1.00", stamp: "NOW" } as MachineEvent, ...list].slice(0, 6))); }
        return Math.min(second, 30);
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [demoRunning, pushEvidence, temperature, vibration]);

  const runDemo = useCallback(() => { if (health <= 50) return; setDemoSeconds(0); setDemoRunning(true); setEvents((list) => ([{ level: "INFO", message: "30-sec demo state machine initialized", score: ".99", stamp: "NOW" } as MachineEvent, ...list].slice(0, 6))); }, [health]);
  const reset = useCallback(() => { setDemoRunning(false); setDemoSeconds(0); setVibration(1.42); setTemperature(36.5); setHealth(94); setTelemetry(baselineTelemetry); setSpectrum(baselineSpectrum); setEvents(baselineEvents); }, []);
  return useMemo(() => ({ vibration, temperature, health, telemetry, spectrum, events, demoRunning, demoSeconds, state, runDemo, reset }), [vibration, temperature, health, telemetry, spectrum, events, demoRunning, demoSeconds, state, runDemo, reset]);
}
