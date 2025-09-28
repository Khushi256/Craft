import React from 'react'
import diwaliSale from '../assets/diwaliSale.png';
import { Button } from "./ui/button";
import { motion } from 'framer-motion';

// Define the animation variants for the main container
const containerVariants = {
  // The initial state, before the animation
  hidden: { opacity: 0, y: 50 },
  // The final, animated state when the component is in view
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      staggerChildren: 0.3, // Apply a staggered delay to the children
    },
  },
};

// Define the animation variants for the text and button
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Sale = () => {
  return (
    <>
    <div>
        <div className="flex items-center justify-center py-12 px-4">
      <motion.section 
        className="relative h-[15rem] md:h-[28rem] bg-cover bg-center w-full max-w-7xl rounded-md flex flex-col items-center justify-center p-4" 
        style={{ backgroundImage: `url(${diwaliSale})` }}
        // Set the initial and "in-view" animation states
        initial="hidden"
        whileInView="visible"
        // Configure when the animation should be triggered
        viewport={{ once: true, amount: 0.5 }}
        variants={containerVariants}
      >
        <motion.h1 
          className="text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-center"
          variants={itemVariants}
        >
          DIWALI SALE
         </motion.h1>
        <motion.p 
          className="text-white text-sm md:text-xl mt-4 text-center max-w-2xl"
          variants={itemVariants}
        >
          Illuminate Your Home with Handcrafted Treasures - Diwali Sale Up to 20% Off!
        </motion.p>
        <motion.button 
          className="mt-7 mr-160 px-8 py-4 bg-[#3D6B73] text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#205963] hover:bg-[#5fafbd] transition-colors"
          variants={itemVariants}
          whileHover={{ 
            y: -5,
            backgroundColor: "#5fafbd", 
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" 
          }}
          whileTap={{ y: 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Shop Now
        </motion.button>
      </motion.section>
    </div>
    </div>
    </>
  )
}

export default Sale
