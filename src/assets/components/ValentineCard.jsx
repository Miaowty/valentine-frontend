import React, { useState } from "react";

export default function ValentineCard() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState(null);

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
    },
    {
      text: "Subukan mo pindutin yang no na yan",
      image: "/images/Sad Face Sticker.gif",
    },
    {
      text: "Yes na kasiiiii",
      image: "/images/Sad Cat Sticker by Capoo.gif",
    },
    {
      text: "LALAGYAN KITA NG MALWARE PAG UMAYAW KAPA",
      image: "/images/Sad Cat Sticker by MYAOWL.gif",
    },
    {
      text: "LAST CHANCE HAHAHAHA",
      image: "/images/Baby Meme GIF.gif",
    },
    {
      text: "PIDI YAN KASI",
      image: "/images/Sad Neon Genesis Evangelion Sticker by Castaways.gif",
    },
    {
      text: "PINDUTIN MO NALANG YUNG YES PLEASE",
      image: "/images/Sticker ねこ Sticker by Japan.gif",
    },
  ];

  const currentPhase = phases[Math.min(noCount, phases.length - 1)];
  const currentNoText =
    noButtonTexts[Math.min(noCount, noButtonTexts.length - 1)];

  // CLICK = increase phase
  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
  };

  // DODGE CURSOR SMOOTHLY
  const handleNoMove = (e) => {
    const buttonWidth = 150;
    const buttonHeight = 50;

    const minX = window.innerWidth * 0.2;
    const maxX = window.innerWidth * 0.8 - buttonWidth;
    const minY = window.innerHeight * 0.2;
    const maxY = window.innerHeight * 0.8 - buttonHeight;

    const rect = e.currentTarget.getBoundingClientRect();

    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distance = Math.hypot(
      mouseX - buttonCenterX,
      mouseY - buttonCenterY
    );

    if (distance < 120) {
      const angle = Math.atan2(
        buttonCenterY - mouseY,
        buttonCenterX - mouseX
      );

      const dodgeDistance = 80;

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

  const getYesButtonSize = () => {
    return Math.min(16 + noCount * 8, 80);
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
              className="btn no-btn"
              style={noButtonPos ? noButtonPos : {}}
              onClick={handleNoClick}
              onMouseMove={handleNoMove}
            >
              {currentNoText}
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .main-container {
          min-height: 100vh;
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
          padding: 20px;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Helvetica, Arial, sans-serif;
        }

        .card {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(10px);
          padding: 40px;
          border-radius: 30px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          text-align: center;
          max-width: 500px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title {
          font-size: 2rem;
          color: #be185d;
          margin: 20px 0;
          font-weight: 700;
        }

        .subtitle {
          font-size: 1.5rem;
          color: #be185d;
          font-weight: 600;
        }

        .subtitle-small {
          font-size: 1.2rem;
          color: #9d174d;
          margin-bottom: 20px;
        }

        .emoji-badge {
          font-size: 3rem;
        }

        .emoji-text {
          font-size: 2rem;
        }

        .image-wrapper {
          width: 100%;
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .main-image {
          max-width: 100%;
          max-height: 250px;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          object-fit: contain;
        }

        .button-container {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-top: 20px;
        }

        .btn {
          padding: 12px 24px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          white-space: nowrap;
        }

        .yes-btn {
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          color: white;
        }

        .no-btn {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          position: relative;
          transition: all 0.18s cubic-bezier(0.2, 0.8, 0.2, 1);
          z-index: 9999;
        }
      `}</style>
    </div>
  );
}
