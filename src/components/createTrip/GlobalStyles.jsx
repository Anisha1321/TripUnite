const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,100;0,200;0,300;0,400;0,700;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; }

    :root {
      --bg-primary: #0D1117;
      --bg-secondary: #111827;
      --green: #1D9E75;
      --green-light: #5DCAA5;
      --border: rgba(255,255,255,0.06);
      --border-hover: #1D9E75;
      --text-muted: rgba(255,255,255,0.45);
      --text-dim: rgba(255,255,255,0.65);
    }

    body { background: var(--bg-primary); color: #fff; font-family: 'DM Sans', sans-serif; }

    .grad-text {
      background: linear-gradient(135deg, #5DCAA5 0%, #1D9E75 50%, #0fa868 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .noise-bg { position: relative; }
    .noise-bg::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
    }

    .fade-in   { animation: fadeUp 0.7s ease both; }
    .fade-in-2 { animation: fadeUp 0.7s 0.15s ease both; }
    .fade-in-3 { animation: fadeUp 0.7s 0.3s ease both; }
    .fade-in-4 { animation: fadeUp 0.7s 0.45s ease both; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(22px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .card {
      background: rgba(255,255,255,0.03);
      border: 1px solid var(--border);
      border-radius: 20px;
      transition: border-color 0.3s, box-shadow 0.3s, transform 0.25s;
    }
    .card:hover {
      border-color: rgba(29,158,117,0.3);
      box-shadow: 0 0 32px rgba(29,158,117,0.07);
    }

    .input-field {
      width: 100%;
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 11px 14px;
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      -webkit-appearance: none;
    }
    .input-field::placeholder { color: var(--text-muted); }
    .input-field:focus {
      border-color: var(--green);
      box-shadow: 0 0 0 3px rgba(29,158,117,0.15);
    }
    select.input-field option { background: #1a2332; color: #fff; }

    .label {
      display: block;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 7px;
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #1D9E75, #0fa868);
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 14px;
      padding: 13px 28px;
      border-radius: 12px;
      border: none;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
      text-decoration: none;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(29,158,117,0.35);
    }

    .btn-outline {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: transparent;
      color: var(--green-light);
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      font-size: 14px;
      padding: 13px 28px;
      border-radius: 12px;
      border: 1px solid rgba(93,202,165,0.3);
      cursor: pointer;
      transition: background 0.2s, transform 0.2s, border-color 0.2s;
    }
    .btn-outline:hover {
      background: rgba(93,202,165,0.07);
      border-color: var(--green-light);
      transform: translateY(-2px);
    }

    .tag-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(29,158,117,0.12);
      border: 1px solid rgba(29,158,117,0.3);
      color: var(--green-light);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 5px 12px;
      border-radius: 100px;
    }

    .section-title {
      font-family: 'Fraunces', serif;
      font-weight: 300;
      font-size: 18px;
      color: #fff;
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .section-title::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--border);
    }

    .day-card {
      background: rgba(255,255,255,0.025);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 14px;
      transition: border-color 0.2s;
    }
    .day-card:hover { border-color: rgba(29,158,117,0.25); }

    .preview-card {
      position: sticky;
      top: 100px;
      background: rgba(255,255,255,0.03);
      border: 1px solid var(--border);
      border-radius: 24px;
      overflow: hidden;
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    .preview-card:hover {
      border-color: rgba(29,158,117,0.4);
      box-shadow: 0 0 48px rgba(29,158,117,0.1);
    }

    .divider { height: 1px; background: var(--border); margin: 24px 0; }

    .glow-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--green);
      box-shadow: 0 0 8px var(--green);
      display: inline-block;
    }

    .upload-zone {
      border: 2px dashed rgba(255,255,255,0.1);
      border-radius: 14px;
      padding: 36px 20px;
      text-align: center;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
    }
    .upload-zone:hover {
      border-color: var(--green);
      background: rgba(29,158,117,0.05);
    }

    .remove-btn {
      background: rgba(255,80,80,0.12);
      border: 1px solid rgba(255,80,80,0.25);
      color: #ff6b6b;
      border-radius: 8px;
      padding: 5px 10px;
      font-size: 12px;
      cursor: pointer;
      transition: background 0.2s;
      font-family: 'DM Sans', sans-serif;
    }
    .remove-btn:hover { background: rgba(255,80,80,0.22); }

    .add-btn {
      background: rgba(29,158,117,0.08);
      border: 1px dashed rgba(29,158,117,0.35);
      color: var(--green-light);
      border-radius: 10px;
      padding: 10px 16px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background 0.2s, border-color 0.2s;
      font-family: 'DM Sans', sans-serif;
    }
    .add-btn:hover { background: rgba(29,158,117,0.15); border-color: var(--green); }

    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

    @media (max-width: 768px) {
        .create-trip-grid {
            grid-template-columns: 1fr !important;
        }
        .create-trip-grid > div:last-child {
            /* sidebar moves below the form on mobile */
            position: static !important;
        }
    }


    @media (max-width: 768px) {
        /* Grid collapses to single column */
        .create-trip-grid {
            grid-template-columns: 1fr !important;
        }

        /* Sidebar unsticks and flows below the form */
        .create-trip-grid > div:last-child {
            position: static !important;
        }

        /* preview-card loses its sticky positioning */
        .preview-card {
            position: static !important;
            top: auto !important;
        }

        /* Half-width fields become full width on mobile */
        .field-half {
            flex: 1 1 100% !important;
        }
    }

    @media (max-width: 480px) {
        /* Tighten page horizontal padding */
        .page-wrapper {
            padding-left: 16px !important;
            padding-right: 16px !important;
        }

        /* Hero heading font size */
        .hero-heading {
            font-size: 36px !important;
        }

        /* CTA buttons stack vertically */
        .cta-row {
            flex-direction: column !important;
        }
        .cta-row .btn-outline {
            width: 100%;
            justify-content: center;
        }

        /* Inclusions/Exclusions stack vertically */
        .inclusions-row > div {
            flex: 1 1 100% !important;
        }
    }




  `}</style>
);

export default GlobalStyles;