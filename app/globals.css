* { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

html, body {
  background: #0a0a0a;
  color: #fff;
  font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
  min-height: 100vh;
}

button { font-family: inherit; cursor: pointer; border: none; background: none; color: inherit; }
input, textarea, select { font-family: inherit; }

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
::-webkit-scrollbar-thumb { background: rgba(255,45,117,0.4); border-radius: 3px; }

.serif { font-family: 'Cormorant Garamond', Georgia, serif; }

/* Animations */
@keyframes float-up {
  0% { transform: translateY(110vh) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-20vh) rotate(360deg); opacity: 0; }
}
@keyframes pop-in {
  0% { transform: scale(0) rotate(-20deg); opacity: 0; }
  60% { transform: scale(1.1) rotate(5deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
@keyframes slide-up {
  0% { transform: translateY(120%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
@keyframes slide-down {
  0% { transform: translateY(-120%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
@keyframes confetti-fall {
  0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
  100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
}
@keyframes shimmer {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
@keyframes wiggle {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}
@keyframes pulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,45,117,0.6); }
  50% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(255,45,117,0); }
}
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes glow {
  0%, 100% { text-shadow: 0 0 10px rgba(255,215,0,0.5), 0 0 20px rgba(255,215,0,0.3); }
  50% { text-shadow: 0 0 20px rgba(255,215,0,0.9), 0 0 40px rgba(255,215,0,0.6); }
}
@keyframes peach-jiggle {
  0%, 100% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.15) rotate(-8deg); }
  75% { transform: scale(1.15) rotate(8deg); }
}

.gold { color: #FFD700; }
.gold-glow { color: #FFD700; animation: glow 2.5s ease-in-out infinite; }
.gradient-text {
  background: linear-gradient(135deg, #FFD700, #FF2D75, #9D4EDD);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  backdrop-filter: blur(8px);
}

.btn-primary {
  background: linear-gradient(135deg, #FF2D75, #9D4EDD);
  color: white;
  padding: 14px 28px;
  border-radius: 999px;
  font-weight: 700;
  letter-spacing: 0.04em;
  font-size: 16px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 8px 24px rgba(255,45,117,0.3);
}
.btn-primary:active { transform: scale(0.96); }

.btn-gold {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #0a0a0a;
  padding: 14px 28px;
  border-radius: 999px;
  font-weight: 800;
  letter-spacing: 0.04em;
  font-size: 16px;
  box-shadow: 0 8px 24px rgba(255,215,0,0.3);
}
.btn-gold:active { transform: scale(0.96); }

.btn-ghost {
  background: rgba(255,255,255,0.06);
  color: white;
  padding: 12px 24px;
  border-radius: 999px;
  font-weight: 600;
  border: 1px solid rgba(255,255,255,0.12);
  transition: background 0.2s;
}
.btn-ghost:active { transform: scale(0.96); background: rgba(255,255,255,0.12); }

.photo-frame {
  position: relative;
  background: linear-gradient(135deg, #1a1a1a, #2a1a2a);
  border: 2px solid rgba(255,215,0,0.3);
  border-radius: 16px;
  overflow: hidden;
}
.photo-frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
.photo-frame.empty { display: grid; place-items: center; }
.photo-frame.empty span { font-size: 48px; opacity: 0.4; }

input[type="text"], input[type="number"], textarea, select {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 12px 16px;
  color: white;
  width: 100%;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
}
input[type="text"]:focus, input[type="number"]:focus, textarea:focus, select:focus {
  border-color: #FF2D75;
}

textarea { resize: vertical; min-height: 80px; }

.no-select { -webkit-user-select: none; user-select: none; }
