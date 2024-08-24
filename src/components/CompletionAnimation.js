// src/components/CompletionAnimation.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CompletionAnimation = ({ show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">축하합니다!</h2>
            <p>1시간 꿈 저금을 완료하셨습니다!</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompletionAnimation;
