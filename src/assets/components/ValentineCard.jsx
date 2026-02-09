import React, { useState, useEffect, useRef } from "react";

export default function ValentineCard() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState(null);
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

  // CLICK = increase phase
  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
  };

  // DODGE CURSOR WITH BOUNDARIES
  const handleNoMove = (e) => {
    if (!noButtonRef.current) return;

    const button = noButtonRef.current;
    const rect = button.getBoundingClientRect();
    
    // Button dimensions
    const buttonWidth = rect.width;
    const buttonHeight = rect.height;

    // Safe margins from edges
    const margin = 20;
    
    // Calculate safe bounds
    const minX = margin;
    const maxX = windowSize.width - buttonWidth - margin;
    const minY = margin;
    const maxY = windowSize.height - buttonHeight - margin;

    // Button center
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    // Mouse position
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Distance from mouse to button center
    const distance = Math.hypot(
      mouseX - buttonCenterX,
      mouseY - buttonCenterY
    );

    // Dodge if close enough (100px radius)
    const dodgeRadius = 100;
    
    if (distance < dodgeRadius) {
      // Calculate angle away from mouse
      const angle = Math.atan2(
        buttonCenterY - mouseY,
        buttonCenterX - mouseX
      );

      // Dodge distance based on how close mouse is
      const closeness = (dodgeRadius - distance) / dodgeRadius;
      const dodgeDistance = 60 + closeness * 80; // 60-140px based on closeness

      // Calculate new position
      let newX = rect.left + Math.cos(angle) * dodgeDistance;
      let newY = rect.top + Math.sin(angle) * dodgeDistance;

      // STRICT BOUNDARY CHECK
      newX = Math.max(minX, Math.min(maxX, newX));
      newY = Math.max(minY, Math.min(maxY, newY));

      setNoButtonPos({
        position: "fixed",
        left: `${newX}px`,
        top: `${newY}px`,
      });
    }
  };

  // Reset button position when phase changes
  useEffect(() => {
    setNoButtonPos(null);
  }, [noCount]);

  const getYesButtonSize = () => {
    return Math.min(16 + noCount * 6, 60);
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

            <button
              ref={noButtonRef}
              className="btn no-btn"
              style={noButtonPos || { position: "relative" }}
              onClick={handleNoClick}
              onMouseMove={handleNoMove}
            >
              No
            </button>
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
          padding: 32px 24px;
          border-radius: 24px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          text-align: center;
          max-width: 90vw;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          overflow: auto;
        }

        .title {
          font-size: clamp(1.3rem, 4vw, 2rem);
          color: #be185d;
          font-weight: 700;
          line-height: 1.3;
          word-break: break-word;
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

        .emoji-badge {
          font-size: clamp(2rem, 6vw, 3rem);
          line-height: 1;
        }

        .emoji-text {
          font-size: clamp(1.5rem, 4vw, 2rem);
        }

        .image-wrapper {
          width: 100%;
          height: clamp(180px, 30vh, 250px);
          display: flex;
          align-items: center;
          justify-content: center;
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
          gap: 12px;
          justify-content: center;
          margin-top: 8px;
          width: 100%;
        }

        .btn {
          padding: 12px 28px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          white-space: nowrap;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          min-width: 80px;
        }

        .btn:hover {
          transform: translateY(-2px);
        }

        .btn:active {
          transform: translateY(0);
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
          transition: all 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);
          will-change: transform, left, top;
        }

        .no-btn:hover {
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
        }

        /* Mobile optimizations */
        @media (max-width: 480px) {
          .card {
            padding: 24px 16px;
            gap: 12px;
          }

          .btn {
            padding: 10px 20px;
            font-size: 14px;
          }
        }

        /* Large screens */
        @media (min-width: 1024px) {
          .card {
            max-width: 500px;
            padding: 40px;
          }
        }

        /* Animation */
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

        .fade-in {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
