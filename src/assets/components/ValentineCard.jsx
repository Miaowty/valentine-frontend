import React, { useState } from 'react';

export default function ValentineCard() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ top: null, left: null });

  // 1. Array for the "No" button messages specifically
  const noButtonTexts = [
    "No",
    "Wag mo kasi pindutin to kitde",
    "Sure naba yan?",
    "Hala sige subukan mo...",
    "Sinubukan nga",
    "YES NA KASI",
    "AYAW MO BA?",
    "PLEASEEEE"
  ];

  const phases = [
    { 
      text: "Will you be my Valentine?", 
      image: "/images/Cutesy cat.jpg",
      font: "'Pacifico', cursive"
    },
    { 
      text: "Sure naba yan?🥺", 
      image: "/images/Peach and Goma.gif",
      font: "'Pacifico', cursive" 
    },
    { 
      text: "Talaga Ba? 😰", 
      image: "/images/Bubu Dudu.gif",
      font: "'Pacifico', cursive" 
    },
    { 
      text: "Think again... 😤", 
      image: "/images/Bubu Dudu Angry.gif",
      font: "'Pacifico', cursive" 
    },
    { 
      text: "LALAGYAN KITA NG MALWARE PAG UMAYAW KAPA 🙏", 
      image: "/images/Peach and Goma.gif",
      font: "'Pacifico', cursive" 
    },
    { 
      text: "LAST CHANCE HAHAHAHA (PINDUTIN MO NA LANG KASI YUNG YES)", 
      image: "/images/Bubu Dudu.gif",
      font: "'Pacifico', cursive" 
    },
    { 
      text: "Final Warning!! ⚠️", // Added text here so it's not empty
      image: "/images/Bubu Dudu.gif",
      font: "'Pacifico', cursive" 
    }
  ];

  const currentPhase = phases[Math.min(noCount, phases.length - 1)];
  const yesButtonSize = noCount * 25 + 18;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    const randomTop = Math.floor(Math.random() * 70) + 15;
    const randomLeft = Math.floor(Math.random() * 70) + 15;
    setNoButtonPos({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  if (yesPressed) {
    return (
      <div style={{ ...containerStyle, overflowY: 'auto', display: 'block', padding: '40px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src="/images/lego batman GIF.gif" alt="Yes" style={responsiveImageStyle} />
          <h1 style={{...successTextStyle}}>YES?!</h1>
          <img src="/images/Happy In Love Sticker by KIKI.gif" alt="Celebrate" style={responsiveImageStyle} />
          <h1 style={{...successTextStyle}}>Yan ganyan dapat lang HAHAHAHAHA</h1>
          <img src="/images/Cat Love GIF.gif" alt="Love" style={{ ...responsiveImageStyle, marginTop: '20px' }} />
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <img style={responsiveImageStyle} src={currentPhase.image} alt="Valentine Phase" />
      
      {/* Updated: Added fontFamily to headerStyle here */}
      <h1 style={{...headerStyle, fontFamily: currentPhase.font || 'inherit'}}>
        {currentPhase.text}
      </h1>
      
      <div style={buttonGroupStyle}>
        <button
          style={{ ...yesButtonStyle, fontSize: `${Math.min(yesButtonSize, 200)}px` }}
          onClick={() => setYesPressed(true)}
        >
          Yes
        </button>
        
        <button
          onClick={handleNoClick}
          style={{
            ...noButtonStyle,
            position: noButtonPos.top ? 'fixed' : 'relative',
            top: noButtonPos.top,
            left: noButtonPos.left,
            transition: 'all 0.2s ease',
          }}
        >
          {/* Pick text from the noButtonTexts array based on noCount */}
          {noButtonTexts[Math.min(noCount, noButtonTexts.length - 1)]}
        </button>
      </div>
    </div>
  );
}

// ... rest of your styles stay the same ...
const containerStyle = {
  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  width: '100vw', height: '100vh', backgroundColor: 'rgb(246, 175, 175)', textAlign: 'center', padding: '20px', overflow: 'hidden',
};

const responsiveImageStyle = {
  width: '90%', maxWidth: '300px', height: '250px', objectFit: 'contain', borderRadius: '20px', marginBottom: '20px',
};

const headerStyle = {
  fontSize: 'clamp(1.5rem, 8vw, 2.5rem)', color: '#e11d48', margin: '10px 0 30px 0',
};

const successTextStyle = {
  fontSize: 'clamp(2rem, 10vw, 3.5rem)', color: '#e11d48',
};

const buttonGroupStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', width: '100%', minHeight: '150px',
};

const yesButtonStyle = {
  backgroundColor: '#22c55e', color: 'white', fontWeight: 'bold', padding: '12px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer', zIndex: 10,
};

const noButtonStyle = {
  backgroundColor: '#ef4444', color: 'white', fontWeight: 'bold', padding: '12px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer', zIndex: 10,
};