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
import style from './BookReader.module.css';

const BookReader = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [sentences, setSentences] = useState([]);
  const isPlayingRef = useRef(false);

  // Settings
  const [settings, setSettings] = useState({
    rate: 1.0,
    volume: 1.0,
    fontSize: 18
  });

  // Load book
  useEffect(() => {
    const foundBook = booksData.books.find(b => b.id === parseInt(bookId));
    if (foundBook) {
      setBook(foundBook);
      
      // Combine all chapters into one continuous text
      const fullText = foundBook.chapters.map(chapter => chapter.text).join(' ');
      
      // Split into sentences
      const sentenceArray = fullText.match(/[^\.!?]+[\.!?]+/g) || [fullText];
      setSentences(sentenceArray.map(s => s.trim()));
      setCurrentSentence(0);
      
      console.log(`📚 Loaded ${sentenceArray.length} sentences`);
    } else {
      toast.error('Book not found');
      navigate('/books');
    }
  }, [bookId, navigate]);

  // Speak sentence
  const speakSentence = (index) => {
    if (!sentences[index] || !isPlayingRef.current) return;

    console.log(`🔊 Speaking sentence ${index + 1}/${sentences.length}`);
    speechSynthesis.cancel();

    setTimeout(() => {
      if (!isPlayingRef.current) return;

      const utterance = new SpeechSynthesisUtterance(sentences[index]);
      utterance.rate = settings.rate;
      utterance.volume = settings.volume;

      utterance.onstart = () => {
        console.log(`✅ Started sentence ${index + 1}`);
      };

      utterance.onend = () => {
        console.log(`🏁 Finished sentence ${index + 1}`);
        
        // Auto continue
        if (isPlayingRef.current && index < sentences.length - 1) {
          setTimeout(() => {
            if (isPlayingRef.current) {
              setCurrentSentence(index + 1);
              speakSentence(index + 1);
            }
          }, 200);
        } else {
          setIsPlaying(false);
          isPlayingRef.current = false;
          toast.success('Reading completed! 🎉');
        }
      };

      utterance.onerror = (event) => {
        if (event.error !== 'canceled') {
          console.log('Speech error:', event.error);
        }
      };

      speechSynthesis.speak(utterance);
    }, 100);
  };

  // Controls
  const play = () => {
    if (sentences.length === 0) return;
    setIsPlaying(true);
    isPlayingRef.current = true;
    speakSentence(currentSentence);
  };

  const stop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    isPlayingRef.current = false;
    setCurrentSentence(0);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  };

  // Auto scroll
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
        <p>Loading book...</p>
      </div>
    );
  }

  return (
    <div className={style.container}>
      {/* Header */}
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
            Sentence {currentSentence + 1} of {sentences.length}
          </p>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div 
        className={style.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div 
          className={style.textContainer}
          style={{ fontSize: `${settings.fontSize}px` }}
        >
          {sentences.map((sentence, index) => {
            const isCurrentSentence = index === currentSentence;
            const isReadSentence = index < currentSentence;
            
            return (
              <span
                key={index}
                data-sentence={index}
                className={`${style.sentence} ${
                  isCurrentSentence ? style.currentSentence : ''
                } ${isReadSentence ? style.readSentence : ''}`}
                onClick={() => {
                  setCurrentSentence(index);
                  if (isPlaying) {
                    speakSentence(index);
                  }
                }}
              >
                {sentence}{' '}
              </span>
            );
          })}
        </div>
      </motion.div>

      {/* Controls */}
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
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.rate}
              onChange={(e) => setSettings(prev => ({ ...prev, rate: parseFloat(e.target.value) }))}
            />
            <span>{settings.rate}x</span>
          </div>

          <div className={style.settingGroup}>
            <MdVolumeUp />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.volume}
              onChange={(e) => setSettings(prev => ({ ...prev, volume: parseFloat(e.target.value) }))}
            />
          </div>

          <div className={style.settingGroup}>
            <span>Font</span>
            <input
              type="range"
              min="14"
              max="28"
              step="2"
              value={settings.fontSize}
              onChange={(e) => setSettings(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
            />
            <span>{settings.fontSize}px</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookReader;
