import React, { useState, useEffect, useCallback, useRef } from "react";

export default function ValentineCard() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState(null);
  const [windowSize, setWindowSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });
  const noButtonRef = useRef(null);

  // Track window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
      setNoButtonPos(null); // Reset position on resize
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const noButtonTexts = ["No"];

  const phases = [
    {
      text: "Will you be my Valentine?",
      image: "/images/Cutesy cat.jpg",
      emoji: "💌",
    },
    {
      text: "What u mean no??",
      image: "/images/Sad Hamster Sticker.gif",
      emoji: "😢",
    },
    {
      text: "Subukan mo pindutin yang no na yan",
      image: "/images/Sad Face Sticker.gif",
      emoji: "😤",
    },
    {
      text: "Yes na kasiiiii",
      image: "/images/Sad Cat Sticker by Capoo.gif",
      emoji: "🥺",
    },
    {
      text: "LALAGYAN KITA NG MALWARE PAG UMAYAW KAPA",
      image: "/images/Sad Cat Sticker by MYAOWL.gif",
      emoji: "💀",
    },
    {
      text: "LAST CHANCE HAHAHAHA",
      image: "/images/Baby Meme GIF.gif",
      emoji: "⚠️",
    },
    {
      text: "PIDI YAN KASI",
      image: "/images/Sad Neon Genesis Evangelion Sticker by Castaways.gif",
      emoji: "😭",
    },
    {
      text: "PINDUTIN MO NALANG YUNG YES PLEASE",
      image: "/images/Sticker ねこ Sticker by Japan.gif",
      emoji: "🙏",
    },
  ];

  const currentPhase = phases[Math.min(noCount, phases.length - 1)];
  const currentNoText =
    noButtonTexts[Math.min(noCount, noButtonTexts.length - 1)];

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
  };

  // Safe dodge function that keeps button inside viewport
  const dodgeButton = useCallback(
    (pointerX, pointerY) => {
      const btn = noButtonRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const btnW = rect.width;
      const btnH = rect.height;
      const btnCenterX = rect.left + btnW / 2;
      const btnCenterY = rect.top + btnH / 2;

      const distance = Math.hypot(pointerX - btnCenterX, pointerY - btnCenterY);

      // Only dodge if cursor is close enough
      if (distance < 130) {
        const angle = Math.atan2(btnCenterY - pointerY, btnCenterX - pointerX);
        const dodgeDist = 100 + Math.random() * 40;

        // Calculate new position
        let newX = rect.left + Math.cos(angle) * dodgeDist;
        let newY = rect.top + Math.sin(angle) * dodgeDist;

        // Padding from edges
        const pad = 10;

        // Clamp to viewport
        newX = Math.max(pad, Math.min(windowSize.w - btnW - pad, newX));
        newY = Math.max(pad, Math.min(windowSize.h - btnH - pad, newY));

        // If it gets stuck in a corner, jump to opposite side
        const isCornerX = newX <= pad + 5 || newX >= windowSize.w - btnW - pad - 5;
        const isCornerY = newY <= pad + 5 || newY >= windowSize.h - btnH - pad - 5;

        if (isCornerX && isCornerY) {
          newX = windowSize.w / 2 - btnW / 2 + (Math.random() - 0.5) * 200;
          newY = windowSize.h / 2 - btnH / 2 + (Math.random() - 0.5) * 200;
          newX = Math.max(pad, Math.min(windowSize.w - btnW - pad, newX));
          newY = Math.max(pad, Math.min(windowSize.h - btnH - pad, newY));
        }

        setNoButtonPos({
          position: "fixed",
          left: `${newX}px`,
          top: `${newY}px`,
        });
      }
    },
    [windowSize]
  );

  // Mouse dodge (desktop)
  const handleNoMouseMove = (e) => {
    dodgeButton(e.clientX, e.clientY);
  };

  // Touch dodge (mobile)
  const handleNoTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (touch) {
      dodgeButton(touch.clientX, touch.clientY);
    }
  };

  // Also dodge when finger gets near on the whole screen (mobile)
  useEffect(() => {
    if (yesPressed || noCount === 0) return;

    const handleGlobalTouch = (e) => {
      const touch = e.touches[0];
      if (touch) {
        dodgeButton(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("touchmove", handleGlobalTouch, { passive: true });
    return () => window.removeEventListener("touchmove", handleGlobalTouch);
  }, [yesPressed, noCount, dodgeButton]);

  const getYesButtonSize = () => {
    const isMobile = windowSize.w <= 768;
    const base = isMobile ? 14 : 16;
    const step = isMobile ? 5 : 8;
    const max = isMobile ? 50 : 80;
    return Math.min(base + noCount * step, max);
  };

  return (
    <div className="main-container">
      {yesPressed ? (
        <div className="card fade-in">
          <img
            src="/images/lego batman GIF.gif"
            alt="Yes"
            className="main-image"
          />
          <h1 className="title">YES?!</h1>
          <div className="emoji-text">💕💕💕</div>
          <img
            src="/images/Happy In Love Sticker by KIKI.gif"
            alt="Celebrate"
            className="main-image"
            style={{ margin: "20px 0" }}
          />
          <p className="subtitle">Yan ganyan dapat lang</p>
          <p className="subtitle-small">HAHAHAHAHA</p>
          <img
            src="/images/Cat Love GIF.gif"
            alt="Love"
            className="main-image"
          />
        </div>
      ) : (
        <div className="card fade-in" key={noCount}>
          <div className="emoji-badge">{currentPhase.emoji}</div>

          <div className="image-wrapper">
            <img
              src={currentPhase.image}
              alt="Valentine"
              className="main-image"
            />
          </div>

          <h1 className="title">{currentPhase.text}</h1>

          <div className="button-container">
            <button
              className="btn yes-btn"
              style={{ fontSize: `${getYesButtonSize()}px` }}
              onClick={() => setYesPressed(true)}
            >
              ❤️ Yes
            </button>

            {/* No button — only dodges after first click */}
            <button
              ref={noButtonRef}
              className="btn no-btn"
              style={noButtonPos && noCount > 0 ? noButtonPos : {}}
              onClick={handleNoClick}
              onMouseMove={noCount > 0 ? handleNoMouseMove : undefined}
              onTouchMove={noCount > 0 ? handleNoTouchMove : undefined}
            >
              {currentNoText}
            </button>
          </div>
        </div>
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          overflow-x: hidden;
          width: 100%;
        }

        .main-container {
          min-height: 100vh;
          min-height: 100dvh;
          width: 100%;
          background: linear-gradient(
            135deg,
            #ffeaa7 0%,
            #fab1a0 25%,
            #fd79a8 50%,
            #e17055 75%,
            #d63031 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Helvetica, Arial, sans-serif;
        }

        .card {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(10px);
          padding: 24px;
          border-radius: 24px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          text-align: center;
          max-width: 500px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: slideUp 0.4s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .title {
          font-size: clamp(1.2rem, 4vw, 2rem);
          color: #be185d;
          margin: 16px 0;
          font-weight: 700;
          line-height: 1.3;
          padding: 0 8px;
          word-wrap: break-word;
        }

        .subtitle {
          font-size: clamp(1.2rem, 3.5vw, 1.5rem);
          color: #be185d;
          font-weight: 600;
        }

        .subtitle-small {
          font-size: clamp(1rem, 3vw, 1.2rem);
          color: #9d174d;
          margin-bottom: 16px;
        }

        .emoji-badge {
          font-size: clamp(2rem, 6vw, 3rem);
        }

        .emoji-text {
          font-size: clamp(1.5rem, 5vw, 2rem);
        }

        .image-wrapper {
          width: 100%;
          height: clamp(180px, 30vw, 250px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .main-image {
          max-width: 100%;
          max-height: clamp(180px, 30vw, 250px);
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          object-fit: contain;
        }

        .button-container {
          display: flex;
          gap: 12px;
          justify-content: center;
          align-items: center;
          margin-top: 16px;
          flex-wrap: wrap;
          width: 100%;
        }

        .btn {
          padding: 12px 28px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          white-space: nowrap;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
        }

        .yes-btn {
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .yes-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(34, 197, 94, 0.5);
        }

        .yes-btn:active {
          transform: scale(0.97);
        }

        .no-btn {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
          position: relative;
          transition: left 0.18s cubic-bezier(0.2, 0.8, 0.2, 1),
                      top 0.18s cubic-bezier(0.2, 0.8, 0.2, 1),
                      transform 0.2s ease;
          z-index: 9999;
        }

        .no-btn:hover {
          transform: scale(1.05);
        }

        .no-btn:active {
          transform: scale(0.97);
        }

        /* Tablet */
        @media (min-width: 768px) {
          .card {
            padding: 36px;
            border-radius: 30px;
          }

          .button-container {
            gap: 16px;
            margin-top: 20px;
          }

          .btn {
            padding: 14px 32px;
          }
        }

        /* Desktop */
        @media (min-width: 1024px) {
          .card {
            padding: 40px;
          }

          .main-container {
            padding: 40px;
          }
        }

        /* Small phones */
        @media (max-width: 380px) {
          .card {
            padding: 16px;
            border-radius: 20px;
          }

          .btn {
            padding: 10px 20px;
            font-size: 14px;
          }

          .image-wrapper {
            height: 160px;
          }

          .main-image {
            max-height: 160px;
          }
        }
      `}</style>
    </div>
  );
}
