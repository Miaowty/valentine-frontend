import React, { useState, useEffect, useRef } from "react";

export default function ValentineCard() {
  const getInitialWindowSize = () => ({
    width: typeof window === "undefined" ? 0 : window.innerWidth,
    height: typeof window === "undefined" ? 0 : window.innerHeight,
  });

  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState(null);
  const [windowSize, setWindowSize] = useState(getInitialWindowSize);

  const noButtonRef = useRef(null);

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const phases = [
    { text: "Will you be my Valentine?", image: "/images/Cutesy cat.jpg", emoji: "💌" },
    { text: "What u mean no??", image: "/images/Sad Hamster Sticker.gif", emoji: "😢" },
    { text: "Subukan mo pindutin yang no na yan", image: "/images/Sad Face Sticker.gif", emoji: "😠" },
    { text: "Yes na kasiiiii", image: "/images/Sad Cat Sticker by Capoo.gif", emoji: "🥺" },
    { text: "LALAGYAN KITA NG MALWARE PAG UMAYAW KAPA", image: "/images/Sad Cat Sticker by MYAOWL.gif", emoji: "😈" },
    { text: "LAST CHANCE HAHAHAHA", image: "/images/Baby Meme GIF.gif", emoji: "⚠️" },
    { text: "PIDI YAN KASI", image: "/images/Sad Neon Genesis Evangelion Sticker by Castaways.gif", emoji: "🔥" },
    { text: "PINDUTIN MO NALANG YUNG YES PLEASE", image: "/images/Sticker ねこ Sticker by Japan.gif", emoji: "🙏" },
  ];

  const currentPhase = phases[Math.min(noCount, phases.length - 1)];
  const isFinalPhase = noCount >= phases.length - 1;

  const placeButtonSafely = () => {
    if (!noButtonRef.current) return;

    const button = noButtonRef.current;
    const rect = button.getBoundingClientRect();
    const buttonWidth = rect.width;
    const buttonHeight = rect.height;

    const margin = 20;
    const minX = margin;
    const minY = margin;
    const maxX = windowSize.width - buttonWidth - margin;
    const maxY = windowSize.height - buttonHeight - margin;

    if (maxX <= minX || maxY <= minY) return;

    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    setNoButtonPos({
      position: "fixed",
      left: `${randomX}px`,
      top: `${randomY}px`,
    });
  };

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
    placeButtonSafely();
  };

  const getYesButtonSize = () => Math.min(16 + noCount * 8, 80);

  return (
    <div className="page">
      {yesPressed ? (
        <div className="content fade-in">
          <img src="/images/lego batman GIF.gif" alt="Yes" className="main-image" />
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
          <img src="/images/Cat Love GIF.gif" alt="Love" className="main-image" />
        </div>
      ) : (
        <div className="content fade-in" key={noCount}>
          <div className="emoji-badge">{currentPhase.emoji}</div>

          <div className="image-wrapper">
            <img src={currentPhase.image} alt="Valentine" className="main-image" />
          </div>

          <h1 className="title">{currentPhase.text}</h1>

          <div className="button-row">
            <button
              className="btn yes-btn"
              style={{
                fontSize: `${getYesButtonSize()}px`,
                animation: noCount > 0 ? "pulse 1s infinite" : "none",
              }}
              onClick={() => setYesPressed(true)}
            >
              ❤️ Yes
            </button>

            {!isFinalPhase && (
              <button
                ref={noButtonRef}
                className="btn no-btn"
                style={noButtonPos || undefined}
                onClick={handleNoClick}
              >
                {noButtonPos ? "No"}
              </button>
            )}
          </div>

          {noCount === 2 && !noButtonPos && (
            <p className="hint-text">Keep clicking “No” if you dare…</p>
          )}
        </div>
      )}

      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .page {
          min-height: 100dvh;
          width: 100vw;
          background: radial-gradient(circle at top, #ffeaa7, #fd79a8 60%, #d63031);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          overflow: hidden;
        }

        .content {
          width: min(520px, 100%);
          background: rgba(255, 255, 255, 0.92);
          border-radius: 32px;
          padding: clamp(24px, 5vw, 48px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .emoji-badge {
          font-size: clamp(2.5rem, 6vw, 3.5rem);
        }

        .title {
          font-size: clamp(1.4rem, 4vw, 2rem);
          color: #be185d;
          font-weight: 700;
          line-height: 1.3;
        }

        .subtitle {
          font-size: clamp(1.1rem, 3vw, 1.5rem);
          color: #be185d;
          font-weight: 600;
        }

        .subtitle-small {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: #9d174d;
        }

        .emoji-text {
          font-size: clamp(1.5rem, 4vw, 2rem);
        }

        .image-wrapper {
          width: 100%;
          max-height: 260px;
          display: flex;
          justify-content: center;
        }

        .main-image {
          max-width: 100%;
          max-height: 100%;
          border-radius: 20px;
          object-fit: contain;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .button-row {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          justify-content: center;
          width: 100%;
        }

        .btn {
          padding: 14px 32px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-weight: 700;
          color: white;
          min-width: 120px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
        }

        .yes-btn {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          box-shadow: 0 4px 20px rgba(34, 197, 94, 0.35);
        }

        .no-btn {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          box-shadow: 0 4px 20px rgba(239, 68, 68, 0.35);
          position: relative;
        }

        .hint-text {
          font-size: 0.9rem;
          color: #9d174d;
          opacity: 0.75;
          font-style: italic;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .fade-in {
          animation: fadeIn 0.4s ease;
        }

        @media (max-width: 600px) {
          .page {
            padding: 16px;
          }
          .content {
            border-radius: 24px;
          }
          .btn {
            min-width: 100px;
            padding: 12px 24px;
          }
        }
      `}</style>
    </div>
  );
}
