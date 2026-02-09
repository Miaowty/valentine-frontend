import React, { useState, useRef } from "react";

export default function ValentineCard() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState(null);

  const cardRef = useRef(null);

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

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);

    if (!cardRef.current) return;

    const cardRect = cardRef.current.getBoundingClientRect();

    const buttonWidth = 150;
    const buttonHeight = 50;

    const padding = 40;

    const minX = padding;
    const maxX = cardRect.width - buttonWidth - padding;

    const minY = padding;
    const maxY = cardRect.height - buttonHeight - padding;

    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    setNoButtonPos({
      position: "absolute",
      left: `${randomX}px`,
      top: `${randomY}px`,
    });
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
        <div className="card fade-in" key={noCount} ref={cardRef}>
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
          position: relative;
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
          width: 100%;
          min-height: 80px;
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
          transition: transform 0.2s ease;
        }

        .yes-btn:hover {
          transform: scale(1.05);
        }

        .no-btn {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          position: absolute;
          transition: all 0.25s ease;
          z-index: 20;
        }
      `}</style>
    </div>
  );
}
