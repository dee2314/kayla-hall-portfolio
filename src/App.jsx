import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Mail, FileText, ArrowUpRight, ArrowRight, ArrowLeft, X, Menu,
  Sparkles, Camera, Clapperboard, PenTool, Palette, TrendingUp,
  Compass, Search, Target, Wand2, Rocket, Heart,
  ChevronDown, Quote, Play, ExternalLink,
} from "lucide-react";

/* ============================================================
   KAYLA HALL — Digital Marketing Portfolio
   Single-file React build. Custom CSS (no Tailwind) so every
   decision — color, type, spacing — is deliberate and on-brand.

   IMAGE HANDOFF NOTE FOR WHOEVER WIRES IN REAL ASSETS:
   Every photo/video slot renders through <Frame> or <PhoneScreen>.
   Swap the placeholder by passing a `src` prop (real image/video
   thumbnail) — the frame, caption and layout stay identical.
   Search "SWAP:" comments to find every slot and what belongs there.
   ============================================================ */

/* ---------------- design tokens ---------------- */
const IMG = {
  resumePDF: "/Kayla_Hall_Resume.pdf",
  refineBeforeDessert: "/images/refineBeforeDessert.jpg",
  orchidPhone: "/images/orchidPhone.jpg",
  magazineOriginal: "/images/magazineOriginal.jpg",
  newPortrait: "/images/newPortrait.jpg",
  newRooftop: "/images/newRooftop.jpg",
  newEditorial: "/images/newEditorial.jpg",
  newMacro: "/images/newMacro.jpg",
  newAmbient: "/images/newAmbient.jpg",
  newMagazine: "/images/newMagazine.jpg",
  newClient: "/images/newClient.jpg",
  newLifestyle: "/images/newLifestyle.jpg",
  newMoodOrchid: "/images/newMoodOrchid.jpg",
  refineBefore: "/images/refineBefore.jpg",
  lifestylePhoto: "/images/lifestylePhoto.jpg",
  magazineEditorial: "/images/magazineEditorial.jpg",
  flatlay: "/images/flatlay.jpg",
  rooftop: "/images/rooftop.jpg",
  editorial: "/images/editorial.jpg",
  event: "/images/event.jpg",
  macro: "/images/macro.jpg",
  portrait: "/images/portrait.jpg",
  aboutMe: "/images/aboutMe.jpg",
  mood1: "/images/mood1.jpg",
  mood2: "/images/mood2.jpg",
  mood3: "/images/mood3.jpg",
  mood4: "/images/mood4.jpg",
  mood5: "/images/mood5.jpg",
  mood6: "/images/mood6.jpg",
  mood7: "/images/mood7.jpg",
  mood8: "/images/mood8.jpg",
  mood9: "/images/mood9.jpg",
  birthdayCake: "/images/birthdayCake.jpg",
  atlWeekend: "/images/atlWeekend.jpg",
  sigScents: "/images/sigScents.jpg",
  certHubspot: "/images/certHubspot.jpg",
  certCanva: "/images/certCanva.jpg",
  matchaAd: "/images/matchaAd.jpg",
  heartDoodle: "/images/heartDoodle.jpg",
  videoLifestyle: "/images/videoLifestyle.jpg",
  videoClient: "/images/videoClient.jpg",
  videoEvent: "/images/videoEvent.jpg",
  videoTestimonial: "/images/videoTestimonial.jpg",
};

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Parisienne&family=Work+Sans:wght@300;400;500;600;700&display=swap";

const GLOBAL_CSS = `
  :root{
    --ivory:#FFFFFF;
    --paper:#F7F4EF;
    --blush:#F1D9DD;
    --tape:#F0DCC8;
    --rosewood:#8C3A48;
    --rosewood-deep:#6E2938;
    --espresso:#1E1815;
    --espresso-soft:#5C5049;
    --sage:#7C8A69;
    --sage-deep:#5E6B4E;
    --gold:#B8873F;
    --line:rgba(30,24,21,0.15);
    --shadow: 0 20px 50px rgba(30,24,21,0.09);
    --nav-bg: rgba(255,255,255,0.86);
  }
  .khp[data-theme="dark"]{
    --ivory:#211814;
    --paper:#2B211C;
    --blush:#4A2E33;
    --tape:#3A2E22;
    --rosewood:#E28FA0;
    --rosewood-deep:#F1B8C4;
    --espresso:#F5E9DE;
    --espresso-soft:#CBB8AC;
    --sage:#9DAE87;
    --sage-deep:#B9C9A3;
    --gold:#E3C083;
    --line:rgba(245,233,222,0.14);
    --shadow: 0 20px 60px rgba(0,0,0,0.45);
    --nav-bg: rgba(33,24,20,0.86);
  }
  .khp *{box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
  .khp button, .khp a{ -webkit-tap-highlight-color:transparent; }
  .khp{
    background:var(--ivory);
    color:var(--espresso);
    font-family:'Work Sans', sans-serif;
    position:relative;
    overflow-x:hidden;
    transition:background .6s ease, color .6s ease;
    line-height:1.5;
  }
  .khp .script{ font-family:'Parisienne', cursive; }
  .khp h1,.khp h2,.khp h3,.khp h4{
    font-family:'Fraunces', serif;
    color:var(--espresso);
    margin:0;
    letter-spacing:-0.01em;
  }
  .khp .eyebrow{
    font-family:'Work Sans',sans-serif;
    text-transform:uppercase;
    letter-spacing:0.22em;
    font-size:0.72rem;
    font-weight:600;
    color:var(--rosewood);
  }
  .khp button{font-family:inherit;cursor:pointer;}
  .khp a{color:inherit;}
  .khp .grain{
    position:fixed; inset:0; pointer-events:none; z-index:1;
    opacity:0.05; mix-blend-mode:multiply;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  @keyframes fadeUp{ from{opacity:0; transform:translateY(28px);} to{opacity:1; transform:translateY(0);} }
  @keyframes drawLine{ to{ stroke-dashoffset:0; } }
  @keyframes marquee{ from{transform:translateX(0);} to{transform:translateX(-50%);} }
  @keyframes floatSlow{ 0%,100%{transform:translateY(0) rotate(0deg);} 50%{transform:translateY(-10px) rotate(2deg);} }
  @keyframes shimmer{ 0%{background-position:-200% 0;} 100%{background-position:200% 0;} }

  .khp .reveal{ opacity:0; }
  .khp .reveal.in{ animation:fadeUp 0.8s cubic-bezier(.16,.8,.3,1) forwards; }

  @media (prefers-reduced-motion:reduce){
    .khp .reveal{ opacity:1 !important; animation:none !important; }
    .khp *{ animation-duration:0.001ms !important; }
  }

  /* ---- nav ---- */
  .khp-nav{
    position:fixed; top:0; left:0; right:0; z-index:1010;
    display:flex; align-items:center; justify-content:space-between;
    padding:20px clamp(20px,5vw,56px);
    transition:background .35s ease, box-shadow .35s ease, padding .35s ease;
  }
  .khp-nav.scrolled{
    background:var(--nav-bg); backdrop-filter:blur(10px);
    box-shadow:0 1px 0 var(--line); padding:12px clamp(20px,5vw,56px);
  }
  .khp-logo{
    font-family:'Parisienne',cursive; font-size:1.5rem; color:var(--rosewood-deep);
    width:42px; height:42px; border-radius:50%; border:1.5px solid var(--rosewood);
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
    background:none; transition:transform .3s ease, background .3s ease;
  }
  .khp-logo:hover{ transform:scale(1.06); background:var(--paper); }
  .khp-dots{ display:flex; gap:26px; align-items:center; }
  .khp-dot-item{ display:flex; align-items:center; gap:8px; background:none; border:none; padding:0; }
  .khp-dot{ width:7px; height:7px; border-radius:50%; background:var(--line); transition:all .3s ease; }
  .khp-dot-item.active .khp-dot{ background:var(--rosewood); transform:scale(1.3); }
  .khp-dot-label{
    font-size:0.72rem; letter-spacing:0.08em; text-transform:uppercase; color:var(--espresso-soft);
    max-width:0; overflow:hidden; white-space:nowrap; opacity:0; transition:all .3s ease;
  }
  .khp-dot-item.active .khp-dot-label{ max-width:140px; opacity:1; color:var(--rosewood); }
  .khp-burger{ display:none; background:none; border:none; position:relative; z-index:1002; }

  /* ---- theme toggle ---- */
  .khp-theme-toggle{
    position:relative; width:54px; height:30px; border-radius:100px; border:1px solid var(--line);
    background:var(--paper); flex-shrink:0; overflow:hidden; transition:background .4s ease, border-color .4s ease;
  }
  .khp-theme-thumb{
    position:absolute; top:2px; left:2px; width:24px; height:24px; border-radius:50%;
    background:var(--rosewood); display:flex; align-items:center; justify-content:center; font-size:13px;
    transition:transform .45s cubic-bezier(.34,1.4,.64,1), background .4s ease;
  }
  .khp[data-theme="dark"] .khp-theme-thumb{ transform:translateX(24px); background:var(--espresso-soft); }

  /* ---- petal cursor trail ---- */
  .khp-petal{
    position:absolute; pointer-events:none; font-size:14px; z-index:3;
    animation:petalFall 1.1s ease-out forwards;
  }
  @keyframes petalFall{
    0%{ opacity:0.9; transform:translate(0,0) rotate(0deg) scale(1); }
    100%{ opacity:0; transform:translate(var(--dx), 46px) rotate(160deg) scale(0.6); }
  }

  /* ---- tilt card ---- */
  .khp-tilt{ transform-style:preserve-3d; will-change:transform; }

  /* ---- magnetic button wrapper ---- */
  .khp-magnetic{ display:inline-block; }


  /* ---- hero ---- */
  .khp-hero{
    min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center;
    text-align:center; padding:140px 20px 80px; position:relative;
    background-image:radial-gradient(var(--line) 1px, transparent 1px);
    background-size:26px 26px; background-position:center;
  }
  .khp-hero-name{
    font-size:clamp(3.5rem,10vw,7.5rem); line-height:0.95;
    background:linear-gradient(100deg, var(--rosewood-deep) 42%, var(--gold) 50%, var(--rosewood-deep) 58%);
    background-size:250% 100%; -webkit-background-clip:text; background-clip:text; color:transparent;
  }
  .khp-hero-name.in{ animation:fadeUp 0.8s cubic-bezier(.16,.8,.3,1) forwards, nameShine 2.6s ease-in-out 1.3s 1 both; }
  @keyframes nameShine{ 0%{ background-position:200% 0; } 100%{ background-position:-40% 0; } }
  .khp-hero-sub{
    font-family:'Fraunces',serif; font-style:italic; font-weight:400;
    font-size:clamp(1.1rem,2.4vw,1.5rem); color:var(--espresso-soft); max-width:620px; margin:22px auto 0;
  }
  .khp-sig-line{ width:180px; height:auto; margin:18px auto 0; display:block; opacity:0.9; }
  .khp[data-theme="dark"] .khp-sig-line{ filter:invert(1) brightness(1.15); opacity:0.95; }
  .khp-cta-row{ display:flex; gap:18px; margin-top:36px; flex-wrap:wrap; justify-content:center; }
  .khp-btn{
    display:inline-flex; align-items:center; gap:9px; padding:14px 28px; border:1.5px solid transparent;
    border-radius:100px; font-size:0.9rem; font-weight:600; letter-spacing:0.01em; position:relative;
    transition:transform .25s ease, box-shadow .25s ease, background .25s ease, color .25s ease;
  }
  .khp-btn-solid{ background:var(--rosewood); color:var(--ivory); }
  .khp-btn-solid:hover{ background:var(--rosewood-deep); transform:translateY(-2px); box-shadow:0 10px 24px rgba(140,58,72,0.3); }
  .khp-btn-outline{ border-color:var(--espresso); color:var(--espresso); background:var(--ivory); }
  .khp-btn-outline:hover{ background:var(--espresso); color:var(--ivory); transform:translateY(-2px); }

  .khp-marquee-wrap{ width:100%; overflow:hidden; border-top:1px solid var(--line); border-bottom:1px solid var(--line); padding:16px 0; margin-top:64px; }
  .khp-marquee{ display:flex; width:max-content; animation:marquee 26s linear infinite; }
  .khp-marquee span{
    font-family:'Fraunces',serif; font-size:1.05rem; padding:0 26px; white-space:nowrap; color:var(--espresso-soft);
    display:flex; align-items:center; gap:26px;
  }
  .khp-marquee span:after{ content:'✦'; color:var(--gold); font-size:0.8rem; }
  .khp-scrolldown{ position:absolute; bottom:28px; display:flex; flex-direction:column; align-items:center; gap:6px; color:var(--espresso-soft); font-size:0.7rem; letter-spacing:0.15em; text-transform:uppercase; animation:floatSlow 3s ease-in-out infinite; }

  /* ---- generic section ---- */
  .khp-section{ padding:120px clamp(20px,6vw,80px); max-width:1240px; margin:0 auto; position:relative; }
  .khp-section-head{ max-width:640px; margin-bottom:56px; }
  .khp-section-head h2{ font-size:clamp(2rem,4.5vw,3.1rem); margin-top:10px; }
  .khp-divider{ width:100%; display:flex; justify-content:center; margin:0 auto; opacity:0.6; }

  /* ---- about ---- */
  .khp-about{ display:grid; grid-template-columns:0.85fr 1.15fr; gap:64px; align-items:center; }
  .khp-about-photo{ position:relative; }
  .khp-about-photo .ribbon{ position:absolute; top:-22px; left:-22px; width:64px; height:64px; }
  .khp-quote-card{
    background:var(--espresso); color:var(--ivory); border-radius:2px; padding:22px 24px; margin-top:-40px; margin-left:36px;
    max-width:280px; box-shadow:var(--shadow); position:relative; z-index:2;
  }
  .khp-quote-card p{ font-family:'Fraunces',serif; font-style:italic; font-size:0.95rem; line-height:1.5; }

  /* ---- chips / lists ---- */
  .khp-chip-grid{ display:flex; flex-wrap:wrap; gap:10px; padding-top:4px; }
  .khp-chip{
    padding:9px 18px; border-radius:100px; font-size:0.85rem;
    background:var(--paper); border:1px solid var(--line);
    color:var(--espresso-soft); transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease, color .25s ease;
    display:inline-flex; align-items:center; gap:8px;
  }
  .khp-chip:hover{ transform:translateY(-2px); border-color:var(--rosewood); color:var(--rosewood-deep); box-shadow:0 8px 16px rgba(30,24,21,0.1); }

  .khp-cert-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:20px; }
  .khp-cert-card{
    background:var(--paper); border:1px solid var(--line); border-radius:3px; padding:26px;
    display:flex; gap:16px; align-items:flex-start; transition:transform .3s ease, box-shadow .3s ease;
  }
  .khp-cert-card:hover{ transform:translateY(-5px); box-shadow:var(--shadow); }
  .khp-cert-card.clickable{ cursor:pointer; }
  .khp-cert-icon{
    width:46px; height:46px; border-radius:50%; background:var(--rosewood); color:var(--ivory);
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
  }
  .khp-cert-thumb{
    width:56px; height:44px; border-radius:8px; object-fit:cover; flex-shrink:0;
    box-shadow:0 6px 14px rgba(30,24,21,0.18);
  }

  .khp-skills-grid{ display:grid; grid-template-columns:1fr 1fr; gap:40px; }
  .khp-skill-col h4{ font-size:1.1rem; margin-bottom:18px; display:flex; align-items:center; gap:10px; }
  .khp-skill-row{ display:flex; align-items:center; gap:14px; padding:12px 0; border-bottom:1px solid var(--line); }
  .khp-skill-row:last-child{ border-bottom:none; }
  .khp-skill-bar{ flex:1; height:5px; background:var(--line); border-radius:10px; overflow:hidden; }
  .khp-skill-fill{ height:100%; border-radius:10px; background:linear-gradient(90deg,var(--rosewood),var(--gold)); width:0%; transition:width 1.4s cubic-bezier(.16,.8,.3,1); }
  .khp-skill-row.sage .khp-skill-fill{ background:linear-gradient(90deg,var(--sage-deep),var(--sage)); }

  /* ---- projects (folders) ---- */
  .khp-folder-grid{ display:grid; grid-template-columns:1fr 1fr; gap:40px 28px; padding-top:14px; }
  .khp-folder{
    position:relative; border-radius:3px; padding:34px 30px 30px; min-height:260px; display:flex; flex-direction:column;
    justify-content:space-between; border:1px solid var(--line); text-align:left; background:var(--paper);
    box-shadow:0 10px 26px rgba(30,24,21,0.08);
    transition:transform .5s cubic-bezier(.34,1.4,.64,1), box-shadow .4s ease;
  }
  .khp-folder-skylar{ transform:rotate(-1.4deg); }
  .khp-folder-matcha{ transform:rotate(1deg); }
  .khp-folder:hover{ box-shadow:var(--shadow); }
  .khp-folder:before{
    content:''; position:absolute; top:-9px; left:50%; transform:translateX(-50%); width:16px; height:16px;
    border-radius:50%; background:radial-gradient(circle at 35% 30%, #fff, var(--rosewood) 70%);
    box-shadow:0 3px 6px rgba(0,0,0,0.35); z-index:2;
  }
  .khp-folder-matcha:before{ background:radial-gradient(circle at 35% 30%, #fff, var(--sage-deep) 70%); }
  .khp-folder-tag{ font-size:0.7rem; letter-spacing:0.15em; text-transform:uppercase; font-weight:700; }
  .khp-folder h3{ font-size:1.8rem; margin-top:10px; }
  .khp-folder p{ color:var(--espresso-soft); font-size:0.92rem; margin-top:8px; max-width:340px; }
  .khp-folder-cta{ display:inline-flex; align-items:center; gap:8px; font-weight:600; font-size:0.9rem; margin-top:18px; }
  .khp-folder-icon{ position:absolute; right:24px; top:24px; opacity:0.5; transition:transform .35s ease; }
  .khp-folder:hover .khp-folder-icon{ transform:rotate(12deg) scale(1.1); }

  /* ---- process timeline ---- */
  .khp-timeline{ position:relative; padding-left:52px; }
  .khp-timeline-track{ position:absolute; left:15px; top:6px; bottom:6px; width:2px; background:var(--line); }
  .khp-timeline-fill{ position:absolute; left:15px; top:6px; width:2px; background:linear-gradient(var(--rosewood),var(--sage)); transition:height .1s ease; }
  .khp-tl-step{ position:relative; padding-bottom:56px; }
  .khp-tl-step:last-child{ padding-bottom:0; }
  .khp-tl-dot{
    position:absolute; left:-52px; top:2px; width:32px; height:32px; border-radius:50%;
    background:var(--ivory); border:2px solid var(--line); display:flex; align-items:center; justify-content:center;
    transition:all .4s ease; color:var(--espresso-soft);
  }
  .khp-tl-step.in .khp-tl-dot{ border-color:var(--rosewood); background:var(--rosewood); color:var(--ivory); }
  .khp-tl-step h3{ font-size:1.5rem; display:flex; align-items:baseline; gap:12px; }
  .khp-tl-num{ font-family:'Work Sans',sans-serif; font-size:0.8rem; color:var(--gold); font-weight:600; letter-spacing:0.1em; }
  .khp-tl-step p{ color:var(--espresso-soft); max-width:560px; margin-top:10px; }
  .khp-tl-before-after{ display:flex; gap:14px; margin-top:16px; }

  /* ---- videography carousel ---- */
  .khp-carousel-row{ display:flex; align-items:center; gap:14px; }
  .khp-carousel{ display:flex; gap:22px; overflow-x:auto; scroll-snap-type:x mandatory; padding:20px 4px 30px; scrollbar-width:none; }
  .khp-carousel::-webkit-scrollbar{ display:none; }
  .khp-phone{
    scroll-snap-align:start; flex:0 0 auto; width:190px; height:390px; border-radius:32px; padding:10px;
    background:var(--espresso); position:relative; transition:transform .3s ease;
  }
  .khp-phone:hover{ transform:translateY(-6px) rotate(-1deg); }
  .khp-phone-screen{
    width:100%; height:100%; border-radius:24px; overflow:hidden; position:relative;
    display:flex; align-items:flex-end; padding:16px; color:#fff;
  }
  .khp-phone-screen:after{
    content:''; position:absolute; inset:0; pointer-events:none;
    background:linear-gradient(0deg, rgba(20,14,12,0.65) 0%, transparent 48%);
  }
  .khp-phone-notch{ position:absolute; top:8px; left:50%; transform:translateX(-50%); width:56px; height:5px; border-radius:10px; background:rgba(255,255,255,0.35); z-index:1; }
  .khp-phone-label{ position:relative; z-index:1; font-family:'Fraunces',serif; font-size:1.15rem; font-style:italic; text-shadow:0 1px 8px rgba(0,0,0,0.35); }
  .khp-phone-play{ position:absolute; top:16px; right:16px; width:30px; height:30px; border-radius:50%; background:rgba(255,255,255,0.25); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; z-index:1; }
  .khp-arrow-btn{
    width:44px; height:44px; border-radius:50%; border:1px solid var(--line); background:var(--paper);
    display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all .25s ease;
  }
  .khp-arrow-btn:hover{ background:var(--rosewood); color:var(--ivory); border-color:var(--rosewood); }

  /* ---- photography grid (polaroid style) ---- */
  .khp-masonry{ display:grid; grid-template-columns:repeat(3,1fr); gap:36px 26px; padding-top:8px; }
  .khp-masonry-item{
    cursor:pointer; position:relative;
    background:var(--paper); padding:10px 10px 34px; box-shadow:0 14px 30px rgba(30,24,21,0.14);
    transition:transform .35s cubic-bezier(.34,1.4,.64,1), box-shadow .35s ease;
  }
  .khp-masonry-item:hover{ transform:translateY(-6px) scale(1.03); box-shadow:0 26px 46px rgba(30,24,21,0.22); z-index:4; }
  .khp-masonry-item .khp-frame{ aspect-ratio:1; }
  .khp-masonry-item img,.khp-frame-fallback{ width:100%; display:block; }
  .khp-masonry-cap{
    font-family:'Fraunces',serif; font-style:italic; font-size:0.82rem; color:var(--espresso-soft);
    text-align:center; padding:10px 6px 0; line-height:1.3;
  }

  /* ---- placeholder frame ---- */
  .khp-frame{
    position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center;
    flex-direction:column; gap:8px; color:var(--espresso-soft); background:var(--paper);
  }
  .khp-frame span{ font-size:0.68rem; text-align:center; padding:0 14px; letter-spacing:0.02em; }
  .khp-frame svg{ opacity:0.75; }

  /* ---- passion projects ---- */
  .khp-passion-row{ display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; margin-bottom:100px; }
  .khp-passion-row:last-of-type{ margin-bottom:0; }
  .khp-passion-row.rev .khp-passion-text{ order:2; }
  .khp-passion-row.rev .khp-passion-frame{ order:1; }
  .khp-passion-eyebrow{ display:flex; align-items:center; gap:10px; }
  .khp-passion-text h3{ font-size:1.9rem; margin:12px 0 14px; }
  .khp-passion-text p{ color:var(--espresso-soft); }

  /* ---- stats ---- */
  .khp-stat-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:24px; text-align:center; }
  .khp-stat-num{ font-family:'Fraunces',serif; font-size:2.6rem; color:var(--rosewood-deep); }
  .khp-stat-label{ font-size:0.78rem; color:var(--espresso-soft); margin-top:6px; }

  /* ---- contact ---- */
  .khp-contact{ text-align:center; padding:140px 20px; position:relative; }
  .khp-contact h2{ font-size:clamp(2.2rem,6vw,4rem); }
  .khp-contact-links{ display:flex; gap:18px; justify-content:center; margin-top:36px; flex-wrap:wrap; }
  .khp-footer{ text-align:center; padding:28px; font-size:0.78rem; color:var(--espresso-soft); border-top:1px solid var(--line); }

  /* ---- modal (case study) ---- */
  .khp-modal-backdrop{
    position:fixed; inset:0; background:rgba(51,36,31,0.55); backdrop-filter:blur(4px); z-index:100;
    display:flex; align-items:flex-start; justify-content:center; padding:40px 16px; overflow-y:auto;
    animation:fadeUp 0.35s ease forwards;
  }
  .khp-modal{
    background:var(--ivory); width:min(920px,100%); border-radius:4px; padding:0; position:relative;
    box-shadow:0 40px 100px rgba(0,0,0,0.35); overflow:hidden;
  }
  .khp-modal-hero{ padding:64px clamp(24px,5vw,64px) 46px; color:#111; position:relative; overflow:hidden; }
  .khp-modal-hero-skylar{
    background:repeating-linear-gradient(90deg, #FBF1F0 0 12%, #F1D2D6 12% 24%);
    min-height:400px; display:flex; align-items:center;
  }
  .khp-modal-hero-matcha{
    background:linear-gradient(120deg, #F4EEE1 0%, #DDE6C8 100%);
    min-height:320px; display:flex; align-items:center;
  }
  .khp-modal-hero-generic{ color:#fff; }
  .khp-hero-grid{ display:grid; grid-template-columns:auto 1fr; gap:36px; align-items:center; width:100%; position:relative; z-index:1; }
  .khp-perfume-mark{ width:150px; display:flex; flex-direction:column; align-items:center; flex-shrink:0; }
  .khp-perfume-mark svg{ width:100%; height:auto; }
  .khp-perfume-caption{ font-size:1rem; color:#B8873F; margin-top:2px; }
  .khp-matcha-mark{ width:120px; height:auto; flex-shrink:0; border-radius:14px; box-shadow:0 14px 30px rgba(30,24,21,0.18); }
  .khp-typewriter-card{ background:linear-gradient(160deg,#F1D9DD,#F7EFE3); }
  .khp-photo-mat{ background:#FBF5EE; padding:14px; border-radius:6px; box-shadow:0 20px 46px rgba(30,24,21,0.22); }
  .khp-scent-list{
    background:var(--paper); border:1px solid var(--line); border-radius:6px;
    padding:8px 28px;
  }
  .khp-scent-item{ display:flex; gap:16px; align-items:flex-start; padding:22px 0; border-bottom:1px solid var(--line); }
  .khp-scent-item:last-child{ border-bottom:none; }
  .khp-scent-dot{ width:9px; height:9px; border-radius:50%; margin-top:8px; flex-shrink:0; }
  .khp-scent-name{ font-family:'Fraunces',serif; font-size:1.15rem; color:var(--espresso); }
  .khp-scent-note{ font-size:0.7rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--rosewood); margin:3px 0 8px; }
  .khp-scent-desc{ font-size:0.9rem; color:var(--espresso-soft); line-height:1.55; }
  .khp-typewriter-mark{ width:65%; height:auto; }
  .khp-modal-close{
    position:absolute; top:20px; right:20px; width:38px; height:38px; border-radius:50%;
    background:rgba(20,14,12,0.28); border:none; color:#fff; display:flex; align-items:center; justify-content:center;
    backdrop-filter:blur(6px); z-index:5;
  }
  .khp-modal-hero-generic .khp-modal-close{ background:rgba(255,255,255,0.18); }
  .khp-modal-body{ padding:32px clamp(24px,5vw,64px) 56px; }

  /* rounded, thick-bordered info boxes echoing Kayla's real Canva layout */
  .khp-modal-cols{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin:28px 0; }
  .khp-modal-col, .khp-pillar{
    background:var(--paper); border-radius:24px; padding:22px 24px; border:2px solid var(--rosewood);
  }
  .khp-modal-col h5{ font-family:'Work Sans'; font-size:0.72rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--rosewood); margin-bottom:8px; }
  .khp-info-box{
    background:var(--paper); border-radius:100px; border:2px solid var(--rosewood); padding:16px 32px;
    text-align:center; margin-bottom:20px;
  }
  .khp-info-box.script{ font-size:1.7rem; color:var(--espresso); }
  .khp-info-box-loose{ border-radius:24px; text-align:left; padding:22px 26px; }
  .khp-pillars{ display:grid; grid-template-columns:repeat(2,1fr); gap:16px; margin:20px 0; }
  .khp-pillar h5{ font-size:1rem; margin-bottom:6px; }
  .khp-pillar p{ font-size:0.85rem; color:var(--espresso-soft); }
  .khp-kpi-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:18px; margin-top:20px; }
  .khp-kpi-card{ background:var(--espresso); color:var(--ivory); border-radius:20px; padding:18px 22px; }
  .khp-kpi-card h5{ font-size:0.85rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--gold); margin-bottom:8px; }
  .khp-kpi-card li{ font-size:0.85rem; margin-bottom:4px; }
  .khp-takeaway{ background:var(--blush); border-radius:20px; padding:24px 26px; margin-top:24px; font-family:'Fraunces',serif; font-style:italic; font-size:1.05rem; }

  /* ---- mood board ---- */
  .khp-moodboard{ text-align:center; margin:36px 0; }
  .khp-moodboard h4{ font-family:'Parisienne',cursive; font-size:2.4rem; font-weight:400; color:var(--espresso); margin-bottom:20px; }
  .khp-moodboard-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:8px; max-width:420px; margin:0 auto; }
  .khp-moodboard-grid .khp-frame{ aspect-ratio:1; border-radius:6px; }

  /* ---- lightbox ---- */
  .khp-lightbox{ position:fixed; inset:0; background:rgba(20,14,12,0.92); z-index:200; display:flex; align-items:center; justify-content:center; padding:40px; }
  .khp-lightbox-close{ position:absolute; top:24px; right:24px; color:#fff; background:none; border:none; }
  .khp-lightbox-nav{ position:absolute; top:50%; transform:translateY(-50%); color:#fff; background:rgba(255,255,255,0.1); border:none; width:48px; height:48px; border-radius:50%; display:flex; align-items:center; justify-content:center; }

  /* ---- responsive ---- */
  @media (max-width:900px){
    .khp-about{ grid-template-columns:1fr; }
    .khp-skills-grid{ grid-template-columns:1fr; gap:28px; }
    .khp-folder-grid{ grid-template-columns:1fr; }
    .khp-modal-cols{ grid-template-columns:1fr; }
    .khp-pillars{ grid-template-columns:1fr; }
    .khp-kpi-grid{ grid-template-columns:1fr; }
    .khp-hero-grid{ grid-template-columns:1fr; text-align:center; justify-items:center; }
    .khp-moodboard-grid{ grid-template-columns:repeat(2,1fr); }
    .khp-passion-row{ grid-template-columns:1fr; gap:24px; }
    .khp-passion-row.rev .khp-passion-text{ order:1; }
    .khp-passion-row.rev .khp-passion-frame{ order:2; }
    .khp-stat-grid{ grid-template-columns:1fr 1fr; }
    .khp-masonry{ grid-template-columns:repeat(2,1fr); }
    .khp-dot-label{ display:none; }
  }
  @media (max-width:640px){
    .khp-cert-grid{ grid-template-columns:1fr; }
    .khp-masonry{ grid-template-columns:1fr; }
    .khp-stat-grid{ grid-template-columns:1fr 1fr; }
    .khp-nav .khp-dots{ position:fixed; top:0; right:0; bottom:0; background:var(--ivory); flex-direction:column;
      justify-content:center; padding:40px; transform:translateX(100%); transition:transform .4s ease; width:min(78vw,320px); box-shadow:-10px 0 40px rgba(0,0,0,0.1); z-index:1001; }
    .khp-nav .khp-dots.open{ transform:translateX(0); }
    .khp-nav .khp-dot-label{ display:inline; max-width:none; opacity:1; }
    .khp-burger{ display:flex; }
    .khp-menu-backdrop{ display:none; }
    .khp-menu-backdrop.open{ display:block; position:fixed; inset:0; background:rgba(0,0,0,0.35); z-index:1000; }
  }
`;

/* ---------------- helpers ---------------- */
function useReveal() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, inView] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Placeholder art frame — stands in for a real photo/video still.
 * Swap by passing `src` (an image URL) once real assets exist. */
function Frame({ src, label, gradient, icon: Icon = Camera, ratio = "4/5", style = {} }) {
  if (src) {
    return (
      <div className="khp-frame" style={{ aspectRatio: ratio, background: gradient, ...style }}>
        <img src={src} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    );
  }
  return (
    <div className="khp-frame" style={{ aspectRatio: ratio, background: gradient, ...style }}>
      <Icon size={22} strokeWidth={1.4} />
      <span>SWAP: {label}</span>
    </div>
  );
}

function StatCounter({ target, suffix = "", label }) {
  const [ref, inView] = useReveal();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const duration = 1400;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return (
    <div ref={ref}>
      <div className="khp-stat-num">{val}{suffix}</div>
      <div className="khp-stat-label">{label}</div>
    </div>
  );
}

function SkillRow({ name, pct, sage }) {
  const [ref, inView] = useReveal();
  return (
    <div ref={ref} className={`khp-skill-row ${sage ? "sage" : ""}`}>
      <span style={{ width: 132, fontSize: "0.88rem" }}>{name}</span>
      <div className="khp-skill-bar">
        <div className="khp-skill-fill" style={{ width: inView ? `${pct}%` : "0%" }} />
      </div>
    </div>
  );
}

/** Wraps a button/link so it gently pulls toward the cursor, then eases back. */
function Magnetic({ children }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const settled = pos.x === 0 && pos.y === 0;
  return (
    <span
      ref={ref}
      className="khp-magnetic"
      onMouseMove={(e) => {
        const rect = ref.current.getBoundingClientRect();
        setPos({ x: (e.clientX - rect.left - rect.width / 2) * 0.28, y: (e.clientY - rect.top - rect.height / 2) * 0.4 });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, transition: settled ? "transform .5s cubic-bezier(.34,1.5,.64,1)" : "transform .12s ease" }}
    >
      {children}
    </span>
  );
}

/** A card that tilts in 3D toward the cursor — used for the two project folders. */
function TiltCard({ as: Tag = "div", className = "", style: styleProp = {}, children, ...rest }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({});
  return (
    <Tag
      ref={ref}
      className={`khp-tilt ${className}`}
      style={{ ...styleProp, ...tilt }}
      onMouseMove={(e) => {
        const rect = ref.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        setTilt({ transform: `perspective(900px) rotateX(${(py - 0.5) * -9}deg) rotateY(${(px - 0.5) * 11}deg) translateY(-8px) scale(1.015)`, transition: "transform .08s linear" });
      }}
      onMouseLeave={() => setTilt({})}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const PETAL_EMOJI = ["🌸", "🌷", "🌺", "💌"];

/** Original vector recreation of an arched perfume-bottle wordmark (not copied from any photo). */
function PerfumeMark() {
  return (
    <div className="khp-perfume-mark">
      <svg viewBox="0 0 220 300">
        <g transform="translate(0,80)">
          <path d="M95 40 h30 v22 h-30 z" fill="none" stroke="#6E2938" strokeWidth="2.5" />
          <path d="M78 62 h64 l10 30 v120 a10 10 0 0 1 -10 10 h-64 a10 10 0 0 1 -10 -10 v-120 z" fill="none" stroke="#6E2938" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M78 62 q32 34 64 0" fill="none" stroke="#6E2938" strokeWidth="1.5" opacity="0.6" />
        </g>
        <defs>
          <path id="mark-arc" d="M15 85 A 130 130 0 0 1 205 85" />
        </defs>
        <text fontSize="24" letterSpacing="4" fill="#6E2938" fontFamily="'Fraunces', serif">
          <textPath href="#mark-arc" startOffset="50%" textAnchor="middle">SKYLAR</textPath>
        </text>
      </svg>
      <span className="khp-perfume-caption script">True Love's Cake</span>
    </div>
  );
}

/** Simple original line-art matcha cup icon used as the Matcha Muse placeholder motif. */
function MatchaMark() {
  return (
    <svg viewBox="0 0 100 100" className="khp-matcha-mark">
      <path d="M30 38 h40 l-5 46 a8 8 0 0 1 -8 7 h-14 a8 8 0 0 1 -8 -7 z" fill="none" stroke="#5E6B4E" strokeWidth="2.5" />
      <path d="M28 38 h44" stroke="#5E6B4E" strokeWidth="2.5" />
      <path d="M40 24 q5 -8 10 0 q5 -8 10 0" fill="none" stroke="#5E6B4E" strokeWidth="2" opacity="0.7" />
      <path d="M40 58 q10 8 20 0" fill="none" stroke="#5E6B4E" strokeWidth="2" opacity="0.7" />
    </svg>
  );
}

/** Original cute, color-coded typewriter illustration (hand-drawn in her palette, not a stock photo). */
function TypewriterMark() {
  const keys = [
    { x: 34, c: "#8C3A48" }, { x: 46, c: "#C29A5C" }, { x: 58, c: "#7C8A69" },
    { x: 70, c: "#8C3A48" }, { x: 82, c: "#C29A5C" }, { x: 94, c: "#7C8A69" },
    { x: 40, c: "#C29A5C" }, { x: 52, c: "#8C3A48" }, { x: 64, c: "#7C8A69" },
    { x: 76, c: "#C29A5C" }, { x: 88, c: "#8C3A48" },
  ];
  return (
    <svg viewBox="0 0 130 110" className="khp-typewriter-mark">
      <rect x="14" y="58" width="102" height="34" rx="8" fill="#F7EFE3" stroke="#33241F" strokeWidth="2.5" />
      <rect x="24" y="34" width="82" height="30" rx="6" fill="#FBF5EE" stroke="#33241F" strokeWidth="2.5" />
      <rect x="34" y="16" width="62" height="18" rx="3" fill="#F1D2D6" stroke="#33241F" strokeWidth="2.5" />
      <rect x="40" y="21" width="50" height="8" rx="1.5" fill="#FBF5EE" opacity="0.8" />
      {keys.slice(0, 6).map((k) => <circle key={k.x} cx={k.x} cy={70} r="4.5" fill={k.c} />)}
      {keys.slice(6).map((k) => <circle key={k.x} cx={k.x} cy={82} r="4.5" fill={k.c} />)}
      <rect x="10" y="90" width="110" height="8" rx="4" fill="#33241F" opacity="0.85" />
      <circle cx="20" cy="52" r="6" fill="none" stroke="#33241F" strokeWidth="2.5" />
      <circle cx="110" cy="52" r="6" fill="none" stroke="#33241F" strokeWidth="2.5" />
    </svg>
  );
}

/* ---------------- data ---------------- */
const NAV = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "video", label: "Videography" },
  { id: "photo", label: "Photography" },
  { id: "passion", label: "Passion Projects" },
  { id: "contact", label: "Contact" },
];

const MARQUEE_WORDS = ["Strategy", "Content Creation", "Photography", "Videography", "Brand Storytelling", "Social Media", "Trend Research"];

const CERTS = [
  { title: "Marketing with Canva", org: "Canva Design School", icon: Palette },
  { title: "HubSpot Digital Marketing", org: "HubSpot Academy", icon: TrendingUp },
  { title: "SEO Fundamentals", org: "Certificate", icon: Search },
  { title: "Email Marketing", org: "Certificate", icon: Mail },
  { title: "AI for Marketing", org: "Certificate", icon: Sparkles },
];

const LEARNING = ["HubSpot Academy Content Marketing", "Social Media Marketing", "Google Analytics", "Brand Strategy", "Adobe Express"];

const SKILLS_MARKETING = [
  { name: "Canva", pct: 95 }, { name: "CapCut", pct: 88 }, { name: "Microsoft Office", pct: 90 },
  { name: "Google Workspace", pct: 85 }, { name: "Trend Research", pct: 92 },
];
const SKILLS_CREATIVE = [
  { name: "Content Creation", pct: 96 }, { name: "Photography", pct: 88 }, { name: "Videography", pct: 84 },
  { name: "Brand Storytelling", pct: 93 }, { name: "Social Media", pct: 91 },
];

const PROCESS_STEPS = [
  { icon: Compass, title: "Discover", body: "Every project starts with a conversation, not a template. I dig into the brand's world — its people, its product, the feeling it's chasing — before a single asset gets made." },
  { icon: Search, title: "Research", body: "Mood boards, competitor scans, audience interviews. I look at what's already out there so the work I make actually stands apart from it." },
  { icon: Target, title: "Strategy", body: "Objectives, audience, and message get mapped into a real plan — channels, cadence, KPIs — so creative work has something to aim at." },
  { icon: Wand2, title: "Create", body: "Design, copy, photography, and video come together. This is where Canva, CapCut, and a camera roll all meet the strategy doc." },
  { icon: PenTool, title: "Refine", body: "Nothing ships on the first pass. I compare drafts side by side, cut what's not earning its place, and sharpen what is." },
  { icon: Rocket, title: "Launch & Learn", body: "The campaign goes live — and then the real learning starts. I track what resonates and feed it back into the next round." },
];

const VIDEOS = [
  { label: "Lifestyle", gradient: "linear-gradient(160deg,#8C3A48,#C29A5C)", src: IMG.orchidPhone },
  { label: "Event", gradient: "linear-gradient(160deg,#5E6B4E,#7C8A69)", src: IMG.videoClient },
  { label: "Vlog", gradient: "linear-gradient(160deg,#6E2938,#8C3A48)", src: IMG.videoLifestyle },
  { label: "Hotel Tour", gradient: "linear-gradient(160deg,#C29A5C,#F1D9DD)", src: IMG.videoEvent },
  { label: "Promotional", gradient: "linear-gradient(160deg,#33241F,#5C463F)", src: IMG.videoTestimonial },
  { label: "Client Content", gradient: "linear-gradient(160deg,#7C8A69,#33241F)", src: IMG.newClient },
];

const PHOTOS = [
  { label: "Flatlay — product styling", gradient: "linear-gradient(160deg,#F1D9DD,#F7EFE3)", src: IMG.flatlay },
  { label: "Portrait — lifestyle brand shoot", gradient: "linear-gradient(160deg,#C29A5C,#8C3A48)", src: IMG.newPortrait },
  { label: "Cocktail in hand — editorial detail", gradient: "linear-gradient(160deg,#7C8A69,#E4E9D6)", src: IMG.newLifestyle },
  { label: "Editorial — brand campaign still", gradient: "linear-gradient(160deg,#8C3A48,#33241F)", src: IMG.newEditorial },
  { label: "Café styling — product detail", gradient: "linear-gradient(160deg,#F7EFE3,#F1D9DD)", src: IMG.newMagazine },
  { label: "Ambient detail — venue atmosphere", gradient: "linear-gradient(160deg,#5C463F,#C29A5C)", src: IMG.newAmbient },
];

const SIGNATURE_SCENTS = [
  { name: "The Confidence Pick", note: "My all-time favorite", desc: "The fragrance I reach for when I want to feel confident, feminine, and unforgettable — it never fails to earn compliments.", color: "#8C3A48" },
  { name: "The Everyday Sweetheart", note: "Go-to for errands", desc: "Playful, sugary, and effortlessly fun. My go-to fragrance for everyday errands when I want to smell like a sweet treat.", color: "#C29A5C" },
  { name: "The Statement Maker", note: "Nights out", desc: "Bold, edible, and impossible to ignore. Another favorite for nights out because it always gets compliments.", color: "#33241F" },
  { name: "The After-Dark Favorite", note: "Evenings", desc: "Rich, warm, and sophisticated. My choice for evenings when I want something subtle yet mysterious and polished.", color: "#5C463F" },
  { name: "The Strawberry Crush", note: "Love at first smell", desc: "Sweet, fruity, and creamy with a strawberry vibe that feels playful and feminine.", color: "#B5556A" },
];

const PASSION_PROJECTS = [
  { title: "Birthday Film", tag: "Videography", body: "A cinematic birthday video created to practice storytelling, pacing, transitions, and visual editing. This project challenged me to capture meaningful moments and transform them into a cohesive story through music, timing, and creative direction.", gradient: "linear-gradient(160deg,#8C3A48,#33241F)", src: IMG.birthdayCake, ratio: "427/239" },
  { title: "Travel Vlog", tag: "Videography · Photography", body: "Travel allows me to document experiences through photography and video while experimenting with composition, editing, and narrative flow. These projects continue to strengthen my ability to create engaging lifestyle content across multiple formats.", gradient: "linear-gradient(160deg,#7C8A69,#C29A5C)", src: IMG.atlWeekend, ratio: "637/741" },
  { title: "Magazine", tag: "Editorial Design", body: "An ongoing editorial design project that combines branding, typography, photography, and layout design into a cohesive publication. Creating this magazine allows me to explore visual storytelling while developing skills that translate directly into content marketing and brand design.", gradient: "linear-gradient(160deg,#5C463F,#F1D9DD)", src: IMG.magazineOriginal },
  { title: "Creative Writing", tag: "Playwriting", body: "I'm currently writing an original play as a personal storytelling project. Developing characters, building narratives, and creating emotional connections has strengthened my communication skills and continues to influence the way I approach brand storytelling and marketing campaigns.", gradient: "linear-gradient(160deg,#33241F,#8C3A48)" },
  { title: "Signature Scents", tag: "Personal Branding · Content Creation", body: "An ongoing personal content series documenting my go-to fragrances and the moments they're tied to — a mix of product styling and lifestyle photography that doubles as practice in personal brand storytelling and content curation.", gradient: "linear-gradient(160deg,#B5556A,#33241F)" },
];

const WHY_PASSION_PROJECTS = "The best ideas often begin outside of work. Personal projects give me the freedom to explore new creative techniques, experiment with different forms of storytelling, and continue growing as both a marketer and a creator. They remind me that creativity is a skill developed through curiosity, consistency, and a willingness to keep learning.";

/* ---------------- case study data ----------------
   Wording below is kept as close to Kayla's own Canva copy as possible —
   only obvious typos ("expirence", "conncetion") were corrected. */
const SKYLAR = {
  key: "skylar",
  eyebrow: "Beauty & Fragrance Campaign",
  title: "Love Letters",
  subtitle: "An Evening of Blooming Conversations",
  client: "Skylar Clean Beauty",
  hero: "linear-gradient(135deg,#8C3A48,#33241F)",
  brandIntro: {
    label: "Who is Skylar Clean Beauty",
    values: ["Transparency", "Safety", "Environmentally Responsible"],
    description: "Skylar is a clean fragrance brand dedicated to creating scents that not only smell beautiful but also feel good to wear. Recognizing that some natural ingredients can trigger sensitivities, Skylar formulates each fragrance with thoughtfully selected, high-quality ingredients that are vegan, cruelty-free, and designed to be hypoallergenic. By combining luxury with transparency, the brand delivers fragrances that allow customers to enjoy their signature scent with confidence.",
    consumer: ["Millennials and Gen Z", "Consumers who prioritize clean beauty", "Fragrance lovers with sensitive skin or allergies", "Shoppers looking for everyday luxury at an accessible price point"],
  },
  brief: [
    { h: "Campaign Objective", b: "Position True Love's Cake as the finishing touch to every memorable night, creating an emotional connection that encourages product trial, social sharing, and brand awareness." },
    { h: "Target Audience", b: "Primary audience includes Gen Z and Millennial consumers (approximately ages 22–35) who are engaged in beauty culture, fragrance layering, and social self-expression. They are experience-driven, highly active on social media, and view beauty products as part of their identity and lifestyle. This audience gravitates toward gourmand and dessert-inspired fragrances, clean beauty formulations, and brands that blend emotional storytelling with modern luxury." },
    { h: "Campaign Goals", list: [
      "Increase awareness of True Love's Cake within Skylar's existing and expanded fragrance audience",
      "Drive product trial through sampling, influencer content, and experiential activations",
      "Strengthen emotional association between Skylar fragrances and meaningful personal moments",
      "Generate high social engagement through shareable content from \u201cgetting ready\u201d and launch experiences",
      "Increase conversion and sales of True Love's Cake as a signature gourmand fragrance within the collection",
    ] },
  ],
  moodBoard: [
    { label: "Afternoon tea spread — sandwiches & pastries", gradient: "linear-gradient(160deg,#F1D9DD,#F7EFE3)", src: IMG.mood1 },
    { label: "Candlelit table styling", gradient: "linear-gradient(160deg,#E8C7CE,#F7EFE3)", src: IMG.mood2 },
    { label: "Floral bouquet wrapping detail", gradient: "linear-gradient(160deg,#C9A15A,#F1D9DD)", src: IMG.mood3 },
    { label: "Vintage teapot & china", gradient: "linear-gradient(160deg,#8C3A48,#C29A5C)", src: IMG.mood4 },
    { label: "Soft romantic portrait styling", gradient: "linear-gradient(160deg,#B5556A,#F1D9DD)", src: IMG.mood5 },
    { label: "Fresh floral detail — hands & orchid", gradient: "linear-gradient(160deg,#7C8A69,#E4E9D6)", src: IMG.newMoodOrchid },
    { label: "Garden table setting", gradient: "linear-gradient(160deg,#5C463F,#C29A5C)", src: IMG.mood7 },
    { label: "Handwritten love letters & envelopes", gradient: "linear-gradient(160deg,#EDE6DA,#D9CFC0)", src: IMG.mood8 },
    { label: "Henna hand detail", gradient: "linear-gradient(160deg,#33241F,#8C3A48)", src: IMG.mood9 },
  ],
  insight: "Meaningful connections are often hardest to create in fast-paced, digital-first environments, where interactions feel brief and surface-level. People are craving slower, more intentional spaces where they can express themselves, be present, and form genuine emotional connections with others.",
  pillarsLabel: "The Love Letter Experience",
  pillars: [
    { h: "Love Letter Writing Station", b: "Guests write a heartfelt letter to themselves, a loved one, or someone they've met during the event before sealing it in a personalized envelope to take home." },
    { h: "Bloom Bar", b: "Guests create their own mini bouquet using flowers inspired by the campaign, symbolizing different forms of love, friendship, and connection." },
    { h: "Conversation Corner", b: "Conversation cards encourage meaningful discussions, helping guests build authentic connections in a relaxed setting." },
    { h: "Henna Artist", b: "Offer elegant floral-inspired henna designs that celebrate artistry and create a memorable keepsake from the event." },
    { h: "Love Letters Photo Garden", b: "A floral installation featuring oversized blooms, vintage envelopes, and campaign branding encourages guests to capture and share their experience on social media." },
  ],
  kpis: [
    { h: "Brand Awareness", items: ["Social media impressions", "Reach", "Video views", "Website traffic"] },
    { h: "Engagement", items: ["Engagement rate", "Comments", "Shares", "Saves", "Hashtag usage", "User-generated content"] },
    { h: "Event Success", items: ["RSVP", "Attendance rate", "Bouquet workshop participation", "Letters written", "Fragrance samples distributed"] },
    { h: "Sales", items: ["Product sales", "Conversion rate", "Email click-through rate", "Online purchase after the event", "Return on ad spend (ROAS)"] },
  ],
};

const MATCHA = {
  key: "matcha",
  eyebrow: "Beverage & Café Campaign",
  title: "Matcha Muse",
  subtitle: "Find Your Ritual",
  tagline: "A social media campaign designed to position Matcha Muse as a destination for intentional mornings and everyday wellness.",
  client: "Matcha Muse",
  hero: "linear-gradient(135deg,#5E6B4E,#33241F)",
  goals: ["Build Brand Awareness", "Grow An Engaged Community", "Increase Social Media Engagement", "Drive Café Visits"],
  brief: [
    { h: "Brand Overview", b: "Matcha cafés have become increasingly popular, making it difficult for new brands to stand out. Matcha Muse needed a campaign that would differentiate the brand by selling an experience rather than just a beverage." },
    { h: "Audience", list: ["Ages 22–35", "Young professionals", "Students", "Wellness enthusiasts", "Remote workers"] },
    { h: "Their Interests", list: ["Pilates", "Reading", "Journaling", "Morning routines", "Matcha", "Self-care"] },
  ],
  insight: "The Find Your Ritual campaign positions Matcha Muse as more than a neighborhood café — it invites customers to slow down, reconnect with themselves, and make their daily coffee or matcha part of a meaningful routine. By combining lifestyle storytelling, educational content, and community-driven experiences, the campaign encourages long-term customer loyalty while building a welcoming and recognizable brand presence.",
  creativeDirection: [
    { h: "Feel", b: "Calm, intentional, cozy, community." },
    { h: "Visual Style", b: "Natural lighting, film photography, soft textures, neutral tones." },
    { h: "Brand Voice", b: "Warm, encouraging, mindful, friendly." },
  ],
  pillarsLabel: "Find Your Ritual — Pillars",
  pillars: [
    { h: "Wellness", b: "Morning routines, mindfulness, self-care." },
    { h: "Product", b: "Signature drinks and seasonal offerings." },
    { h: "Community", b: "Events, customer spotlights, and friend-focused promotions." },
    { h: "Education", b: "Matcha facts, preparation, and wellness tips." },
  ],
  contentExamples: {
    body: "To support the Find Your Ritual campaign, I developed a variety of social media content designed to educate, inspire, and engage the Matcha Muse community. The content mix includes Instagram posts, Stories, and short-form video concepts that highlight signature drinks, wellness-focused lifestyle moments, and interactive promotions. Each piece was created to reinforce a cohesive brand identity while encouraging meaningful customer engagement.",
    types: ["Story", "Reel", "Feed"],
  },
  stats: [
    { target: 35, suffix: "%", label: "Instagram engagement" },
    { target: 500, suffix: "", label: "Loyalty sign-ups" },
    { target: 20, suffix: "K", label: "Campaign reach" },
    { target: 200, suffix: "", label: "#FindYourRitual posts" },
  ],
  footNote: "Increased café foot traffic.",
  takeaway: "This concept allowed me to combine brand strategy, content creation, and campaign planning into a cohesive social media campaign. It reflects my approach to creating content that is both visually engaging and aligned with business goals. That tells employers you understand the connection between creative work and marketing objectives.",
};

/* ---------------- case study modal ---------------- */
function CaseStudyModal({ data, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div className="khp-modal-backdrop" onClick={onClose}>
      <div className="khp-modal" onClick={(e) => e.stopPropagation()}>

        {data.key === "skylar" && (
          <div className="khp-modal-hero khp-modal-hero-skylar">
            <button className="khp-modal-close" onClick={onClose}><X size={18} /></button>
            <div className="khp-hero-grid">
              <PerfumeMark />
              <div>
                <div className="eyebrow" style={{ color: "#8C3A48" }}>{data.eyebrow} · {data.client}</div>
                <h2 className="script" style={{ fontSize: "clamp(2.4rem,6vw,3.6rem)", marginTop: 6, color: "#6E2938" }}>{data.title}</h2>
                <p style={{ fontFamily: "'Fraunces',serif", fontStyle: "italic", color: "#5C463F", marginTop: 6, fontSize: "1.15rem" }}>{data.subtitle}</p>
              </div>
            </div>
          </div>
        )}

        {data.key === "matcha" && (
          <div className="khp-modal-hero khp-modal-hero-matcha">
            <button className="khp-modal-close" onClick={onClose}><X size={18} /></button>
            <div className="khp-hero-grid">
              <img src={IMG.matchaAd} alt="Matcha Muse latte ad" className="khp-matcha-mark" />
              <div>
                <div className="eyebrow" style={{ color: "#5E6B4E" }}>{data.eyebrow} · {data.client}</div>
                <h2 style={{ fontSize: "clamp(2.2rem,6vw,3.4rem)", marginTop: 6, color: "#7C8A69", WebkitTextStroke: "1.5px #1E1815" }}>{data.title}</h2>
                <p style={{ fontWeight: 700, color: "#1E1815", marginTop: 6, fontSize: "1.3rem" }}>{data.subtitle}</p>
                {data.tagline && <p style={{ color: "#5C463F", marginTop: 10, maxWidth: 460, fontSize: "0.95rem" }}>{data.tagline}</p>}
              </div>
            </div>
          </div>
        )}

        {data.key !== "skylar" && data.key !== "matcha" && (
          <div className="khp-modal-hero khp-modal-hero-generic" style={{ background: data.hero }}>
            <button className="khp-modal-close" onClick={onClose}><X size={18} /></button>
            <div className="eyebrow" style={{ color: "rgba(255,255,255,0.8)" }}>{data.eyebrow} · {data.client}</div>
            <h2 style={{ color: "#fff", fontSize: "clamp(2rem,5vw,3rem)", marginTop: 10 }}>{data.title}</h2>
            <p style={{ fontFamily: "'Fraunces',serif", fontStyle: "italic", color: "rgba(255,255,255,0.85)", marginTop: 8, fontSize: "1.1rem" }}>{data.subtitle}</p>
            {data.tagline && <p style={{ color: "rgba(255,255,255,0.75)", marginTop: 10, maxWidth: 520, fontSize: "0.92rem" }}>{data.tagline}</p>}
          </div>
        )}

        <div className="khp-modal-body">
          {data.brandIntro && (
            <>
              <div className="khp-info-box script">{data.brandIntro.label}</div>
              <div className="khp-info-box khp-info-box-loose">
                <p style={{ color: "var(--espresso-soft)" }}>{data.brandIntro.description}</p>
              </div>
              <div className="khp-modal-cols" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div className="khp-modal-col">
                  <h5>Core Values</h5>
                  <ul style={{ paddingLeft: 18, margin: 0, fontSize: "0.9rem", color: "var(--espresso-soft)" }}>
                    {data.brandIntro.values.map((v) => <li key={v}>{v}</li>)}
                  </ul>
                </div>
                <div className="khp-modal-col">
                  <h5>Target Consumer</h5>
                  <ul style={{ paddingLeft: 18, margin: 0, fontSize: "0.88rem", color: "var(--espresso-soft)" }}>
                    {data.brandIntro.consumer.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>
              </div>
            </>
          )}

          {data.goals && (
            <div style={{ marginTop: data.brandIntro ? 28 : 0 }}>
              <h4 style={{ fontSize: "1.1rem", marginBottom: 10 }}>Goal</h4>
              <div className="khp-chip-grid">
                {data.goals.map((g) => <span className="khp-chip" key={g}><Target size={13} />{g}</span>)}
              </div>
            </div>
          )}

          <h4 style={{ fontSize: "1.1rem", marginBottom: 6, marginTop: 32 }}>Campaign Brief</h4>
          <div className="khp-modal-cols">
            {data.brief.map((b) => (
              <div className="khp-modal-col" key={b.h}>
                <h5>{b.h}</h5>
                {b.list ? (
                  <ul style={{ paddingLeft: 18, margin: 0, fontSize: "0.85rem", color: "var(--espresso-soft)" }}>
                    {b.list.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                ) : (
                  <p style={{ fontSize: "0.88rem", color: "var(--espresso-soft)" }}>{b.b}</p>
                )}
              </div>
            ))}
          </div>

          {data.moodBoard && (
            <div className="khp-moodboard">
              <h4 className="script">Mood board</h4>
              <div className="khp-moodboard-grid">
                {data.moodBoard.map((m) => (
                  <Frame key={m.label} label={m.label} gradient={m.gradient} icon={Camera} ratio="1" src={m.src} />
                ))}
              </div>
            </div>
          )}

          <h4 style={{ fontSize: "1.1rem", marginBottom: 6, marginTop: 32 }}>Core Insight</h4>
          <p style={{ color: "var(--espresso-soft)", maxWidth: 640 }}>{data.insight}</p>

          {data.creativeDirection && (
            <>
              <h4 style={{ fontSize: "1.1rem", marginBottom: 6, marginTop: 32 }}>Creative Direction</h4>
              <div className="khp-modal-cols">
                {data.creativeDirection.map((c) => (
                  <div className="khp-modal-col" key={c.h}>
                    <h5>{c.h}</h5>
                    <p style={{ fontSize: "0.88rem", color: "var(--espresso-soft)" }}>{c.b}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          <h4 style={{ fontSize: "1.1rem", marginBottom: 6, marginTop: 32 }}>{data.pillarsLabel}</h4>
          <div className="khp-pillars">
            {data.pillars.map((p) => (
              <div className="khp-pillar" key={p.h}>
                <h5>{p.h}</h5>
                <p>{p.b}</p>
              </div>
            ))}
          </div>

          {data.contentExamples && (
            <div style={{ marginTop: 32 }}>
              <h4 style={{ fontSize: "1.1rem", marginBottom: 10 }}>Content Examples</h4>
              <p style={{ color: "var(--espresso-soft)", maxWidth: 640 }}>{data.contentExamples.body}</p>
              <div className="khp-chip-grid" style={{ marginTop: 12 }}>
                {data.contentExamples.types.map((t) => <span className="khp-chip" key={t}><Play size={13} />{t}</span>)}
              </div>
            </div>
          )}

          {data.stats && (
            <div style={{ margin: "32px 0" }}>
              <h4 style={{ fontSize: "1.1rem", marginBottom: 16 }}>Projected Results</h4>
              <div className="khp-stat-grid">
                {data.stats.map((s) => <StatCounter key={s.label} {...s} />)}
              </div>
              {data.footNote && (
                <p style={{ textAlign: "center", color: "var(--espresso-soft)", fontSize: "0.85rem", marginTop: 14 }}>{data.footNote}</p>
              )}
            </div>
          )}

          {data.kpis && (
            <>
              <h4 style={{ fontSize: "1.1rem", marginBottom: 6, marginTop: 32 }}>KPIs</h4>
              <div className="khp-kpi-grid">
                {data.kpis.map((k) => (
                  <div className="khp-kpi-card" key={k.h}>
                    <h5>{k.h}</h5>
                    <ul style={{ paddingLeft: 18, margin: 0 }}>
                      {k.items.map((it) => <li key={it}>{it}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}

          {data.takeaway && <div className="khp-takeaway">{data.takeaway}</div>}
        </div>
      </div>
    </div>
  );
}

/* ---------------- lightbox ---------------- */
function CertLightbox({ cert, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div className="khp-lightbox" onClick={onClose}>
      <button className="khp-lightbox-close" onClick={onClose}><X size={26} /></button>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "min(520px,90vw)" }}>
        <img src={cert.img} alt={cert.title} style={{ width: "100%", borderRadius: 10, boxShadow: "0 30px 70px rgba(0,0,0,0.4)" }} />
        <p style={{ color: "#fff", textAlign: "center", marginTop: 16, fontFamily: "'Fraunces',serif", fontStyle: "italic" }}>{cert.title} · {cert.org}</p>
      </div>
    </div>
  );
}

function Lightbox({ photos, index, setIndex, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % photos.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose, photos.length, setIndex]);

  const p = photos[index];
  return (
    <div className="khp-lightbox" onClick={onClose}>
      <button className="khp-lightbox-close" onClick={onClose}><X size={26} /></button>
      <button className="khp-lightbox-nav" style={{ left: 24 }} onClick={(e) => { e.stopPropagation(); setIndex((index - 1 + photos.length) % photos.length); }}><ArrowLeft size={20} /></button>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "min(560px,86vw)" }}>
        <Frame gradient={p.gradient} label={p.label} ratio="4/5" icon={Camera} style={{ width: "100%" }} src={p.src} />
        <p style={{ color: "#fff", textAlign: "center", marginTop: 16, fontFamily: "'Fraunces',serif", fontStyle: "italic" }}>{p.label}</p>
      </div>
      <button className="khp-lightbox-nav" style={{ right: 24 }} onClick={(e) => { e.stopPropagation(); setIndex((index + 1) % photos.length); }}><ArrowRight size={20} /></button>
    </div>
  );
}

/* ---------------- main app ---------------- */
export default function KaylaHallPortfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [certLightbox, setCertLightbox] = useState(null);
  const [theme, setTheme] = useState("light");
  const carouselRef = useRef(null);
  const timelineRef = useRef(null);
  const heroRef = useRef(null);
  const lastPetalTime = useRef(0);
  const [petals, setPetals] = useState([]);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [tlFillHeight, setTlFillHeight] = useState(0);
  const [tlActiveCount, setTlActiveCount] = useState(0);

  const handleHeroMouseMove = useCallback((e) => {
    const rect = heroRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: relX, y: relY });

    const now = Date.now();
    if (now - lastPetalTime.current < 110) return;
    lastPetalTime.current = now;
    const id = now + Math.random();
    const petal = {
      id,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      emoji: PETAL_EMOJI[Math.floor(Math.random() * PETAL_EMOJI.length)],
      dx: Math.round(Math.random() * 46 - 23),
    };
    setPetals((p) => [...p.slice(-14), petal]);
    setTimeout(() => setPetals((p) => p.filter((pp) => pp.id !== id)), 1100);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnScroll = () => setMenuOpen(false);
    window.addEventListener("scroll", closeOnScroll, { passive: true });
    window.addEventListener("touchmove", closeOnScroll, { passive: true });
    window.addEventListener("wheel", closeOnScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", closeOnScroll);
      window.removeEventListener("touchmove", closeOnScroll);
      window.removeEventListener("wheel", closeOnScroll);
    };
  }, [menuOpen]);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = timelineRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height;
      const visible = Math.min(Math.max(vh * 0.65 - rect.top, 0), total);
      setTlFillHeight(visible);
      setTlActiveCount(Math.floor((visible / total) * PROCESS_STEPS.length));
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  }, []);

  const scrollCarousel = (dir) => {
    const el = carouselRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const atEnd = el.scrollLeft >= maxScroll - 4;
    const atStart = el.scrollLeft <= 4;

    if (dir > 0 && atEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else if (dir < 0 && atStart) {
      el.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      el.scrollBy({ left: dir * 220, behavior: "smooth" });
    }
  };

  return (
    <div className="khp" data-theme={theme}>
      <link rel="stylesheet" href={FONT_LINK} />
      <style>{GLOBAL_CSS}</style>
      <div className="grain" />

      {/* NAV */}
      <div className={`khp-menu-backdrop ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} />
      <nav className={`khp-nav ${scrolled ? "scrolled" : ""}`}>
        <button className="khp-logo script" onClick={() => scrollTo("hero")} aria-label="Back to top">KH</button>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginLeft: "auto" }}>
          <div className={`khp-dots ${menuOpen ? "open" : ""}`}>
            {NAV.map((n) => (
              <button key={n.id} className={`khp-dot-item ${active === n.id ? "active" : ""}`} onClick={() => { scrollTo(n.id); setMenuOpen(false); }}>
                <span className="khp-dot" />
                <span className="khp-dot-label">{n.label}</span>
              </button>
            ))}
          </div>
          <button className="khp-theme-toggle" onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))} aria-label="Toggle light and dark mode">
            <span className="khp-theme-thumb">{theme === "dark" ? "🌙" : "☀️"}</span>
          </button>
          <button className="khp-burger" onClick={() => setMenuOpen((m) => !m)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="khp-hero" ref={heroRef} onMouseMove={handleHeroMouseMove}>
        {petals.map((p) => (
          <span key={p.id} className="khp-petal" style={{ left: p.x, top: p.y, "--dx": `${p.dx}px` }}>{p.emoji}</span>
        ))}
        <Reveal className="eyebrow">Digital Marketer · Content Creator · Visual Storyteller</Reveal>
        <Reveal as="h1" delay={100} className="khp-hero-name script">Kayla Hall</Reveal>
        <Reveal delay={200}>
          <img src={IMG.heartDoodle} alt="" className="khp-sig-line" />
        </Reveal>
        <Reveal as="p" delay={280} className="khp-hero-sub">
          I create strategic marketing campaigns, engaging social content, and visual experiences that help brands connect with their audiences.
        </Reveal>
        <Reveal delay={380} className="khp-cta-row">
          <Magnetic><button className="khp-btn khp-btn-solid" onClick={() => scrollTo("work")}>View my work <ArrowRight size={16} /></button></Magnetic>
          <Magnetic><button className="khp-btn khp-btn-outline" onClick={() => scrollTo("contact")}>Let's talk</button></Magnetic>
        </Reveal>
        <div className="khp-marquee-wrap">
          <div className="khp-marquee">
            {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => <span key={i}>{w}</span>)}
          </div>
        </div>
        <div className="khp-scrolldown"><ChevronDown size={18} /></div>
      </section>

      {/* ABOUT */}
      <section id="about" className="khp-section khp-about">
        <Reveal className="khp-about-photo">
          <Frame label="Kayla's portrait — warm, candid headshot" gradient="linear-gradient(160deg,#F1D9DD,#C29A5C)" icon={Camera} ratio="4/5" src={IMG.aboutMe} />
          <div className="khp-quote-card">
            <Quote size={18} color="var(--gold)" />
            <p style={{ marginTop: 8 }}>Good marketing is storytelling with a strategy behind it.</p>
          </div>
        </Reveal>
        <div>
          <Reveal className="eyebrow">About Me</Reveal>
          <Reveal as="h2" delay={80}>Hi, I'm Kayla</Reveal>
          <Reveal as="p" delay={160} style={{ color: "var(--espresso-soft)", marginTop: 18, maxWidth: 560 }}>
            After spending 8+ years leading retail teams and creating memorable customer experiences, I discovered
            my passion for digital marketing and content creation. Today I combine creativity, strategy, and
            storytelling to create campaigns that are both beautiful and effective.
          </Reveal>

          <Reveal delay={240} style={{ marginTop: 40 }}>
            <h4 className="eyebrow" style={{ marginBottom: 16 }}>Current Certificates</h4>
            <div className="khp-cert-grid">
              {CERTS.map((c) => (
                <div
                  className={`khp-cert-card ${c.img ? "clickable" : ""}`}
                  key={c.title}
                  onClick={c.img ? () => setCertLightbox(c) : undefined}
                >
                  {c.img ? (
                    <img src={c.img} alt={c.title} className="khp-cert-thumb" />
                  ) : (
                    <div className="khp-cert-icon"><c.icon size={20} /></div>
                  )}
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{c.title}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--espresso-soft)", marginTop: 4 }}>{c.org}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={320} style={{ marginTop: 36 }}>
            <h4 className="eyebrow" style={{ marginBottom: 16 }}>Currently Learning</h4>
            <div className="khp-chip-grid">
              {LEARNING.map((l) => <span className="khp-chip" key={l}><Sparkles size={13} />{l}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section className="khp-section" style={{ paddingTop: 0 }}>
        <Reveal className="khp-section-head">
          <span className="eyebrow">My Toolkit</span>
          <h2>Skills that go from strategy deck to storyboard</h2>
        </Reveal>
        <div className="khp-skills-grid">
          <Reveal className="khp-skill-col">
            <h4><TrendingUp size={18} color="var(--rosewood)" /> Marketing Toolkit</h4>
            {SKILLS_MARKETING.map((s) => <SkillRow key={s.name} {...s} />)}
          </Reveal>
          <Reveal delay={120} className="khp-skill-col">
            <h4><Palette size={18} color="var(--sage-deep)" /> Creative Craft</h4>
            {SKILLS_CREATIVE.map((s) => <SkillRow key={s.name} sage {...s} />)}
          </Reveal>
        </div>
      </section>

      {/* WORK / FEATURED PROJECTS */}
      <section id="work" className="khp-section">
        <Reveal className="khp-section-head">
          <span className="eyebrow">Featured Projects</span>
          <h2>Two campaigns, two very different rituals</h2>
        </Reveal>
        <div className="khp-folder-grid">
          <Reveal style={{ height: "100%" }}>
            <TiltCard as="button" className="khp-folder khp-folder-skylar" style={{ width: "100%", height: "100%" }} onClick={() => setModal(SKYLAR)}>
              <Heart className="khp-folder-icon" size={54} color="var(--rosewood)" />
              <div>
                <div className="khp-folder-tag" style={{ color: "var(--rosewood-deep)" }}>Beauty · Event Activation</div>
                <h3>Skylar Campaign</h3>
                <p>"Love Letters" — an evening built to make a beauty brand feel like a relationship, not a transaction.</p>
              </div>
              <span className="khp-folder-cta" style={{ color: "var(--rosewood-deep)" }}>View case study <ArrowUpRight size={16} /></span>
            </TiltCard>
          </Reveal>
          <Reveal delay={120} style={{ height: "100%" }}>
            <TiltCard as="button" className="khp-folder khp-folder-matcha" style={{ width: "100%", height: "100%" }} onClick={() => setModal(MATCHA)}>
              <Sparkles className="khp-folder-icon" size={54} color="var(--sage-deep)" />
              <div>
                <div className="khp-folder-tag" style={{ color: "var(--sage-deep)" }}>Beverage · Brand Campaign</div>
                <h3>Matcha Muse</h3>
                <p>"Find Your Ritual" — repositioning a crowded matcha market around calm, daily ritual instead of caffeine.</p>
              </div>
              <span className="khp-folder-cta" style={{ color: "var(--sage-deep)" }}>View case study <ArrowUpRight size={16} /></span>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="khp-section">
        <Reveal className="khp-section-head">
          <span className="eyebrow">How I Work</span>
          <h2>A six-step creative process, start to launch</h2>
        </Reveal>
        <div className="khp-timeline" ref={timelineRef}>
          <div className="khp-timeline-track" />
          <div className="khp-timeline-fill" style={{ height: tlFillHeight }} />
          {PROCESS_STEPS.map((s, i) => (
            <div className={`khp-tl-step ${i < tlActiveCount ? "in" : ""}`} key={s.title}>
              <div className="khp-tl-dot"><s.icon size={15} /></div>
              <h3><span className="khp-tl-num">0{i + 1}</span>{s.title}</h3>
              <p>{s.body}</p>
              {s.title === "Refine" && (
                <div className="khp-tl-before-after">
                  <Frame label="Draft version" gradient="linear-gradient(160deg,#EDE6DA,#D9CFC0)" ratio="4/3" icon={PenTool} style={{ width: 140 }} src={IMG.refineBeforeDessert} />
                  <Frame label="Refined version" gradient="linear-gradient(160deg,#8C3A48,#33241F)" ratio="4/3" icon={Sparkles} style={{ width: 140 }} src={IMG.newMacro} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* VIDEOGRAPHY */}
      <section id="video" className="khp-section">
        <Reveal className="khp-section-head">
          <span className="eyebrow">Videography</span>
          <h2>Vertical video built for how people actually watch</h2>
        </Reveal>
        <Reveal as="p" style={{ color: "var(--espresso-soft)", maxWidth: 600, marginBottom: 12 }}>
          I enjoy using video to tell stories that feel authentic and engaging. From cinematic lifestyle edits to
          campaign concepts, each project helps me explore how motion, sound, and pacing can strengthen a brand's message.
        </Reveal>
        <div className="khp-carousel-row">
          <button className="khp-arrow-btn" onClick={() => scrollCarousel(-1)}><ArrowLeft size={18} /></button>
          <div className="khp-carousel" ref={carouselRef}>
            {VIDEOS.map((v) => (
              <div className="khp-phone" key={v.label}>
                <div
                  className="khp-phone-screen"
                  style={v.src ? { backgroundImage: `url(${v.src})`, backgroundSize: "cover", backgroundPosition: "center" } : { background: v.gradient }}
                >
                  <div className="khp-phone-notch" />
                  <span className="khp-phone-label">{v.label}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="khp-arrow-btn" onClick={() => scrollCarousel(1)}><ArrowRight size={18} /></button>
        </div>
      </section>

      {/* PHOTOGRAPHY */}
      <section id="photo" className="khp-section">
        <Reveal className="khp-section-head">
          <span className="eyebrow">Photography</span>
          <h2>Aesthetic, product-ready content packages</h2>
        </Reveal>
        <Reveal as="p" style={{ color: "var(--espresso-soft)", maxWidth: 600, marginBottom: 12, marginTop: -32 }}>
          Aesthetic lifestyle and product photography available upon request or as part of content packages.
        </Reveal>
        <div className="khp-masonry">
          {PHOTOS.map((p, i) => (
            <div className="khp-masonry-item" key={p.label} onClick={() => setLightboxIndex(i)}>
              <Frame label={p.label} gradient={p.gradient} icon={Camera} ratio="1" src={p.src} />
              <div className="khp-masonry-cap">{p.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PASSION PROJECTS */}
      <section id="passion" className="khp-section">
        <Reveal className="khp-section-head">
          <span className="eyebrow">Passion Projects</span>
          <h2>Why personal work still matters</h2>
        </Reveal>
        <Reveal as="p" style={{ color: "var(--espresso-soft)", maxWidth: 620, marginTop: -32, marginBottom: 56 }}>
          The projects I create outside of work reflect my curiosity, creativity, and passion for visual storytelling.
          Whether I'm filming a travel vlog, designing an editorial layout, or writing a story, each project helps me
          strengthen the skills I bring to marketing and content creation.
        </Reveal>
        {PASSION_PROJECTS.map((p, i) => (
          <Reveal key={p.title} className={`khp-passion-row ${i % 2 ? "rev" : ""}`}>
            <div className="khp-passion-frame">
              {p.title === "Creative Writing" ? (
                <div className="khp-photo-mat">
                  <div className="khp-frame khp-typewriter-card" style={{ aspectRatio: "4/3" }}>
                    <TypewriterMark />
                  </div>
                </div>
              ) : p.title === "Signature Scents" ? (
                <div className="khp-photo-mat">
                  <div className="khp-scent-list">
                    {SIGNATURE_SCENTS.map((s) => (
                      <div className="khp-scent-item" key={s.name}>
                        <span className="khp-scent-dot" style={{ background: s.color }} />
                        <div>
                          <div className="khp-scent-name">{s.name}</div>
                          <div className="khp-scent-note">{s.note}</div>
                          <p className="khp-scent-desc">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : p.src ? (
                <div className="khp-photo-mat">
                  <Frame label={`${p.title} — cover still`} gradient={p.gradient} icon={Clapperboard} ratio={p.ratio || "4/3"} src={p.src} />
                </div>
              ) : (
                <Frame label={`${p.title} — cover still`} gradient={p.gradient} icon={Clapperboard} ratio={p.ratio || "4/3"} src={p.src} />
              )}
            </div>
            <div className="khp-passion-text">
              <div className="khp-passion-eyebrow"><span className="eyebrow">{p.tag}</span></div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          </Reveal>
        ))}
        <Reveal className="khp-takeaway" style={{ marginTop: 80, maxWidth: 760 }}>
          <strong style={{ fontFamily: "'Work Sans',sans-serif", fontStyle: "normal", display: "block", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--rosewood)", marginBottom: 10 }}>Why Personal Projects Matter</strong>
          {WHY_PASSION_PROJECTS}
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contact" className="khp-contact">
        <Reveal className="eyebrow">Let's Build Something</Reveal>
        <Reveal as="h2" delay={80} className="script" style={{ color: "var(--rosewood-deep)" }}>Meaningful Together</Reveal>
        <Reveal delay={160} style={{ color: "var(--espresso-soft)", maxWidth: 480, margin: "18px auto 0" }}>
          If you're a brand that wants marketing with a heartbeat — let's start the conversation.
        </Reveal>
        <Reveal delay={240} className="khp-contact-links">
          <Magnetic><a className="khp-btn khp-btn-solid" href="mailto:KaylaHall.Creative@gmail.com"><Mail size={16} /> KaylaHall.Creative@gmail.com</a></Magnetic>
          <Magnetic><a className="khp-btn khp-btn-outline" href={IMG.resumePDF} target="_blank" rel="noopener noreferrer" download="Kayla_Hall_Resume.pdf"><FileText size={16} /> Resume <ExternalLink size={13} /></a></Magnetic>
        </Reveal>
      </section>

      <footer className="khp-footer">© {new Date().getFullYear()} Kayla Hall — Digital Marketing Portfolio</footer>

      {modal && <CaseStudyModal data={modal} onClose={() => setModal(null)} />}
      {lightboxIndex !== null && (
        <Lightbox photos={PHOTOS} index={lightboxIndex} setIndex={setLightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
      {certLightbox && <CertLightbox cert={certLightbox} onClose={() => setCertLightbox(null)} />}
    </div>
  );
}
