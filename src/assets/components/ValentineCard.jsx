import React, { useState, useRef } from "react";

export default function ValentineCard() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState(null);

  const cardRef = useRef(null);

  const noButtonTexts = ["No"];

  const phases = [
    { text: "Will you be my Valentine?", image: "/images/Cutesy cat.jpg", emoji: "💌" },
    { text: "What u mean no??", image: "/images/Sad Hamster Sticker.gif" },
    { text: "Subukan mo pindutin yang no na yan", image: "/images/Sad Face Sticker.gif" },
    { text: "Yes na kasiiiii", image: "/images/Sad Cat Sticker by Capoo.gif" },
    { text: "LALAGYAN KITA NG MALWARE PAG UMAYAW KAPA", image: "/images/Sad Cat Sticker by MYAOWL.gif" },
    { text: "LAST CHANCE HAHAHAHA", image: "/images/Baby Meme GIF.gif" },
    { text: "PIDI YAN KASI", image: "/images/Sad Neon Genesis Evangelion Sticker by Castaways.gif" },
    { text: "PINDUTIN MO NALANG YUNG YES PLEASE", image: "/images/Sticker ねこ Sticker by Japan.gif" }
  ];

  const currentPhase = phases[Math.min(noCount, phases.length - 1)];
  const currentNoText = noButtonTexts[Math.min(noCount, noButtonTexts.length - 1)];

  const moveNoButtonRandomly = () => {
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
      left: `${randomX}px`,
      top: `${randomY}px`
    });
  };

  const handleNoClick = () => {
    setNoCount(prev => prev + 1);

    // activate floating mode AFTER first click
    setTimeout(() => {
      moveNoButtonRandomly();
    }, 50);
  };

  const getYesButtonSize = () => {
    return Math.min(16 + noCount * 8, 80);
  };

  return (
    <div className="main-container">
      {yesPressed ? (
        <div className="card fade-in">
          <img src="/images/lego batman GIF.gif" alt="Yes" className="main-image"/>
          <h1 className="title">YES?!</h1>
          <div className="emoji-text">💕💕💕</div>
          <img src="/images/Happy In Love Sticker by KIKI.gif" alt="Celebrate" className="main-image" style={{margin:"20px 0"}}/>
          <p className="subtitle">Yan ganyan dapat lang</p>
          <p className="subtitle-small">HAHAHAHAHA</p>
          <img src="/images/Cat Love GIF.gif" alt="Love" className="main-image"/>
        </div>
      ) : (
        <div className="card fade-in" key={noCount} ref={cardRef}>
          <div className="emoji-badge">{currentPhase.emoji}</div>

          <div className="image-wrapper">
            <img src={currentPhase.image} alt="Valentine" className="main-image"/>
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
              onClick={handleNoClick}
              style={
                noButtonPos
                  ? { position: "absolute", ...noButtonPos }
                  : { position: "relative" }
              }
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
          background: linear-gradient(135deg,#ffeaa7,#fab1a0,#fd79a8,#e17055,#d63031);
          display:flex;
          align-items:center;
          justify-content:center;
          padding:20px;
        }

        .card {
          position:relative;
          background:rgba(255,255,255,0.92);
          padding:40px;
          border-radius:30px;
          box-shadow:0 20px 50px rgba(0,0,0,0.15);
          text-align:center;
          max-width:500px;
          width:100%;
          display:flex;
          flex-direction:column;
          align-items:center;
        }

        .title { font-size:2rem; color:#be185d; margin:20px 0; font-weight:700; }

        .image-wrapper {
          width:100%;
          height:250px;
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .main-image {
          max-width:100%;
          max-height:250px;
          border-radius:16px;
          object-fit:contain;
        }

        .button-container {
          position:relative;
          display:flex;
          gap:15px;
          justify-content:center;
          margin-top:20px;
          width:100%;
          min-height:80px;
        }

        .btn {
          padding:12px 24px;
          border-radius:50px;
          border:none;
          cursor:pointer;
          font-weight:bold;
        }

        .yes-btn {
          background:linear-gradient(135deg,#22c55e,#16a34a);
          color:white;
        }

        .no-btn {
          background:linear-gradient(135deg,#ef4444,#dc2626);
          color:white;
          transition:all .25s ease;
          z-index:20;
        }
      `}</style>
    </div>
  );
}
