import React, { useState, useRef } from "react";

export default function ValentineCard() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState(null);
  const [shake, setShake] = useState(false);

  const cardRef = useRef(null);

  const phases = [
    { text: "Will you be my Valentine?", image: "/images/Cutesy cat.jpg", emoji: "💌" },
    { text: "What u mean no??", image: "/images/Sad Hamster Sticker.gif" },
    { text: "Subukan mo pindutin yang no na yan", image: "/images/Sad Face Sticker.gif" },
    { text: "Yes na kasiiiii", image: "/images/Sad Cat Sticker by Capoo.gif" },
    { text: "LAST CHANCE HAHAHAHA", image: "/images/Baby Meme GIF.gif" },
    { text: "PIDI YAN KASI", image: "/images/Sad Neon Genesis Evangelion Sticker.gif" },
    { text: "PINDUTIN MO NALANG YUNG YES PLEASE", image: "/images/Sticker ねこ Sticker.gif" }
  ];

  const currentPhase = phases[Math.min(noCount, phases.length - 1)];

  // Moves No button safely inside the card
  const moveNoButton = () => {
    if (!cardRef.current) return;

    const cardRect = cardRef.current.getBoundingClientRect();
    const padding = 20;
    const btnWidth = 120; // approximate width of button
    const btnHeight = 50;

    const maxX = cardRect.width - btnWidth - padding;
    const maxY = cardRect.height - btnHeight - padding;

    const minX = padding;
    const minY = padding;

    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    setNoButtonPos({
      left: `${randomX}px`,
      top: `${randomY}px`,
      transition: "all 0.25s ease"
    });
  };

  const handleNoClick = () => {
    setNoCount(prev => prev + 1);

    setShake(true);
    setTimeout(() => setShake(false), 300);

    setTimeout(moveNoButton, 50);
  };

  const getYesSize = () => Math.min(16 + noCount * 8, 80);

  return (
    <div className="main-container">
      {yesPressed ? (
        <div className="card fade-in">
          <h1 className="title">YES?! 💕</h1>
          <img src="/images/Cat Love GIF.gif" className="main-image"/>
        </div>
      ) : (
        <div className="card fade-in" ref={cardRef}>
          <div className="emoji-badge">{currentPhase.emoji}</div>

          <div className="image-wrapper">
            <img src={currentPhase.image} className="main-image"/>
          </div>

          <h1 className="title">{currentPhase.text}</h1>

          <div className="button-container">
            <button
              className="btn yes-btn"
              style={{ fontSize: `${getYesSize()}px` }}
              onClick={() => setYesPressed(true)}
            >
              ❤️ Yes
            </button>

            <button
              className={`btn no-btn ${shake ? "shake" : ""}`}
              onClick={handleNoClick}
              style={
                noButtonPos
                  ? { position: "absolute", ...noButtonPos }
                  : { position: "relative" }
              }
            >
              No
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .main-container{
          min-height:100vh;
          display:flex;
          align-items:center;
          justify-content:center;
          background:linear-gradient(135deg,#ffeaa7,#fab1a0,#fd79a8,#e17055,#d63031);
        }

        .card{
          position:relative;
          background:white;
          padding:40px;
          border-radius:30px;
          text-align:center;
          width:420px;
        }

        .button-container{
          position:relative;
          display:flex;
          gap:15px;
          justify-content:center;
          min-height:80px;
        }

        .btn{
          padding:12px 24px;
          border:none;
          border-radius:50px;
          cursor:pointer;
          font-weight:bold;
        }

        .yes-btn{
          background:#22c55e;
          color:white;
          transition:.2s;
        }

        .yes-btn:hover{ transform:scale(1.08); }

        .no-btn{
          background:#ef4444;
          color:white;
          transition:all .25s ease;
          z-index:20;
        }

        .shake{
          animation:shake .3s;
        }

        @keyframes shake{
          0%{transform:translateX(0)}
          25%{transform:translateX(-5px)}
          50%{transform:translateX(5px)}
          75%{transform:translateX(-5px)}
          100%{transform:translateX(0)}
        }
      `}</style>
    </div>
  );
}
