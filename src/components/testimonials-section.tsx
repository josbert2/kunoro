'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Golan Adam",
    role: "IT Infrastructure Manager",
    content: "I have received financial advice from Incline Investment Planners since 2022, and my experience has been excellent",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Business Owner",
    content: "Great Agency! Their investment strategies have helped me grow my portfolio significantly over the past year.",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Financial Advisor",
    content: "Professional service and excellent results. I highly recommend their investment planning services.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.span
        key={i}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          delay: i * 0.1,
          type: "spring",
          stiffness: 200,
          damping: 10
        }}
        className={`text-lg ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </motion.span>
    ));
  };

  const getPrevIndex = () => (currentIndex - 1 + testimonials.length) % testimonials.length;
  const getNextIndex = () => (currentIndex + 1) % testimonials.length;

  const currentTestimonial = testimonials[currentIndex];
  const prevTestimonialData = testimonials[getPrevIndex()];
  const nextTestimonialData = testimonials[getNextIndex()];

  const slideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateX: direction > 0 ? 45 : -45
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateX: direction < 0 ? 45 : -45
    })
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    })
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 relative overflow-hidden min-h-screen">
      {/* Decorative elements with motion */}
      <motion.div 
        className="absolute top-20 left-20 w-28 h-28 bg-pink-300 rounded-full opacity-70"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute bottom-40 left-32 w-24 h-48 bg-gray-800 rounded-full opacity-90"
        animate={{ 
          x: [0, 15, 0],
          scaleY: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute top-1/3 right-20 w-20 h-20 bg-gray-700 rounded-full opacity-80"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, -180, -360]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left side - Text content */}
          <motion.div 
            className="space-y-16 pt-12"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <motion.div 
              className="space-y-8"
              variants={cardVariants}
              custom={0}
            >
              <motion.p 
                className="text-sm font-semibold text-gray-500 uppercase tracking-widest"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                TESTIMONIAL
              </motion.p>
              <motion.h2 
                className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                See Our Customers' Kind Remarks
              </motion.h2>
            </motion.div>
            
            <motion.div 
              className="space-y-4"
              variants={cardVariants}
              custom={1}
            >
              <motion.div 
                className="text-6xl lg:text-7xl font-bold text-gray-900"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.6,
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
              >
                27000+
              </motion.div>
              <motion.p 
                className="text-xl text-gray-600 font-medium"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                Customer Around The World
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Right side - Testimonials */}
          <div className="relative pt-12">
            {/* Navigation buttons */}
            <motion.div 
              className="absolute -right-8 top-1/2 transform -translate-y-1/2 z-20"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.div 
                className="bg-black rounded-full p-5 shadow-xl flex flex-col space-y-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.button
                  onClick={prevTestimonial}
                  className="text-white hover:text-gray-300 transition-all duration-200 p-2"
                  whileHover={{ scale: 1.2, rotate: -10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
                <div className="w-6 h-px bg-gray-600"></div>
                <motion.button
                  onClick={nextTestimonial}
                  className="text-white hover:text-gray-300 transition-all duration-200 p-2"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Testimonial cards stack */}
            <div className="relative space-y-8">
              {/* Background testimonial (previous) */}
              <motion.div 
                className="bg-white rounded-3xl p-10 shadow-lg transform translate-y-6 scale-95 opacity-60"
                key={`prev-${getPrevIndex()}`}
                initial={{ opacity: 0, y: -100, scale: 0.8 }}
                animate={{ opacity: 0.6, y: 24, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 0.98, opacity: 0.8 }}
              >
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <motion.h3 
                      className="font-bold text-gray-900 text-xl mb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Great Agency
                    </motion.h3>
                    <div className="flex items-center space-x-1">
                      {renderStars(prevTestimonialData.rating)}
                    </div>
                  </div>
                  <motion.div 
                    className="bg-black text-white text-sm px-4 py-2 rounded-full font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    {prevTestimonialData.rating}.0
                  </motion.div>
                </div>
                
                <motion.p 
                  className="text-gray-700 mb-8 leading-relaxed text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  "{prevTestimonialData.content}"
                </motion.p>
                
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mr-5 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className="text-white font-bold text-lg">
                      {prevTestimonialData.name.charAt(0)}
                    </span>
                  </motion.div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">
                      {prevTestimonialData.name}
                    </div>
                    <div className="text-gray-600 text-base">
                      {prevTestimonialData.role}
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Active testimonial (current) */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div 
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    y: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.4 },
                    rotateX: { duration: 0.4 }
                  }}
                  className="bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-3xl p-10 shadow-xl transform -translate-y-10 relative z-10"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                >
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <motion.h3 
                        className="font-bold text-gray-900 text-xl mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        Great Agency
                      </motion.h3>
                      <div className="flex items-center space-x-1">
                        {renderStars(currentTestimonial.rating)}
                      </div>
                    </div>
                    <motion.div 
                      className="bg-black text-white text-sm px-4 py-2 rounded-full font-medium"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                      {currentTestimonial.rating}.0
                    </motion.div>
                  </div>
                  
                  <motion.p 
                    className="text-gray-800 mb-8 leading-relaxed text-lg font-medium"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    "{currentTestimonial.content}"
                  </motion.p>
                  
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <motion.div 
                      className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mr-5 flex items-center justify-center"
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: 10,
                        boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)"
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <span className="text-white font-bold text-lg">
                        {currentTestimonial.name.charAt(0)}
                      </span>
                    </motion.div>
                    <div>
                      <motion.div 
                        className="font-bold text-gray-900 text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        {currentTestimonial.name}
                      </motion.div>
                      <motion.div 
                        className="text-gray-700 text-base"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        {currentTestimonial.role}
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Next testimonial (partially visible) */}
              <motion.div 
                className="bg-white rounded-3xl p-10 shadow-lg transform -translate-y-16 scale-95 opacity-70"
                key={`next-${getNextIndex()}`}
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                animate={{ opacity: 0.7, y: -64, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 0.98, opacity: 0.9 }}
              >
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <motion.h3 
                      className="font-bold text-gray-900 text-xl mb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Great Agency
                    </motion.h3>
                    <div className="flex items-center space-x-1">
                      {renderStars(nextTestimonialData.rating)}
                    </div>
                  </div>
                  <motion.div 
                    className="bg-black text-white text-sm px-4 py-2 rounded-full font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    {nextTestimonialData.rating}.0
                  </motion.div>
                </div>
                
                <motion.p 
                  className="text-gray-700 mb-8 leading-relaxed text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  "{nextTestimonialData.content}"
                </motion.p>
                
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mr-5 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <span className="text-white font-bold text-lg">
                      {nextTestimonialData.name.charAt(0)}
                    </span>
                  </motion.div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">
                      {nextTestimonialData.name}
                    </div>
                    <div className="text-gray-600 text-base">
                      {nextTestimonialData.role}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}