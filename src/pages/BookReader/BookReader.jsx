import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  MdArrowBack, 
  MdPlayArrow, 
  MdPause, 
  MdStop,
  MdVolumeUp,
  MdSpeed 
} from 'react-icons/md';
import booksData from '../../data/books.json';
import { useUser } from '../../contexts/UserContext';
import style from './BookReader.module.css';

const BookReader = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { preferences } = useUser();
  
  const [book, setBook] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [sentences, setSentences] = useState([]);
  const [voices, setVoices] = useState([]);
  
  const isPlayingRef = useRef(false);
  const speechRef = useRef(null);
  const timeoutRef = useRef(null);

  // TTS Settings
  const [ttsSettings, setTtsSettings] = useState({
    rate: 1.0,
    volume: 1.0,
    pitch: 1.0,
    voiceGender: 'neutral',
    fontSize: 18,
    fontFamily: 'Inter',
    highlightColor: '#6366f1',
    sentencePause: 200
  });

  // Preferences update
  useEffect(() => {
    if (preferences) {
      console.log('🔄 Preferences changed!', preferences);
      const newSettings = {
        rate: preferences.speechRate || preferences.playbackSpeed || 1.0,
        volume: preferences.speechVolume || 1.0,
        pitch: preferences.speechPitch || 1.0,
        voiceGender: preferences.voiceGender || 'neutral',
        fontSize: preferences.fontSize === 'small' ? 16 : 
                  preferences.fontSize === 'medium' ? 18 :
                  preferences.fontSize === 'large' ? 22 :
                  preferences.fontSize === 'xl' ? 26 : 18,
        fontFamily: preferences.fontFamily || 'Inter',
        highlightColor: preferences.highlightColor || '#6366f1',
        sentencePause: preferences.sentencePause || 200
      };
      console.log('✅ Settings updated:', newSettings);
      setTtsSettings(newSettings);
    }
  }, [preferences]);

  // Cleanup
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
      isPlayingRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Load book
  useEffect(() => {
    const foundBook = booksData.books.find(b => b.id === parseInt(bookId));
    if (foundBook) {
      setBook(foundBook);
      const fullText = foundBook.chapters.map(chapter => chapter.text).join(' ');
      const sentenceArray = fullText.match(/[^\.!?]+[\.!?]+/g) || [fullText];
      setSentences(sentenceArray.map(s => s.trim()));
      setCurrentSentence(0);
      console.log(`📚 ${sentenceArray.length} sentences loaded`);
    } else {
      toast.error('Book not found');
      navigate('/books');
    }
  }, [bookId, navigate]);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      console.log(`🎤 ${availableVoices.length} voices loaded`);
      console.log('Available voices:', availableVoices.map(v => `${v.name} (${v.lang})`));
    };
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
    setTimeout(loadVoices, 1000);
  }, []);

  // Voice selection
  const selectVoice = () => {
    if (voices.length === 0) return null;
    
    const { voiceGender } = ttsSettings;
    let selectedVoice = null;
    
    console.log(`🎤 Searching ${voiceGender} voice...`);
    
    if (voiceGender === 'male') {
      selectedVoice = voices.find(v => 
        v.name.toLowerCase().includes('alex') ||
        v.name.toLowerCase().includes('daniel') ||
        v.name.toLowerCase().includes('david') ||
        v.name.toLowerCase().includes('fred') ||
        v.name.toLowerCase().includes('male')
      );
    } else if (voiceGender === 'female') {
      selectedVoice = voices.find(v => 
        v.name.toLowerCase().includes('samantha') ||
        v.name.toLowerCase().includes('victoria') ||
        v.name.toLowerCase().includes('susan') ||
        v.name.toLowerCase().includes('elena') ||
        v.name.toLowerCase().includes('female')
      );
    }
    
    const finalVoice = selectedVoice || voices.find(v => v.lang.startsWith('en')) || voices[0];
    console.log(`✅ Selected: ${finalVoice?.name} for ${voiceGender}`);
    return finalVoice;
  };

  // TTS with auto-continue
  const speakSentence = (index) => {
    if (!sentences[index] || !isPlayingRef.current) return;

    console.log(`🔊 Speaking sentence ${index + 1}/${sentences.length}`);
    speechSynthesis.cancel();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setTimeout(() => {
      if (!isPlayingRef.current) return;

      const utterance = new SpeechSynthesisUtterance(sentences[index]);
      const selectedVoice = selectVoice();
      
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.rate = ttsSettings.rate;
      utterance.volume = ttsSettings.volume;
      utterance.pitch = ttsSettings.pitch;

      let hasEnded = false;

      utterance.onstart = () => {
        console.log(`✅ Started sentence ${index + 1}`);
      };

      utterance.onend = () => {
        if (hasEnded) return;
        hasEnded = true;
        console.log(`🏁 Finished sentence ${index + 1}`);
        
        if (isPlayingRef.current && index < sentences.length - 1) {
          console.log(`➡️ Continuing to sentence ${index + 2}`);
          timeoutRef.current = setTimeout(() => {
            if (isPlayingRef.current) {
              setCurrentSentence(index + 1);
              speakSentence(index + 1);
            }
          }, ttsSettings.sentencePause || 200);
        } else if (index >= sentences.length - 1) {
          setIsPlaying(false);
          isPlayingRef.current = false;
          toast.success('Reading completed! 🎉');
        }
      };

      utterance.onerror = (event) => {
        console.error(`❌ TTS Error:`, event.error);
        if (event.error !== 'canceled' && isPlayingRef.current && !hasEnded) {
          hasEnded = true;
          timeoutRef.current = setTimeout(() => {
            if (isPlayingRef.current && index < sentences.length - 1) {
              setCurrentSentence(index + 1);
              speakSentence(index + 1);
            }
          }, 500);
        }
      };

      speechRef.current = utterance;
      speechSynthesis.speak(utterance);
    }, 100);
  };

  const play = () => {
    if (sentences.length === 0) return;
    console.log('▶️ Starting reading');
    setIsPlaying(true);
    isPlayingRef.current = true;
    speakSentence(currentSentence);
  };

  const stop = () => {
    console.log('⏹️ Stopping reading');
    speechSynthesis.cancel();
    setIsPlaying(false);
    isPlayingRef.current = false;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrentSentence(0);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  };

  useEffect(() => {
    const currentElement = document.querySelector(`[data-sentence="${currentSentence}"]`);
    if (currentElement) {
      currentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentSentence]);

  if (!book) {
    return (
      <div className={style.loading}>
        <div className={style.loadingSpinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <motion.div 
        className={style.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button 
          className={style.backBtn}
          onClick={() => navigate(`/books/${bookId}`)}
        >
          <MdArrowBack />
        </button>
        <div className={style.bookInfo}>
          <h2 className={style.bookTitle}>{book.title}</h2>
          <p className={style.progress}>
            Sentence {currentSentence + 1} / {sentences.length}
          </p>
        </div>
      </motion.div>

      <motion.div 
        className={style.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          '--current-highlight-color': ttsSettings.highlightColor,
          '--current-highlight-color-shadow': `${ttsSettings.highlightColor}66`, // 40% opacity
          '--current-font-size': `${ttsSettings.fontSize}px`,
          '--current-font-family': ttsSettings.fontFamily
        }}
      >
        <div 
          className={style.textContainer}
          style={{ 
            fontSize: `${ttsSettings.fontSize}px`,
            fontFamily: ttsSettings.fontFamily,
            lineHeight: '1.6'
          }}
        >
          {sentences.map((sentence, index) => {
            const isCurrentSentence = index === currentSentence;
            
            return (
              <span
                key={`sentence-${index}`}
                data-sentence={index}
                className={style.sentence}
                onClick={() => {
                  console.log(`📍 Clicked sentence ${index + 1}`);
                  setCurrentSentence(index);
                  
                  if (isPlaying && isPlayingRef.current) {
                    speechSynthesis.cancel();
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    setTimeout(() => {
                      if (isPlayingRef.current) {
                        speakSentence(index);
                      }
                    }, 100);
                  }
                }}
                style={{
                  backgroundColor: isCurrentSentence ? ttsSettings.highlightColor : 'transparent',
                  color: isCurrentSentence ? '#ffffff' : 'inherit',
                  fontWeight: isCurrentSentence ? '700' : 'normal',
                  padding: isCurrentSentence ? '0.4rem 0.6rem' : '0.1rem 0.2rem',
                  borderRadius: isCurrentSentence ? '8px' : '4px',
                  margin: '0.1rem',
                  display: 'inline-block',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isCurrentSentence ? `0 4px 12px ${ttsSettings.highlightColor}80` : 'none',
                  transform: isCurrentSentence ? 'scale(1.02)' : 'scale(1)',
                  animation: isCurrentSentence ? 'pulse 2s infinite' : 'none'
                }}
              >
                {sentence}{' '}
              </span>
            );
          })}
        </div>
      </motion.div>

      <motion.div 
        className={style.audioControls}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className={style.mainControls}>
          <button 
            className={`${style.playBtn} ${isPlaying ? style.playing : ''}`}
            onClick={togglePlayPause}
          >
            {isPlaying ? <MdPause /> : <MdPlayArrow />}
          </button>
          <button className={style.controlBtn} onClick={stop}>
            <MdStop />
          </button>
        </div>

        <div className={style.settingsRow}>
          <div className={style.settingGroup}>
            <MdSpeed />
            <span>Speed: {ttsSettings.rate}x</span>
          </div>
          <div className={style.settingGroup}>
            <MdVolumeUp />
            <span>Volume: {Math.round(ttsSettings.volume * 100)}%</span>
          </div>
          <div className={style.settingGroup}>
            <span>Font: {ttsSettings.fontSize}px</span>
          </div>
          <div className={style.settingGroup}>
            <span>Family: {ttsSettings.fontFamily}</span>
          </div>
          <div className={style.settingGroup}>
            <span>Voice: {ttsSettings.voiceGender}</span>
          </div>
          <div className={style.settingGroup}>
            <span style={{ 
              backgroundColor: ttsSettings.highlightColor, 
              color: 'white', 
              padding: '2px 6px', 
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              Color
            </span>
          </div>
        </div>

        <div className={style.preferencesNote}>
          <small>💡 Change settings in Profile → Preferences</small>
        </div>
      </motion.div>
    </div>
  );
};

export default BookReader; 