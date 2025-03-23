'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Tag } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Revolutionizing Geofencing with AI Integration",
    excerpt: "Discover how artificial intelligence is transforming traditional geofencing into smart, adaptive boundary systems.",
    category: "Technology",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Real-time Location Tracking Breakthroughs",
    excerpt: "Exploring the latest advancements in real-time location tracking and their impact on geofencing accuracy.",
    category: "Innovation",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Privacy-First Geofencing Solutions",
    excerpt: "How modern geofencing technology is addressing privacy concerns while maintaining effectiveness.",
    category: "Security",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80&w=800",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1,
    },
  },
};

export function BlogSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="documentation" className="py-16 p-12">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-16 text-center text-gradient-blue font-custom"
      >
        Latest from Our Blog
      </motion.h2>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {blogPosts.map((post) => (
          <motion.article
            key={post.id}
            variants={itemVariants}
            className="group rounded-xl overflow-hidden bg-blue-950/50 backdrop-blur-sm hover:border-2 hover:border-blue-400 transition-all duration-300"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4 text-sm text-blue-200/70">
                <span className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-blue-100 group-hover:text-blue-400 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-blue-200/70 mb-4">
                {post.excerpt}
              </p>
              
              <button className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors">
                Read More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}