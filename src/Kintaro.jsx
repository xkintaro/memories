import { useState, useEffect, useMemo, useRef } from 'react';
import { FaVolumeUp, FaVolumeMute, FaSnowflake } from 'react-icons/fa';
import bannerImage from '/background.webp';
import kintaroAudioFile from '/audio.mp3';
import './kintaro.css';
import KintaroSnowEffect from './KintaroSnowEffect';

function Kintaro() {
  const [kintaroIsPlaying, setKintaroIsPlaying] = useState(false);
  const [kintaroVolume, setKintaroVolume] = useState(0.5);
  const [kintaroIsVolumeVisible, setKintaroIsVolumeVisible] = useState(false);
  const [kintaroShowOverlay, setKintaroShowOverlay] = useState(true);
  const kintaroAudioRef = useRef(null);

  const [kintaroIsSnowActive, setKintaroIsSnowActive] = useState(true);
  const [kintaroSnowMessage, setKintaroSnowMessage] = useState(null);

  const fonts = [
    'Arial',
    'Verdana',
    '"Times New Roman"',
    '"Courier New"',
    'Georgia',
    'Impact',
    '"Comic Sans MS"',
    'Tahoma'
  ];

  const [fontFamily, setFontFamily] = useState(fonts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
      setFontFamily(randomFont);
    }, 100);
    return () => clearInterval(interval);
  }, []);


  const greetings = ["kintaro", "durden", "flawes", "luxury", "micsfo", "truvaq", "leywin", "starx", "caylak", "mistazt"];
  const [greeting, setGreeting] = useState(greetings[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      setGreeting(randomGreeting);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (kintaroIsPlaying) {
      kintaroAudioRef.current.play().catch((error) => {
        console.log('Ses çalınamadı:', error);
      });
    } else {
      kintaroAudioRef.current.pause();
    }
  }, [kintaroIsPlaying]);

  useEffect(() => {
    if (kintaroAudioRef.current) {
      kintaroAudioRef.current.volume = kintaroVolume;
    }
  }, [kintaroVolume]);

  const handleKintaroOverlayClick = () => {
    setKintaroShowOverlay(false);
    setKintaroIsPlaying(true);
  };

  const toggleKintaroMute = () => {
    setKintaroVolume(kintaroVolume === 0 ? 0.5 : 0);
  };

  const kintaroFriendList = [
    { name: 'kintaro', profileImage: './src/assets/users/1.webp' },
    { name: 'durden', profileImage: './src/assets/users/2.webp' },
    { name: 'flawes', profileImage: './src/assets/users/3.webp' },
    { name: 'luxury', profileImage: './src/assets/users/4.webp' },
    { name: 'micsfo', profileImage: './src/assets/users/5.webp' },
    { name: 'truvaq', profileImage: './src/assets/users/6.webp' },
    { name: 'leywin', profileImage: './src/assets/users/7.webp' },
    { name: 'starx', profileImage: './src/assets/users/8.webp' },
    { name: 'caylak', profileImage: './src/assets/users/9.webp' },
    { name: 'mistazt', profileImage: './src/assets/users/10.webp' },
  ];

  const [kintaroProfilesPerPage, setKintaroProfilesPerPage] = useState(5);
  const [kintaroCurrentIndex, setKintaroCurrentIndex] = useState(0);

  useEffect(() => {
    const kintaroHandleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setKintaroProfilesPerPage(5);
      else if (width >= 768) setKintaroProfilesPerPage(4);
      else setKintaroProfilesPerPage(3);
    };
    kintaroHandleResize();
    window.addEventListener('resize', kintaroHandleResize);
    return () => window.removeEventListener('resize', kintaroHandleResize);
  }, []);

  useEffect(() => {
    const kintaroInterval = setInterval(() => {
      setKintaroCurrentIndex(prevIndex => (prevIndex + kintaroProfilesPerPage) % kintaroFriendList.length);
    }, 5000);
    return () => clearInterval(kintaroInterval);
  }, [kintaroFriendList.length, kintaroProfilesPerPage]);

  const kintaroShuffledFriends = useMemo(() => {
    const shuffled = [...kintaroFriendList];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const kintaroGetCurrentFriends = () => {
    let currentFriends = kintaroShuffledFriends.slice(kintaroCurrentIndex, kintaroCurrentIndex + kintaroProfilesPerPage);
    if (currentFriends.length < kintaroProfilesPerPage) {
      currentFriends = currentFriends.concat(kintaroShuffledFriends.slice(0, kintaroProfilesPerPage - currentFriends.length));
    }
    return currentFriends;
  };

  const kintaroCurrentFriends = kintaroGetCurrentFriends();

  const kintaroPubgImages = import.meta.glob('./assets/memories/pubg/*.webp', { eager: true });
  const kintaroMinecraftImages = import.meta.glob('./assets/memories/minecraft/*.webp', { eager: true });
  const kintaroEtsImages = import.meta.glob('./assets/memories/ets/*.webp', { eager: true });
  const kintaroLolImages = import.meta.glob('./assets/memories/lol/*.webp', { eager: true });
  const kintaroRobloxImages = import.meta.glob('./assets/memories/roblox/*.webp', { eager: true });
  const kintaroWrImages = import.meta.glob('./assets/memories/wr/*.webp', { eager: true });

  const kintaroPubgList = Object.values(kintaroPubgImages).map(mod => ({
    src: mod.default,
    category: 'PUBG',
  }));

  const kintaroMinecraftList = Object.values(kintaroMinecraftImages).map(mod => ({
    src: mod.default,
    category: 'Minecraft',
  }));

  const kintaroEtsList = Object.values(kintaroEtsImages).map(mod => ({
    src: mod.default,
    category: 'Ets',
  }));

  const kintaroLolList = Object.values(kintaroLolImages).map(mod => ({
    src: mod.default,
    category: 'League of Legends',
  }));

  const kintaroRobloxList = Object.values(kintaroRobloxImages).map(mod => ({
    src: mod.default,
    category: 'Roblox',
  }));

  const kintaroWrList = Object.values(kintaroWrImages).map(mod => ({
    src: mod.default,
    category: 'Wild Rift',
  }));

  const kintaroAllImages = [...kintaroPubgList, ...kintaroMinecraftList, ...kintaroEtsList, ...kintaroLolList, ...kintaroRobloxList, ...kintaroWrList];

  const [kintaroRandomAllImages] = useState(() => {
    let arr = [...kintaroAllImages];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [kintaroAllImages]);

  const [kintaroCategory, setKintaroCategory] = useState('Tümü');
  const kintaroFilteredImages = kintaroCategory === 'Tümü' ? kintaroRandomAllImages : kintaroAllImages.filter(img => img.category === kintaroCategory);

  const [kintaroModalImage, setKintaroModalImage] = useState(null);
  const kintaroOpenModal = (imgSrc) => setKintaroModalImage(imgSrc);
  const kintaroCloseModal = () => setKintaroModalImage(null);


  const toggleKintaroSnow = () => {
    const newSnowState = !kintaroIsSnowActive;
    setKintaroIsSnowActive(newSnowState);

    setKintaroSnowMessage(newSnowState ? 'Kar açıldı' : 'Kar kapatıldı');

    setTimeout(() => {
      setKintaroSnowMessage(null);
    }, 2000);
  };

  return (
    <div className="kintaro-page">
      {kintaroShowOverlay && (
        <div className="kintaro-overlay" onClick={handleKintaroOverlayClick}>
          <div className="kintaro-overlay-text">click to enter...</div>
        </div>
      )}

      {!kintaroShowOverlay && (
        <div className="kintaro-controls">
          <div
            className="kintaro-music-controls"
            onMouseEnter={() => setKintaroIsVolumeVisible(true)}
            onMouseLeave={() => setKintaroIsVolumeVisible(false)}
          >
            <div className="kintaro-volume-icon" onClick={toggleKintaroMute}>
              {kintaroVolume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
            </div>
            <div className={`kintaro-volume-slider-container ${kintaroIsVolumeVisible ? 'visible' : ''}`}>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={kintaroVolume}
                onChange={(e) => setKintaroVolume(parseFloat(e.target.value))}
                className="kintaro-volume-slider"
              />
            </div>
          </div>
          <div className="kintaro-snow-controls" onClick={toggleKintaroSnow}>
            <div className="kintaro-snow-icon">
              <FaSnowflake />
            </div>
          </div>
        </div>
      )}

      <audio ref={kintaroAudioRef} src={kintaroAudioFile} loop />

      <div className="kintaro-banner" style={{ backgroundImage: `url(${bannerImage})` }}>
        <div className="kintaro-banner-overlay"></div>
        <div className="kintaro-banner-content">
          <h2 className="kintaro-glow-text" style={{ fontFamily }}>{greeting}</h2>
          <i>-deep devlet-</i>
        </div>
      </div>

      <div className="kintaro-friends-slider">
        {kintaroCurrentFriends.map((friend, idx) => (
          <div key={idx} className="kintaro-friend-profile">
            <img src={friend.profileImage} alt={friend.name} />
            <p>{friend.name}</p>
          </div>
        ))}
      </div>

      <div className="kintaro-gallery-section">
        <div className="kintaro-gallery-menu">
          {['Tümü', 'PUBG', 'Minecraft', 'Ets', 'League of Legends', 'Roblox', 'Wild Rift'].map(cat => {
            const count = cat === 'Tümü' ? kintaroAllImages.length : kintaroAllImages.filter(img => img.category === cat).length;
            return (
              <button
                key={cat}
                className={cat === kintaroCategory ? 'active' : ''}
                onClick={() => setKintaroCategory(cat)}
              >
                {`${cat} - ${count}`}
              </button>
            );
          })}
        </div>
        <div className="kintaro-gallery-images">
          {kintaroFilteredImages.map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt={`memory-${index}`}
              onClick={() => kintaroOpenModal(img.src)}
            />
          ))}
        </div>
      </div>

      {kintaroModalImage && (
        <div className="kintaro-modal-overlay" onClick={kintaroCloseModal}>
          <div className="kintaro-modal-content" onClick={e => e.stopPropagation()}>
            <button className="kintaro-modal-close" onClick={kintaroCloseModal}>&times;</button>
            <img src={kintaroModalImage} alt="Enlarged" />
          </div>
        </div>
      )}
      {kintaroIsSnowActive && <KintaroSnowEffect />}

      {kintaroSnowMessage && (
        <div className="kintaro-snow-message">
          {kintaroSnowMessage}
        </div>
      )}
    </div>
  );
}

export default Kintaro;