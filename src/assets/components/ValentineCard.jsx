import React, { useState, useEffect, useRef } from "react";

export default function ValentineCard() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState(null);
  const [isDodgingActive, setIsDodgingActive] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const noButtonRef = useRef(null);

  // Track window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      emoji: "😠",
    },
    {
      text: "Yes na kasiiiii",
      image: "/images/Sad Cat Sticker by Capoo.gif",
      emoji: "🥺",
    },
    {
      text: "LALAGYAN KITA NG MALWARE PAG UMAYAW KAPA",
      image: "/images/Sad Cat Sticker by MYAOWL.gif",
      emoji: "😈",
    },
    {
      text: "LAST CHANCE HAHAHAHA",
      image: "/images/Baby Meme GIF.gif",
      emoji: "⚠️",
    },
    {
      text: "PIDI YAN KASI",
      image: "/images/Sad Neon Genesis Evangelion Sticker by Castaways.gif",
      emoji: "🔥",
    },
    {
      text: "PINDUTIN MO NALANG YUNG YES PLEASE",
      image: "/images/Sticker ねこ Sticker by Japan.gif",
      emoji: "🙏",
    },
  ];

  const currentPhase = phases[Math.min(noCount, phases.length - 1)];
  const isFinalPhase = noCount >= phases.length - 1;

  // First click activates dodging
  const handleNoClick = () => {
    if (!isDodgingActive) {
      setIsDodgingActive(true);
    }
    setNoCount((prev) => prev + 1);
  };

  // DODGE CURSOR WITH BOUNDARIES (only when active)
  const handleNoMove = (e) => {
    if (!isDodgingActive || !noButtonRef.current) return;

    const button = noButtonRef.current;
    const rect = button.getBoundingClientRect();
    
    const buttonWidth = rect.width;
    const buttonHeight = rect.height;

    const margin = 20;
    const minX = margin;
    const maxX = windowSize.width - buttonWidth - margin;
    const minY = margin;
    const maxY = windowSize.height - buttonHeight - margin;

    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distance = Math.hypot(
      mouseX - buttonCenterX,
      mouseY - buttonCenterY
    );

    const dodgeRadius = 100;
    
    if (distance < dodgeRadius) {
      const angle = Math.atan2(
        buttonCenterY - mouseY,
        buttonCenterX - mouseX
      );

      const closeness = (dodgeRadius - distance) / dodgeRadius;
      const dodgeDistance = 60 + closeness * 80;

      let newX = rect.left + Math.cos(angle) * dodgeDistance;
      let newY = rect.top + Math.sin(angle) * dodgeDistance;

      newX = Math.max(minX, Math.min(maxX, newX));
      newY = Math.max(minY, Math.min(maxY, newY));

      setNoButtonPos({
        position: "fixed",
        left: `${newX}px`,
        top: `${newY}px`,
      });
    }
  };

  // Reset when phase changes
  useEffect(() => {
    setNoButtonPos(null);
    // Keep dodging active if already activated
  }, [noCount]);

  const getYesButtonSize = () => {
    return Math.min(16 + noCount * 8, 80);
  };

  return (
    <div className="main-container">
      {yesPressed ? (
        <div className="card scrollable fade-in">
          <div className="card-content">
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
        </div>
      ) : (
        <div className="card scrollable fade-in" key={noCount}>
          <div className="card-content">
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
                style={{ 
                  fontSize: `${getYesButtonSize()}px`,
                  animation: noCount > 0 ? 'pulse 1s infinite' : 'none'
                }}
                onClick={() => setYesPressed(true)}
              >
                ❤️ Yes
              </button>

              {/* No button hidden on final phase */}
              {!isFinalPhase && (
                <button
                  ref={noButtonRef}
                  className={`btn no-btn ${isDodgingActive ? 'dodging' : ''}`}
                  style={noButtonPos || { position: "relative" }}
                  onClick={handleNoClick}
                  onMouseMove={handleNoMove}
                >
                  {isDodgingActive ? 'Try to catch me!' : 'No'}
                </button>
              )}
            </div>

            {/* Hint text before dodging activates */}
            {noCount === 2 && !isDodgingActive && (
              <p className="hint-text">Click "No" to see what happens...</p>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .main-container {
          min-height: 100dvh;
          width: 100vw;
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
          position: fixed;
          top: 0;
          left: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Helvetica, Arial, sans-serif;
        }

        .card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          max-width: 90vw;
          width: 100%;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
        }

        .card.scrollable {
          overflow-y: scroll;
          overflow-x: hidden;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .card.scrollable::-webkit-scrollbar {
          display: none;
        }

        .card-content {
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          min-height: min-content;
        }

        .title {
          font-size: clamp(1.2rem, 4vw, 1.8rem);
          color: #be185d;
          font-weight: 700;
          line-height: 1.3;
          word-break: break-word;
          text-align: center;
        }

        .subtitle {
          font-size: clamp(1.1rem, 3vw, 1.5rem);
          color: #be185d;
          font-weight: 600;
          text-align: center;
        }

        .subtitle-small {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: #9d174d;
          text-align: center;
        }

        .emoji-badge {
          font-size: clamp(2rem, 6vw, 3rem);
          line-height: 1;
        }

        .emoji-text {
          font-size: clamp(1.5rem, 4vw, 2rem);
        }

        .image-wrapper {
          width: 100%;
          height: clamp(160px, 28vh, 220px);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .main-image {
          max-width: 100%;
          max-height: 100%;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          object-fit: contain;
        }

        .button-container {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
          margin-top: 8px;
          width: 100%;
          flex-shrink: 0;
          min-height: 60px;
        }

        .btn {
          padding: 14px 32px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          white-space: nowrap;
          transition: all 0.2s ease;
          min-width: 100px;
        }

        .btn:hover {
          transform: translateY(-2px);
        }

        .btn:active {
          transform: translateY(0) scale(0.98);
        }

        .yes-btn {
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
        }

        .yes-btn:hover {
          box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
        }

        .no-btn {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
          position: relative;
          transition: all 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .no-btn.dodging {
          will-change: transform, left, top;
          z-index: 100;
        }

        .no-btn:hover {
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
        }

        .hint-text {
          font-size: 14px;
          color: #9d174d;
          opacity: 0.7;
          font-style: italic;
          margin-top: 8px;
        }

        /* Mobile optimizations */
        @media (max-width: 480px) {
          .card-content {
            padding: 24px 16px;
            gap: 12px;
          }

          .btn {
            padding: 12px 24px;
            font-size: 14px;
            min-width: 80px;
          }

          .button-container {
            gap: 12px;
          }
        }

        /* Large screens */
        @media (min-width: 1024px) {
          .card {
            max-width: 480px;
          }

          .card-content {
            padding: 40px;
          }
        }

        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .fade-in {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
