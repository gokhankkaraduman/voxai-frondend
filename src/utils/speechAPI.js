// Web Speech API Utility Service
// This service provides a structured way to handle text-to-speech functionality

class SpeechService {
  constructor() {
    this.synthesis = window.speechSynthesis;
    this.currentUtterance = null;
    this.isSupported = 'speechSynthesis' in window;
    this.voices = [];
    this.defaultSettings = {
      rate: 1.0,        // Speech rate (0.1 to 10)
      pitch: 1.0,       // Speech pitch (0 to 2)
      volume: 1.0,      // Speech volume (0 to 1)
      voice: null,      // Selected voice
      lang: 'en-US'     // Language
    };
    
    this.loadVoices();
    
    // Load voices when they become available
    if (this.synthesis.onvoiceschanged !== undefined) {
      this.synthesis.onvoiceschanged = () => this.loadVoices();
    }
  }

  // Check if Web Speech API is supported
  isSupported() {
    return this.isSupported;
  }

  // Load available voices
  loadVoices() {
    this.voices = this.synthesis.getVoices();
    return this.voices;
  }

  // Get available voices
  getVoices() {
    return this.voices.length > 0 ? this.voices : this.loadVoices();
  }

  // Get voices filtered by language
  getVoicesByLanguage(lang = 'en') {
    return this.getVoices().filter(voice => 
      voice.lang.toLowerCase().startsWith(lang.toLowerCase())
    );
  }

  // Get recommended voice for the language
  getRecommendedVoice(lang = 'en-US') {
    const voices = this.getVoices();
    
    // Try to find Google voices first (usually better quality)
    let voice = voices.find(v => 
      v.lang === lang && v.name.toLowerCase().includes('google')
    );
    
    // Fallback to any voice with the same language
    if (!voice) {
      voice = voices.find(v => v.lang === lang);
    }
    
    // Fallback to any voice with the same language prefix
    if (!voice) {
      voice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
    }
    
    // Last fallback to first available voice
    if (!voice && voices.length > 0) {
      voice = voices[0];
    }
    
    return voice;
  }

  // Create and configure utterance
  createUtterance(text, settings = {}) {
    if (!this.isSupported) {
      throw new Error('Web Speech API is not supported in this browser');
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const config = { ...this.defaultSettings, ...settings };

    utterance.rate = config.rate;
    utterance.pitch = config.pitch;
    utterance.volume = config.volume;
    utterance.lang = config.lang;

    if (config.voice) {
      utterance.voice = config.voice;
    } else {
      utterance.voice = this.getRecommendedVoice(config.lang);
    }

    return utterance;
  }

  // Speak text with given settings
  speak(text, settings = {}) {
    return new Promise((resolve, reject) => {
      try {
        // Stop any current speech
        this.stop();

        const utterance = this.createUtterance(text, settings);
        this.currentUtterance = utterance;

        utterance.onstart = () => {
          console.log('Speech started');
        };

        utterance.onend = () => {
          console.log('Speech ended');
          this.currentUtterance = null;
          resolve();
        };

        utterance.onerror = (event) => {
          console.error('Speech error:', event);
          this.currentUtterance = null;
          reject(event);
        };

        utterance.onpause = () => {
          console.log('Speech paused');
        };

        utterance.onresume = () => {
          console.log('Speech resumed');
        };

        this.synthesis.speak(utterance);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Speak text with sentence-by-sentence callback
  speakWithCallback(text, settings = {}, onSentenceStart = null, onSentenceEnd = null) {
    return new Promise((resolve, reject) => {
      try {
        // Split text into sentences
        const sentences = this.splitIntoSentences(text);
        let currentIndex = 0;

        const speakNextSentence = () => {
          if (currentIndex >= sentences.length) {
            resolve();
            return;
          }

          const sentence = sentences[currentIndex];
          if (onSentenceStart) {
            onSentenceStart(currentIndex, sentence);
          }

          const utterance = this.createUtterance(sentence, settings);
          this.currentUtterance = utterance;

          utterance.onend = () => {
            if (onSentenceEnd) {
              onSentenceEnd(currentIndex, sentence);
            }
            currentIndex++;
            setTimeout(speakNextSentence, 100); // Small delay between sentences
          };

          utterance.onerror = (event) => {
            console.error('Speech error:', event);
            reject(event);
          };

          this.synthesis.speak(utterance);
        };

        speakNextSentence();
      } catch (error) {
        reject(error);
      }
    });
  }

  // Split text into sentences
  splitIntoSentences(text) {
    // Improved sentence splitting regex
    const sentences = text.match(/[^\.!?]+[\.!?]+/g) || [text];
    return sentences.map(sentence => sentence.trim()).filter(sentence => sentence.length > 0);
  }

  // Pause current speech
  pause() {
    if (this.synthesis.speaking && !this.synthesis.paused) {
      this.synthesis.pause();
      return true;
    }
    return false;
  }

  // Resume paused speech
  resume() {
    if (this.synthesis.paused) {
      this.synthesis.resume();
      return true;
    }
    return false;
  }

  // Stop current speech
  stop() {
    if (this.synthesis.speaking || this.synthesis.pending) {
      this.synthesis.cancel();
      this.currentUtterance = null;
      return true;
    }
    return false;
  }

  // Check if currently speaking
  isSpeaking() {
    return this.synthesis.speaking;
  }

  // Check if currently paused
  isPaused() {
    return this.synthesis.paused;
  }

  // Get current speech state
  getState() {
    return {
      speaking: this.synthesis.speaking,
      paused: this.synthesis.paused,
      pending: this.synthesis.pending
    };
  }

  // Set default settings
  setDefaultSettings(settings) {
    this.defaultSettings = { ...this.defaultSettings, ...settings };
  }

  // Get current settings
  getDefaultSettings() {
    return { ...this.defaultSettings };
  }
}

// Create and export singleton instance
export const speechService = new SpeechService();

// Export utility functions
export const speechUtils = {
  // Convert rate percentage to speech rate value
  percentageToRate: (percentage) => {
    // Convert 0-100 percentage to 0.1-2.0 range
    return Math.max(0.1, Math.min(2.0, percentage / 50));
  },

  // Convert speech rate to percentage
  rateToPercentage: (rate) => {
    // Convert 0.1-2.0 range to 0-100 percentage
    return Math.round(rate * 50);
  },

  // Format duration from text length (rough estimation)
  estimateDuration: (text, rate = 1.0) => {
    // Average reading speed: ~200 words per minute
    // Adjust for speech rate
    const words = text.split(' ').length;
    const minutes = (words / 200) / rate;
    
    if (minutes < 1) {
      return `${Math.round(minutes * 60)}s`;
    } else if (minutes < 60) {
      return `${Math.round(minutes)}m`;
    } else {
      const hours = Math.floor(minutes / 60);
      const mins = Math.round(minutes % 60);
      return `${hours}h ${mins}m`;
    }
  },

  // Get speech synthesis info
  getSynthesisInfo: () => {
    if (!('speechSynthesis' in window)) {
      return { supported: false };
    }

    return {
      supported: true,
      voicesCount: speechSynthesis.getVoices().length,
      speaking: speechSynthesis.speaking,
      paused: speechSynthesis.paused,
      pending: speechSynthesis.pending
    };
  }
};

export default speechService; 