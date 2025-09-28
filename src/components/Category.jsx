import React from 'react';
import ceramic from "../assets/ceramic.png"; 
import weaving from "../assets/weaving.png";
import jewelery from "../assets/jewelery.png";
import woodArt from "../assets/woodArt.png";
import mirror from "../assets/mirror.png";
import leather from "../assets/leather.png";
import { Button } from "./ui/button";
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // This creates the staggered delay between each card.
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const buttonVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 10 } },
}

const Category = () => {
  return (
    <>
    <section className="py-7 pb-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 pt-5 text-center text-[#205963]">
          Shop By Category
        </h2>
        {/* The main container for the grid of cards. */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
          initial="hidden" // Set initial state
          whileInView="visible" // Animate when the element is in view
          viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of the element is visible
          variants={containerVariants}
        >
          {/* Product Card 1 */}
          <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden"
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <img src={ceramic} alt="Product 1" className="w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-center text-[#3D6B73]">
                Potery & Ceramics
              </h3>
            </div>
          </motion.div>
          {/* Product Card 2 */}
          <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden"
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <img src={weaving} alt="Product 2" className="w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-center text-[#3D6B73]">
                Textiles & Weaving
              </h3>
            </div>
          </motion.div>
          {/* Product Card 3 */}
          <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden"
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <img src={jewelery} alt="Product 3" className="w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-center text-[#3D6B73]">
                Jewelery & Ornaments
              </h3>
            </div>
          </motion.div>
          {/* Product Card 4 */}
          <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden"
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <img src={woodArt} alt="Product 1" className="w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-center text-[#3D6B73]">
                Wood Folk Art
              </h3>
            </div>
          </motion.div>
          {/* Product Card 5 - New Card */}
          <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden"
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <img src={leather} alt="Product 1" className="w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-center text-[#3D6B73]">
                Leather Goods
              </h3>
            </div>
          </motion.div>
           {/* Product Card 6 - New Card */}
          <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden"
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <img src={mirror} alt="Product 1" className="w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-center text-[#3D6B73]">
                Embroidery & Mirror Work
              </h3>
            </div>
          </motion.div>
        </motion.div>
        <div className="flex justify-center">
          <motion.button 
            className="mt-8 px-6 py-3 bg-[#3D6B73] text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#205963]"
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, amount: 0.8 }}
            variants={buttonVariants}
            whileHover={{ 
              y: -5,
              backgroundColor: "#5fafbd", 
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" 
            }}
            whileTap={{ y: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            View All Products
          </motion.button>
        </div>
      </div>
    </section>
    </>
  )
}

export default Category
