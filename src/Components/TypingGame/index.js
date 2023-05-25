import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './index.css';

const sentences = [
  'Dream big, work hard, achieve greatness.',
  'Embrace change and unleash your true potential.',
  'Love yourself, spread kindness, create happiness.',
  'Believe in yourself and never give up.',
  'Find joy in the little things every day.',
  'Chase your dreams with passion and perseverance.',
  'Celebrate lifes journey with a grateful heart.',
  'The quick brown fox jumps over the lazy dog.',
  'Sphinx of black quartz, judge my vow.',
  'Pack my box with five dozen liquor jugs.',
  'How vexingly quick daft zebras jump!',
];

const TouchTyping = () => {
  const [currentSentence, setCurrentSentence] = useState('');
  const [typedText, setTypedText] = useState('');
  const [nextCharacters, setNextCharacters] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [wpm, setWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [keyPresses, setKeyPresses] = useState(0);

  const handleTextChange = (e) => {
    const { value } = e.target;
    setTypedText(value);
    if (!startTime) {
      setStartTime(Date.now());
    }
  };

  const handleSentenceChange = () => {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    const sentence = sentences[randomIndex];
    setCurrentSentence(sentence);
    setTypedText('');
    setNextCharacters(sentence);
    setStartTime(0);
    setEndTime(0);
    setWPM(0);
    setAccuracy(0);
    setKeyPresses(0);
  };

  const handleKeyPress = () => {
    setKeyPresses((prevKeyPresses) => prevKeyPresses + 1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setEndTime(Date.now());

    const wordsCount = currentSentence.trim().split(' ').length;
    const typedWordsCount = typedText.trim().split(' ').length;

    const minutes = (endTime - startTime) / 60000;
    const grossWPM = typedWordsCount / minutes;
    const netWPM = grossWPM - typedWordsCount / 10;
    const calculatedWPM = netWPM > 0 ? Math.floor(netWPM) : 0;

    const calculatedAccuracy = (typedWordsCount / wordsCount) * 100 || 0;

    setWPM(calculatedWPM);
    setAccuracy(calculatedAccuracy.toFixed(2));
  };

  useEffect(() => {
    handleSentenceChange();
  }, []);

  useEffect(() => {
    const charactersToType = currentSentence.slice(
      typedText.length,
      typedText.length + 10
    );
    setNextCharacters(charactersToType);
  }, [currentSentence, typedText]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (startTime > 0 && Date.now() - startTime >= 5 * 60 * 1000) {
        setEndTime(Date.now());
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startTime]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="typing-game-container"
  
    >
    <div className='content'>
      <h1 className='heading'>Touch Typing Game</h1>
      <div className='sentence'>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {currentSentence}
        </motion.p>
      </div>
      <p className='nextchar'>Next Characters: {nextCharacters}</p>
      <form onSubmit={handleFormSubmit}>
        <motion.textarea
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          value={typedText}
          onChange={handleTextChange}
          onKeyPress={handleKeyPress}
          placeholder="Start typing..."
          rows={4}
          cols={50}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Submit
        </motion.button>
      </form>
    
        <div className='features'>
          <div className='individualfeatures'>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              >
                WPM: {wpm}
              </motion.p>
          </div>
          <div className='individualfeatures'>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Accuracy: {accuracy}%
            </motion.p>
          </div>
          <div className='individualfeatures'>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Key Presses: {keyPresses}
            </motion.p>
          </div>
        </div>
      
      <motion.button
        onClick={handleSentenceChange}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Change Sentence
      </motion.button>
      </div>
    </motion.div>
  );
};

export default TouchTyping;
