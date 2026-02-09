import React, { useState } from 'react';

export default function ValentineCard() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState(null); // null = default position

  // --- YOUR ORIGINAL DATA ---
  const noButtonTexts = [
    "No"
  ];

  const phases = [
    { 
      text: "Will you be my Valentine?", 
      image: "/images/Cutesy cat.jpg",
      emoji: "💌"
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
      text: "Luh pinindot nga", 
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
    }
  ];

  const currentPhase = phases[Math.min(noCount, phases.length - 1)];
  const currentNoText = noButtonTexts[Math.min(noCount, noButtonTexts.length - 1)];

  // --- LOGIC WITH SAFE MARGIN ---
  const handleNoClick = (e) => {
    // Increment the attempt counter
    setNoCount(prev => prev + 1);

    // --- SAFE MARGIN LOGIC ---
    // We define a 15% margin on all sides so it stays in the middle 70% of screen
    const buttonWidth = 150; 
    const buttonHeight = 50; 

    // Calculate the Safe Zone boundaries
    const minX = window.innerWidth * 0.15; // Start 15% from left
    const maxX = (window.innerWidth * 0.85) - buttonWidth; // End 15% from right
    
    const minY = window.innerHeight * 0.15; // Start 15% from top
    const maxY = (window.innerHeight * 0.85) - buttonHeight; // End 15% from bottom

    // Generate random coordinates within the Safe Zone
    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    setNoButtonPos({
      position: 'fixed', // Breaks flow to move freely
      left: `${randomX}px`,
      top: `${randomY}px`,
    });
  };

  const getYesButtonSize = () => {
    return Math.min(16 + noCount * 8, 80); // Base 16px, grows by 8px, caps at 80px
  };

  return (
    <div className="main-container">
      {yesPressed ? (
        // SUCCESS SCREEN
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
            style={{ margin: '20px 0' }}
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
        // QUESTION SCREEN
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
              onClick={handleNoClick} // Only moves on click
            >
              {currentNoText}
            </button>
          </div>
          
        </div>
      )}

      {/* --- STYLES --- */}
      <style jsx>{`
        /* Original Gradient Background */
        .main-container {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 25%, #fd79a8 50%, #e17055 75%, #d63031 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .card {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(10px);
          padding: 40px;
          border-radius: 30px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
          text-align: center;
          max-width: 500px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.3s ease;
          position: relative;
          z-index: 10;
        }

        /* Animations: Only In and Out */
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.95) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .fade-in {
          animation: popIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        /* Typography */
        .title {
          font-size: 2rem;
          color: #be185d;
          margin: 20px 0;
          line-height: 1.3;
          font-weight: 700;
        }

        .subtitle {
          font-size: 1.5rem;
          color: #be185d;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .subtitle-small {
          font-size: 1.2rem;
          color: #9d174d;
          margin-bottom: 20px;
        }

        .footer-text {
          margin-top: 20px;
          color: #9d174d;
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .emoji-badge {
          font-size: 3rem;
          margin-bottom: 10px;
        }

        .emoji-text {
          font-size: 2rem;
          margin: 10px 0;
        }
        
        .emoji-row {
          font-size: 1.5rem;
          margin-top: 20px;
          letter-spacing: 5px;
        }

        /* Images */
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
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          object-fit: contain;
        }

        /* Buttons */
        .button-container {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
          align-items: center;
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
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          white-space: nowrap;
        }

        /* Original Green Gradient */
        .yes-btn {
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
        }
        
        .yes-btn:hover {
          transform: scale(1.05);
        }

        /* Original Red Gradient */
        .no-btn {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
          z-index: 9999;
          transition: all 0.3s ease; /* Smooth movement when clicked */
        }
      `}</style>
    </div>
  );
}
