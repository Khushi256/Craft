import React from 'react'
import heroImage from '../assets/hero-image.png';
import BlurText from './BlurText';
import { motion } from 'framer-motion';

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};


const HeroSection = () => {
  return (
    <section
      className="relative h-[32rem] md:h-[40rem] bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay */}
      <motion.div
        className="absolute inset-y-0 left-0 bg-[#3D6B73]/70 w-full md:w-1/2 flex items-center justify-center p-8 z-10"
        initial={{ x: '-100%' }}
        animate={{ x: '0%' }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <div className="px-6 md:px-16 lg:px-24 max-w-xl">
          <BlurText
            text="Where Tradition Meets Today"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-white text-3xl md:text-4xl lg:text-6xl font-bold leading-tight mb-2"
          />
          <BlurText
            text="Unique crafts, modern experiences, and stories worth sharing."
            delay={100}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-blue-100 text-lg md:text-xl mt-4"
          />
        </div>
      </motion.div>
      {/* Spacer for overlay to not cover everything */}
      <div className="flex-1" />
    </section>
  );
}

export default HeroSection
