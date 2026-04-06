import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Package, 
  Users, 
  Star, 
  Truck, 
  ShieldCheck, 
  Heart, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { id: 1, icon: <Package className="w-6 h-6 text-[#c8f400]" />, value: "20K+", label: "Products" },
    { id: 2, icon: <Users className="w-6 h-6 text-[#c8f400]" />, value: "50K+", label: "Happy Customers" },
    { id: 3, icon: <Star className="w-6 h-6 text-[#c8f400]" />, value: "4.9", label: "Avg. Rating" },
    { id: 4, icon: <Truck className="w-6 h-6 text-[#c8f400]" />, value: "99%", label: "On-time Delivery" },
  ];

  const values = [
    { 
      id: 1, 
      icon: <ShieldCheck className="w-6 h-6 text-[#c8f400]" />, 
      title: "Trust", 
      desc: "Every product is verified for quality and authenticity before listing." 
    },
    { 
      id: 2, 
      icon: <Zap className="w-6 h-6 text-[#c8f400]" />, 
      title: "Speed", 
      desc: "We obsess over delivery times so your orders arrive when promised." 
    },
    { 
      id: 3, 
      icon: <Heart className="w-6 h-6 text-[#c8f400]" />, 
      title: "Community", 
      desc: "Built around real customer feedback, not just business metrics." 
    },
    { 
      id: 4, 
      icon: <Sparkles className="w-6 h-6 text-[#c8f400]" />, 
      title: "Quality", 
      desc: "We curate the best — no filler, no junk, just great products." 
    },
  ];

  const team = [
    { id: 1, name: "Aryan Shah", role: "Founder & CEO", initial: "A", color: "bg-yellow-400" },
    { id: 2, name: "Priya Mehta", role: "Head of Product", initial: "P", color: "bg-blue-500" },
    { id: 3, name: "Rohan Verma", role: "Lead Engineer", initial: "R", color: "bg-purple-500" },
    { id: 4, name: "Sneha Kapoor", role: "Design Director", initial: "S", color: "bg-pink-500" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#c8f400] selection:text-black px-16">

      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: [0, -10, 0]
          }}
          transition={{ 
            scale: { duration: 0.5 },
            opacity: { duration: 0.5 },
            y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
          }}
          className="w-16 h-16 bg-[#c8f400] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(200,244,0,0.3)]"
        >
          <Zap className="w-8 h-8 text-black" fill="currentColor" />
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tight"
        >
          About <span className="text-[#c8f400]">SkyMart</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          SkyMart is a next-generation e-commerce platform built to make online 
          shopping fast, fair, and enjoyable — for everyone.
        </motion.p>
      </section>


      <section className="py-10 px-6 max-w-7xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <motion.div 
              key={stat.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl border border-white bg-white/5 backdrop-blur-sm text-center transition-colors hover:border-[#c8f400]/30"
            >
              <div className="mb-3 flex justify-center scale-90">{stat.icon}</div>
              <div className="text-2xl font-heading font-bold mb-1">{stat.value}</div>
              <div className="text-gray-500 text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>


      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-[32px] border border-white bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-400 text-base leading-relaxed max-w-4xl">
              <p>
                SkyMart started in 2022 as a small side project — two engineers tired of bloated, 
                slow e-commerce experiences. We asked ourselves: what if shopping online was actually <span className="italic text-white">enjoyable?</span>
              </p>
              <p>
                Three years later, SkyMart serves over 50,000 customers across the country. 
                We stock electronics, fashion, jewelry, and everyday essentials — 
                all at prices that don't require a second mortgage.
              </p>
              <p>
                We're still the same team at heart: obsessed with speed, transparency, 
                and making you feel good about every purchase you make here.
              </p>
            </div>
          </div>
        </motion.div>
      </section>


      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold">What We Stand For</h2>
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {values.map((v) => (
            <motion.div 
              key={v.id}
              variants={itemVariants}
              className="p-6 rounded-2xl border border-white bg-white/5 flex gap-5 items-start transition-colors hover:border-[#c8f400]/50"
            >
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0 scale-90">
                {v.icon}
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold mb-1.5">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-white">Meet the Team</h2>
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {team.map((member) => (
            <motion.div 
              key={member.id}
              variants={itemVariants}
              className="text-center group border border-white p-6 rounded-2xl"
            >
              <div className="relative mb-5 mx-auto w-16 h-16">
                <div className={`w-full h-full rounded-2xl ${member.color} flex items-center justify-center text-3xl font-black text-white shadow-xl`}>
                  {member.initial}
                </div>
              </div>
              <h3 className="text-lg font-heading font-bold mb-0.5">{member.name}</h3>
              <p className="text-gray-500 text-xs">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>


      <section className="py-16 px-6 max-w-7xl mx-auto mb-16">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="p-10 md:p-16 rounded-[32px] border border-[#c8f400]/20 bg-gradient-to-b from-[#c8f400]/5 to-transparent text-center"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-black mb-4">Ready to shop?</h2>
          <p className="text-gray-500 text-base mb-8 max-w-xl mx-auto">
            Explore thousands of products at unbeatable prices.
          </p>
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#c8f400] text-black font-bold rounded-xl text-base transition-all hover:gap-4 hover:bg-[#d6ff1f] hover:shadow-[0_0_30px_rgba(200,244,0,0.4)]"
          >
            Browse Products <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;