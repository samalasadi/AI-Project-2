"use client";

import { useState, useEffect, useRef } from "react";

const MOODS = [
  {
    id: "joyful",
    label: "Joyful",
    emoji: "☀️",
    bg: "from-amber-300 via-yellow-200 to-orange-300",
    accent: "bg-amber-500",
    text: "text-amber-900",
    subtext: "text-amber-700",
    ring: "ring-amber-400",
    glow: "#f59e0b",
    particle: "bg-amber-400",
    tagline: "You're radiating warmth.",
    description: "Everything feels bright and full of possibility.",
  },
  {
    id: "calm",
    label: "Calm",
    emoji: "🌊",
    bg: "from-sky-300 via-blue-200 to-teal-300",
    accent: "bg-sky-500",
    text: "text-sky-900",
    subtext: "text-sky-700",
    ring: "ring-sky-400",
    glow: "#0ea5e9",
    particle: "bg-sky-400",
    tagline: "Still water runs deep.",
    description: "A quiet mind at peace with the present moment.",
  },
  {
    id: "energised",
    label: "Energised",
    emoji: "⚡",
    bg: "from-lime-300 via-green-200 to-emerald-300",
    accent: "bg-lime-500",
    text: "text-lime-900",
    subtext: "text-lime-700",
    ring: "ring-lime-400",
    glow: "#84cc16",
    particle: "bg-lime-400",
    tagline: "Ready to take on anything.",
    description: "That spark is unmistakable — lean into it.",
  },
  {
    id: "melancholic",
    label: "Melancholic",
    emoji: "🌧️",
    bg: "from-indigo-300 via-purple-200 to-blue-300",
    accent: "bg-indigo-500",
    text: "text-indigo-900",
    subtext: "text-indigo-700",
    ring: "ring-indigo-400",
    glow: "#6366f1",
    particle: "bg-indigo-400",
    tagline: "Some days just feel heavier.",
    description: "It's okay — clouds have their own kind of beauty.",
  },
  {
    id: "anxious",
    label: "Anxious",
    emoji: "🌀",
    bg: "from-rose-300 via-pink-200 to-red-300",
    accent: "bg-rose-500",
    text: "text-rose-900",
    subtext: "text-rose-700",
    ring: "ring-rose-400",
    glow: "#f43f5e",
    particle: "bg-rose-400",
    tagline: "Breathe. You've got this.",
    description: "The storm will pass. One moment at a time.",
  },
  {
    id: "focused",
    label: "Focused",
    emoji: "🔭",
    bg: "from-violet-300 via-fuchsia-200 to-purple-300",
    accent: "bg-violet-500",
    text: "text-violet-900",
    subtext: "text-violet-700",
    ring: "ring-violet-400",
    glow: "#8b5cf6",
    particle: "bg-violet-400",
    tagline: "Locked in. Distractions dissolved.",
    description: "Your mind is a laser right now — aim it well.",
  },
  {
    id: "grateful",
    label: "Grateful",
    emoji: "🌸",
    bg: "from-pink-300 via-rose-200 to-fuchsia-300",
    accent: "bg-pink-500",
    text: "text-pink-900",
    subtext: "text-pink-700",
    ring: "ring-pink-400",
    glow: "#ec4899",
    particle: "bg-pink-400",
    tagline: "Counting the good things.",
    description: "There's so much to appreciate in the everyday.",
  },
  {
    id: "tired",
    label: "Tired",
    emoji: "🌙",
    bg: "from-slate-400 via-gray-300 to-zinc-400",
    accent: "bg-slate-500",
    text: "text-slate-900",
    subtext: "text-slate-700",
    ring: "ring-slate-400",
    glow: "#64748b",
    particle: "bg-slate-400",
    tagline: "Rest is productive too.",
    description: "Your body is asking for something. Listen to it.",
  },
];

function FloatingOrb({ color, style }) {
  return (
    <div
      className={`absolute rounded-full opacity-30 blur-3xl pointer-events-none ${color}`}
      style={style}
    />
  );
}

export default function MoodPage() {
  const [selected, setSelected] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [displayed, setDisplayed] = useState(null);
  const timeoutRef = useRef(null);

  const mood = displayed ? MOODS.find((m) => m.id === displayed) : null;

  function selectMood(id) {
    if (transitioning) return;
    if (id === selected) return;
    setTransitioning(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setSelected(id);
      setDisplayed(id);
      setTransitioning(false);
    }, 350);
    setSelected(id);
  }

  const bgClass = mood
    ? `bg-gradient-to-br ${mood.bg}`
    : "bg-gradient-to-br from-gray-100 via-slate-50 to-gray-200";

  return (
    <div
      className={`min-h-screen w-full transition-all duration-700 ease-in-out ${bgClass} relative overflow-hidden`}
    >
      {/* Ambient orbs */}
      {mood && (
        <>
          <FloatingOrb
            color={mood.particle}
            style={{ width: 400, height: 400, top: "-10%", left: "-10%", animationDuration: "8s" }}
          />
          <FloatingOrb
            color={mood.particle}
            style={{ width: 300, height: 300, bottom: "5%", right: "-5%", animationDuration: "12s" }}
          />
          <FloatingOrb
            color={mood.particle}
            style={{ width: 200, height: 200, top: "50%", left: "60%", animationDuration: "10s" }}
          />
        </>
      )}

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-6 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <p
            className={`text-xs uppercase tracking-[0.3em] font-medium mb-3 transition-colors duration-700 ${
              mood ? mood.subtext : "text-slate-400"
            }`}
          >
            Mood Mirror
          </p>
          <h1
            className={`text-4xl sm:text-5xl font-light tracking-tight transition-colors duration-700 ${
              mood ? mood.text : "text-slate-600"
            }`}
            style={{ fontFamily: "'Georgia', serif" }}
          >
            How are you feeling?
          </h1>
        </div>

        {/* Mood Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl mb-12">
          {MOODS.map((m) => (
            <button
              key={m.id}
              onClick={() => selectMood(m.id)}
              className={`
                group flex flex-col items-center gap-2 px-4 py-4 rounded-2xl
                border transition-all duration-300 cursor-pointer
                ${
                  selected === m.id
                    ? `${m.accent} border-transparent text-white shadow-lg scale-105`
                    : `bg-white/40 backdrop-blur-sm border-white/60 hover:bg-white/60 hover:scale-102 ${
                        mood ? mood.text : "text-slate-700"
                      }`
                }
              `}
            >
              <span className="text-2xl">{m.emoji}</span>
              <span
                className={`text-sm font-medium tracking-wide ${
                  selected === m.id ? "text-white" : mood ? mood.text : "text-slate-700"
                }`}
              >
                {m.label}
              </span>
            </button>
          ))}
        </div>

        {/* Mood Response Card */}
        <div
          className={`
            w-full max-w-lg transition-all duration-500
            ${mood ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
          `}
        >
          {mood && (
            <div className="bg-white/50 backdrop-blur-md rounded-3xl border border-white/70 p-8 text-center shadow-xl">
              <div className="text-5xl mb-4">{mood.emoji}</div>
              <h2
                className={`text-2xl font-light mb-2 ${mood.text}`}
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {mood.tagline}
              </h2>
              <p className={`text-sm leading-relaxed ${mood.subtext}`}>
                {mood.description}
              </p>

              {/* Decorative divider */}
              <div className={`mt-6 pt-6 border-t border-white/60 flex items-center justify-center gap-2`}>
                <div className={`w-1.5 h-1.5 rounded-full ${mood.accent} opacity-60`} />
                <div className={`w-2.5 h-2.5 rounded-full ${mood.accent}`} />
                <div className={`w-1.5 h-1.5 rounded-full ${mood.accent} opacity-60`} />
              </div>

              <p className={`mt-4 text-xs uppercase tracking-widest ${mood.subtext} opacity-70`}>
                feeling {mood.label.toLowerCase()}
              </p>
            </div>
          )}
        </div>

        {/* Placeholder when nothing selected */}
        {!mood && (
          <div className="text-center text-slate-400 mt-4">
            <p className="text-sm tracking-wide">Select a mood above to begin</p>
          </div>
        )}
      </div>
    </div>
  );
}
