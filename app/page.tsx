"use client"
import Image from "next/image";
import { SignIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useGSAPAnimations } from "@/hooks/use-gsap-animations";
import { FloatingOrbs, Particles, CSS3DElement } from "@/components/3d-effects";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileThemeToggle } from "@/components/MobileThemeToggle";

export default function Home() {
  const { user } = useUser();
  const containerRef = useGSAPAnimations();

  // Framer Motion variants for Hero section - Fixed to prevent initial hiding
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        delayChildren: 0.1 // Reduced delay so text appears faster
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 }, // Reduced movement and ensured opacity starts from 0
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6 // Faster animation
      }
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
      {/* Enhanced Navbar with GSAP scroll trigger */}
      <header 
        data-navbar
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out"
      >
        <nav className="relative backdrop-blur-xl bg-white/80 border-b border-white/20 dark:bg-slate-900/80 dark:border-slate-700/50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center"
              >
                <Image 
                  src={'/logo.png'} 
                  alt="CareerShot Logo" 
                  width={140} 
                  height={40}
                  className="h-8 w-auto lg:h-10"
                  priority
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center space-x-4"
              >
                {/* Theme Toggle */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <ThemeToggle />
                </motion.div>

                {!user ? (
                  <SignInButton mode='modal' signUpForceRedirectUrl={'/dashboard'}>
                    <CSS3DElement className="group cursor-pointer">
                      <div className="flex items-center gap-x-2 font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 px-4 py-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-300">
                        <svg className="w-4 h-4 transition-transform group-hover:scale-110" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        </svg>
                        Get Started
                      </div>
                    </CSS3DElement>
                  </SignInButton>
                ) : (
                  <div className="relative">
                    <UserButton />
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section with Framer Motion */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* 3D Background Elements */}
        <FloatingOrbs className="z-0" />
        <Particles count={80} className="z-10" />
        
        {/* Hero Content */}
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          {/* Badge with external link */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <CSS3DElement translateZ={20}>
              <a 
                className="inline-flex items-center gap-x-3 bg-white/80 backdrop-blur-sm border border-white/40 text-sm text-slate-700 p-1 pl-4 rounded-full transition-all duration-300 hover:border-blue-300 hover:bg-white/90 hover:shadow-lg dark:bg-slate-800/80 dark:border-slate-700/50 dark:text-slate-200 dark:hover:border-blue-600 group"
                href="" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-medium">Watch The Demo Video-CareerShot</span>
                <span className="py-2 px-3 inline-flex justify-center items-center gap-x-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 font-semibold text-sm text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </CSS3DElement>
          </motion.div>

          {/* Main Heading - Restored Beautiful Animation */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-slate-900 dark:text-white leading-tight"
          >
            <span className="block">Discover Your Own</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-size-200 animate-gradient-shift">
              Journey
            </span>
            <span className="block">
              With{" "}
              <span className="relative">
                CareerShot
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              </span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="mt-8 max-w-3xl mx-auto text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed"
          >
            Revolutionize your career journey with our AI-powered platform, delivering 
            <span className="font-semibold text-blue-600 dark:text-blue-400"> personalized guidance</span> and 
            <span className="font-semibold text-purple-600 dark:text-purple-400"> professional insights</span> in seconds.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <CSS3DElement translateZ={30}>
              <a 
                href="/dashboard"
                className="group relative inline-flex items-center justify-center gap-x-3 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 hover:from-blue-700 hover:via-purple-700 hover:to-violet-700 border-0 text-white text-lg font-semibold rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 py-4 px-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                <span className="relative z-10">Get Started Free</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
              </a>
            </CSS3DElement>

            <CSS3DElement translateZ={20}>
              <button className="group inline-flex items-center gap-x-3 text-slate-700 dark:text-slate-300 font-medium text-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                <div className="w-12 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                Watch Demo
              </button>
            </CSS3DElement>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-400 dark:bg-slate-500 rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid Section with GSAP ScrollTrigger */}
      <section className="py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-animate className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Why Choose <span className="text-blue-600">CareerShot</span>?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Transform your career journey with cutting-edge AI tools designed for modern professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Card 1 */}
            <div data-animate className="group">
              <CSS3DElement className="h-full">
                <div className="relative p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-white/40 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      AI-Powered Templates
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      Access 25+ professionally designed templates that adapt to your industry and career level
                    </p>
                    
                    <a href="#" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all duration-300">
                      Learn more
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </CSS3DElement>
            </div>

            {/* Feature Card 2 */}
            <div data-animate className="group">
              <CSS3DElement className="h-full">
                <div className="relative p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-white/40 dark:border-slate-700/50 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      Smart Customization
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      Every component is intelligently customizable and extends seamlessly with your personal brand
                    </p>
                    
                    <a href="#" className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium hover:gap-3 transition-all duration-300">
                      Learn more
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </CSS3DElement>
            </div>

            {/* Feature Card 3 */}
            <div data-animate className="group">
              <CSS3DElement className="h-full">
                <div className="relative p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-white/40 dark:border-slate-700/50 hover:border-green-300 dark:hover:border-green-600 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      Always Free
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      Core features are completely free forever, with premium options for advanced career growth
                    </p>
                    
                    <a href="#" className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-medium hover:gap-3 transition-all duration-300">
                      Learn more
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </CSS3DElement>
            </div>

            {/* Feature Card 4 */}
            <div data-animate className="group">
              <CSS3DElement className="h-full">
                <div className="relative p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-white/40 dark:border-slate-700/50 hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-900/20 dark:to-red-900/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      24/7 AI Support
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      Get instant career guidance and support from our AI counselor, available around the clock
                    </p>
                    
                    <a href="#" className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 font-medium hover:gap-3 transition-all duration-300">
                      Learn more
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </CSS3DElement>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Theme Toggle - Fixed Position */}
      <MobileThemeToggle />

    </div>
  );
}
