"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
};

/**
 * <SpaceBackground />
 * A lightweight, living deep-space backdrop rendered on a single <canvas>:
 * faint twinkling stars, white glowing shooting stars streaking across,
 * slow-drifting satellites, the occasional comet, and a periodic ISS fly-by.
 * Purely decorative — sits behind content at z-0 and ignores pointer events.
 */
export function SpaceBackground({ className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    // Non-null aliases so TypeScript keeps the narrowing inside the closures.
    const view: HTMLCanvasElement = canvas;
    const ctx: CanvasRenderingContext2D = context;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let last = 0;

    type Star = { x: number; y: number; r: number; a: number; tw: number; tp: number };
    type Shooting = { x: number; y: number; vx: number; vy: number; len: number; life: number; max: number };
    type Satellite = { x: number; y: number; vx: number; vy: number; size: number; blink: number };
    type Comet = { x: number; y: number; vx: number; vy: number; life: number; max: number };
    type Iss = { x: number; y: number; vx: number; vy: number };

    let stars: Star[] = [];
    let satellites: Satellite[] = [];
    let shooting: Shooting[] = [];
    let comets: Comet[] = [];
    let iss: Iss | null = null;

    // Countdown timers (seconds) until the next spawn of each rare object.
    let shootTimer = rand(0.6, 2.5);
    let cometTimer = rand(10, 18);
    let issTimer = rand(8, 16);

    function makeSatellite(): Satellite {
      const fromLeft = Math.random() < 0.5;
      const speed = rand(12, 26);
      const angle = rand(-0.25, 0.25);
      return {
        x: fromLeft ? -20 : width + 20,
        y: rand(0.08, 0.92) * height,
        vx: (fromLeft ? 1 : -1) * speed * Math.cos(angle),
        vy: speed * Math.sin(angle),
        size: rand(1, 1.8),
        blink: Math.random() * Math.PI * 2,
      };
    }

    function initStars() {
      const count = Math.max(40, Math.min(150, Math.round((width * height) / 15000)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.3,
        a: Math.random() * 0.5 + 0.2,
        tw: rand(0.4, 1.6),
        tp: Math.random() * Math.PI * 2,
      }));
    }

    function initSatellites() {
      const count = Math.max(2, Math.min(5, Math.round(width / 520)));
      satellites = Array.from({ length: count }, makeSatellite);
    }

    function spawnShooting() {
      const dir = Math.random() < 0.5 ? 1 : -1;
      const speed = rand(720, 1100);
      const angle = rand(0.18, 0.5) * Math.PI; // mostly downward
      shooting.push({
        x: dir === 1 ? rand(-0.1, 0.6) * width : rand(0.4, 1.1) * width,
        y: rand(-0.05, 0.4) * height,
        vx: dir * speed * Math.cos(angle),
        vy: speed * Math.sin(angle),
        len: rand(80, 170),
        life: 0,
        max: rand(0.6, 1.1),
      });
    }

    function spawnComet() {
      const fromLeft = Math.random() < 0.5;
      const speed = rand(85, 135);
      const angle = rand(0.04, 0.22) * Math.PI * (Math.random() < 0.5 ? 1 : -1);
      comets.push({
        x: fromLeft ? -80 : width + 80,
        y: rand(0.05, 0.7) * height,
        vx: (fromLeft ? 1 : -1) * speed * Math.cos(angle),
        vy: speed * Math.sin(angle),
        life: 0,
        max: rand(9, 14),
      });
    }

    function spawnIss() {
      const fromLeft = Math.random() < 0.5;
      const speed = rand(55, 78);
      iss = {
        x: fromLeft ? -50 : width + 50,
        y: rand(0.12, 0.55) * height,
        vx: (fromLeft ? 1 : -1) * speed,
        vy: rand(-6, 6),
      };
    }

    /* ---------------------------- drawing ---------------------------- */

    function drawStars(dt: number) {
      for (const s of stars) {
        s.tp += s.tw * dt;
        const alpha = Math.max(0.05, s.a + Math.sin(s.tp) * 0.18);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }
    }

    function drawSatellite(sat: Satellite) {
      const blink = 0.5 + 0.5 * Math.sin(sat.blink);
      ctx.strokeStyle = "rgba(150, 170, 205, 0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(sat.x - 4, sat.y);
      ctx.lineTo(sat.x + 4, sat.y);
      ctx.stroke();

      ctx.fillStyle = "rgba(205, 215, 235, 0.6)";
      ctx.fillRect(sat.x - sat.size / 2, sat.y - sat.size / 2, sat.size, sat.size);

      ctx.beginPath();
      ctx.arc(sat.x, sat.y, 1.1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(120, 200, 255, ${0.3 + blink * 0.6})`;
      ctx.shadowColor = "rgba(120, 200, 255, 0.8)";
      ctx.shadowBlur = 4 * blink;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    function drawShooting(s: Shooting) {
      const a = Math.max(0, 1 - s.life / s.max);
      const sp = Math.hypot(s.vx, s.vy) || 1;
      const ux = s.vx / sp;
      const uy = s.vy / sp;
      const tailX = s.x - ux * s.len;
      const tailY = s.y - uy * s.len;

      const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${a})`);
      grad.addColorStop(0.4, `rgba(205, 225, 255, ${a * 0.45})`);
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    function drawComet(c: Comet) {
      const a = Math.max(
        0,
        Math.min(1, Math.min(c.life / 1.2, (c.max - c.life) / 2))
      );
      const sp = Math.hypot(c.vx, c.vy) || 1;
      const ux = c.vx / sp;
      const uy = c.vy / sp;
      const len = 150;
      const tailX = c.x - ux * len;
      const tailY = c.y - uy * len;

      const grad = ctx.createLinearGradient(c.x, c.y, tailX, tailY);
      grad.addColorStop(0, `rgba(185, 218, 255, ${a * 0.8})`);
      grad.addColorStop(1, "rgba(120, 170, 255, 0)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(c.x, c.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(c.x, c.y, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 242, 255, ${a})`;
      ctx.shadowColor = "rgba(150, 200, 255, 0.9)";
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    function drawIss(o: Iss) {
      // solar-panel wings
      ctx.strokeStyle = "rgba(160, 185, 225, 0.55)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(o.x - 9, o.y);
      ctx.lineTo(o.x + 9, o.y);
      ctx.stroke();

      ctx.strokeStyle = "rgba(120, 150, 200, 0.4)";
      ctx.lineWidth = 1;
      for (const dx of [-7, -4, 4, 7]) {
        ctx.beginPath();
        ctx.moveTo(o.x + dx, o.y - 2.6);
        ctx.lineTo(o.x + dx, o.y + 2.6);
        ctx.stroke();
      }

      // body + light
      ctx.fillStyle = "rgba(220, 230, 245, 0.85)";
      ctx.fillRect(o.x - 2, o.y - 2, 4, 4);
      ctx.beginPath();
      ctx.arc(o.x, o.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(185, 222, 255, 0.95)";
      ctx.shadowColor = "rgba(150, 200, 255, 0.9)";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // tiny label so the fly-by reads as the ISS
      ctx.font = "9px ui-monospace, monospace";
      ctx.fillStyle = "rgba(180, 200, 235, 0.5)";
      ctx.fillText("ISS", o.x + 13, o.y + 3);
    }

    /* ---------------------------- loop ---------------------------- */

    function step(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, width, height);

      drawStars(dt);

      for (const sat of satellites) {
        sat.x += sat.vx * dt;
        sat.y += sat.vy * dt;
        sat.blink += dt * 4;
        if (sat.x < -40 || sat.x > width + 40 || sat.y < -40 || sat.y > height + 40) {
          Object.assign(sat, makeSatellite());
        }
        drawSatellite(sat);
      }

      shootTimer -= dt;
      if (shootTimer <= 0 && shooting.length < 3) {
        spawnShooting();
        shootTimer = rand(0.8, 3.4);
      }
      shooting = shooting.filter((s) => s.life < s.max);
      for (const s of shooting) {
        s.life += dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        drawShooting(s);
      }

      cometTimer -= dt;
      if (cometTimer <= 0 && comets.length < 1) {
        spawnComet();
        cometTimer = rand(14, 24);
      }
      comets = comets.filter((c) => c.life < c.max && c.x > -160 && c.x < width + 160);
      for (const c of comets) {
        c.life += dt;
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        drawComet(c);
      }

      issTimer -= dt;
      if (!iss && issTimer <= 0) {
        spawnIss();
        issTimer = rand(24, 40);
      }
      if (iss) {
        iss.x += iss.vx * dt;
        iss.y += iss.vy * dt;
        if (iss.x < -90 || iss.x > width + 90) iss = null;
        else drawIss(iss);
      }

      raf = requestAnimationFrame(step);
    }

    function init() {
      const rect = view.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      view.width = Math.floor(width * dpr);
      view.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
      initSatellites();
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 150);
    }

    init();
    if (reduceMotion) {
      // Static single frame — stars only, no motion.
      ctx.clearRect(0, 0, width, height);
      drawStars(0);
    } else {
      last = performance.now();
      raf = requestAnimationFrame(step);
    }

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-0 h-full w-full ${className}`}
    />
  );
}

export default SpaceBackground;
