import React, { useState } from "react";
import styles from "./ValentineCard.module.css";
import { YES_BASE, YES_MAX, YES_STEP, phases } from "./valentineData";

export default function ValentineCard() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);

  const currentPhase = phases[Math.min(noCount, phases.length - 1)];
  const yesButtonSize = Math.min(YES_BASE + noCount * YES_STEP, YES_MAX);
  const noScale = Math.max(1 - noCount * 0.12, 0.45);
  const isNoAvailable = noCount < phases.length - 1;

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
  };

  return (
    <div className={styles.mainContainer}>
      {yesPressed ? (
        <div className={`${styles.card} ${styles.fadeIn}`}>
          <img src="/images/lego batman GIF.gif" alt="Yes" className={styles.mainImage} />
          <h1 className={styles.title}>YES?!</h1>
          <div className={styles.emojiText}>💕💕💕</div>
          <img
            src="/images/Happy In Love Sticker by KIKI.gif"
            alt="Celebrate"
            className={`${styles.mainImage} ${styles.celebrateImage}`}
          />
          <p className={styles.subtitle}>Yan ganyan dapat lang</p>
          <p className={styles.subtitleSmall}>HAHAHAHAHA</p>
          <img src="/images/Cat Love GIF.gif" alt="Love" className={styles.mainImage} />
          <audio
            className={styles.audioPlayer}
            controls
            autoPlay
            loop
            preload="metadata"
            aria-label="Celebration music player"
          >
            <source src="/audio/valentine-song.mp3" type="audio/mpeg" />
            Your browser does not support audio playback.
          </audio>
          <div className={styles.emojiRow}>🩷🩷🩷🩷🩷🩷🩷</div>
        </div>
      ) : (
        <div className={`${styles.card} ${styles.fadeIn}`}>
          <div className={styles.emojiBadge}>{currentPhase.emoji}</div>

          <div className={styles.imageWrapper}>
            <img src={currentPhase.image} alt="Valentine" className={styles.mainImage} />
          </div>

          <h1 className={styles.title}>{currentPhase.text}</h1>

          <div className={styles.buttonContainer}>
            <button
              className={`${styles.btn} ${styles.yesBtn}`}
              style={{ fontSize: `${yesButtonSize}px` }}
              onClick={() => setYesPressed(true)}
              aria-label="Accept the Valentine question"
              type="button"
            >
              ❤️ Yes
            </button>

            {isNoAvailable && (
              <button
                className={`${styles.btn} ${styles.noBtn}`}
                style={{ transform: `scale(${noScale})` }}
                onClick={handleNoClick}
                aria-label="Decline the Valentine question"
                type="button"
              >
                No
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
