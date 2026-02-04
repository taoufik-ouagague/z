import { useState, useEffect } from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';

function FloatingHeart() {
  const style = {
    left: Math.random() * 100 + '%',
    animationDuration: Math.random() * 3 + 2 + 's',
    opacity: Math.random() * 0.5 + 0.3,
    animationDelay: Math.random() * 2 + 's',
  };

  return (
    <Heart
      className="absolute text-red-300 fill-red-300 animate-float"
      style={style}
      size={Math.random() * 20 + 10}
    />
  );
}

function Confetti({ delay = 0 }) {
  const colors = ['text-red-500', 'text-pink-500', 'text-rose-500', 'text-yellow-400', 'text-purple-500'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomLeft = Math.random() * 100;
  const randomDuration = Math.random() * 2 + 2;
  
  return (
    <div
      className={`absolute w-2 h-2 ${randomColor} rounded-full animate-confetti`}
      style={{
        left: `${randomLeft}%`,
        animationDuration: `${randomDuration}s`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

function FloatingSparkle({ delay = 0 }) {
  const randomLeft = Math.random() * 100;
  const randomTop = Math.random() * 100;
  
  return (
    <Sparkles
      className="absolute text-yellow-400 fill-yellow-400 animate-twinkle"
      style={{
        left: `${randomLeft}%`,
        top: `${randomTop}%`,
        animationDelay: `${delay}s`,
      }}
      size={Math.random() * 10 + 8}
    />
  );
}

function App() {
  const [answered, setAnswered] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState<number[]>([]);
  const [noButtonScale, setNoButtonScale] = useState(1);
  const [confetti, setConfetti] = useState<number[]>([]);
  const [sparkles, setSparkles] = useState<number[]>([]);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [shakeNo, setShakeNo] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Add your photo URLs here!
  const photos = [
    '/vl/WhatsApp Image 2026-02-04 at 11.55.56 (1).jpeg',
    '/vl/WhatsApp Image 2026-02-04 at 11.55.56 (2).jpeg',
    '/vl/WhatsApp Image 2026-02-04 at 11.55.56 (3).jpeg',
    '/vl/WhatsApp Image 2026-02-04 at 11.55.56.jpeg',
  ];

  // Video URL (optional)
  const videoUrl = '/vl/WhatsApp Video 2026-02-04 at 11.55.58.mp4';

  useEffect(() => {
    setHearts(Array.from({ length: 25 }, (_, i) => i));
    setSparkles(Array.from({ length: 15 }, (_, i) => i));
  }, []);

  useEffect(() => {
    if (answered) {
      setConfetti(Array.from({ length: 50 }, (_, i) => i));
    }
  }, [answered]);

  // Slideshow effect for photos
  useEffect(() => {
    if (photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
      }, 5000); // Change photo every 5 seconds
      return () => clearInterval(interval);
    }
  }, [photos.length]);

  const handleYesClick = () => {
    setAnswered(true);
  };

  const handleYesHover = () => {
    setYesButtonScale(1.1);
  };

  const handleYesLeave = () => {
    setYesButtonScale(1);
  };

  const handleNoHover = () => {
    const randomX = (Math.random() - 0.5) * 400;
    const randomY = (Math.random() - 0.5) * 300;
    setNoButtonPosition({ x: randomX, y: randomY });
    setNoButtonScale(prev => Math.max(prev * 0.88, 0.25));
    setShakeNo(true);
    setTimeout(() => setShakeNo(false), 500);
  };

  const handleNoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const randomX = (Math.random() - 0.5) * 500;
    const randomY = (Math.random() - 0.5) * 400;
    setNoButtonPosition({ x: randomX, y: randomY });
    setNoButtonScale(prev => Math.max(prev * 0.8, 0.25));
    setShakeNo(true);
    setTimeout(() => setShakeNo(false), 500);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .animate-float { animation: float linear infinite; }
        
        @keyframes shimmer {
          0%, 100% { opacity: 0.3; transform: scale(1) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(5deg); }
        }
        .animate-shimmer { animation: shimmer 3s ease-in-out infinite; }
        
        @keyframes glow {
          0%, 100% { 
            filter: drop-shadow(0 0 15px rgba(239, 68, 68, 0.4));
            transform: scale(1);
          }
          50% { 
            filter: drop-shadow(0 0 30px rgba(239, 68, 68, 0.8));
            transform: scale(1.05);
          }
        }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          10% { transform: scale(1.15); }
          20% { transform: scale(1); }
          30% { transform: scale(1.15); }
          40% { transform: scale(1); }
        }
        .animate-heartbeat { animation: heartbeat 2s ease-in-out infinite; }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp { animation: slideUp 0.6s ease-out forwards; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .animate-bounceIn { animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        
        @keyframes confetti {
          0% { transform: translateY(-100%) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti { animation: confetti 3s linear infinite; }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient { 
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        .animate-wiggle { animation: wiggle 0.5s ease-in-out; }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }
        
        @keyframes popIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-popIn { animation: popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown { animation: slideDown 0.6s ease-out forwards; }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-rotate { animation: rotate 3s linear infinite; }
        
        @keyframes scaleUp {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-scaleUp { animation: scaleUp 2s ease-in-out infinite; }
        
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-floating { animation: floating 3s ease-in-out infinite; }
        
        @keyframes zoomIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-zoomIn { animation: zoomIn 0.5s ease-out forwards; }
        
        @keyframes photoFade {
          0% { opacity: 0; transform: scale(1.1); }
          10%, 90% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.1); }
        }
        .animate-photoFade { animation: photoFade 5s ease-in-out infinite; }
      `}</style>

      {/* Background with Photos/Video - Rose Overlay */}
      <div className="absolute inset-0">
        {/* Photo Slideshow Background (only if not using video) */}
        {!answered && photos.length > 0 && (
          <div className="absolute inset-0">
            {photos.map((photo, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentPhotoIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={photo}
                  alt={`Background ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Video Background (shows after "Yes" is clicked) */}
        {answered && videoUrl && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}

        {/* Rose/Pink Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/60 via-pink-500/50 to-red-500/60 backdrop-blur-sm"></div>
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {hearts.map(i => (
          <FloatingHeart key={i} />
        ))}
      </div>

      {/* Floating sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparkles.map(i => (
          <FloatingSparkle key={i} delay={i * 0.2} />
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="absolute top-20 left-20 text-rose-200 opacity-60 w-12 h-12 animate-shimmer" />
        <Sparkles className="absolute top-1/4 right-20 text-pink-200 opacity-60 w-10 h-10 animate-shimmer" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute bottom-1/4 left-1/3 text-red-200 opacity-60 w-10 h-10 animate-shimmer" style={{ animationDelay: '2s' }} />
        <Star className="absolute bottom-1/3 left-1/4 text-rose-100 opacity-70 w-8 h-8 animate-scaleUp" />
        <Star className="absolute bottom-20 right-1/3 text-pink-100 opacity-70 w-6 h-6 animate-scaleUp" style={{ animationDelay: '1.5s' }} />
        <Star className="absolute top-1/3 right-1/4 text-red-100 opacity-70 w-7 h-7 animate-scaleUp" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Confetti when answered */}
      {answered && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {confetti.map(i => (
            <Confetti key={i} delay={i * 0.02} />
          ))}
        </div>
      )}

      {!answered ? (
        <div className="relative z-10 bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center transform transition-all border-2 border-white/70 animate-fadeIn">
          <div className="flex justify-center mb-8">
            <div className="relative animate-floating">
              <Heart className="w-28 h-28 text-red-500 fill-red-500 animate-glow" />
              <Sparkles className="absolute -top-2 -right-2 w-10 h-10 text-yellow-400 fill-yellow-400 animate-rotate" />
            </div>
          </div>

          <h2 className="text-3xl text-white font-semibold mb-6 tracking-wide animate-slideDown drop-shadow-lg" style={{ animationDelay: '0.1s' }}>
            Dear Ferdaousse,
          </h2>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight animate-slideDown drop-shadow-2xl" style={{ animationDelay: '0.2s', textShadow: '0 0 40px rgba(255,255,255,0.5)' }}>
            Will you be my Valentine?
          </h1>

          <p className="text-xl text-white mb-4 leading-relaxed font-medium animate-slideDown drop-shadow-lg" style={{ animationDelay: '0.3s' }}>
            Life is more beautiful with you by my side.
          </p>

          <div className="flex items-center justify-center gap-2 mb-8 animate-slideDown" style={{ animationDelay: '0.4s' }}>
            <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-white to-transparent"></div>
            <Heart className="w-4 h-4 text-white fill-white animate-heartbeat" />
            <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-white to-transparent"></div>
          </div>

          <p className="text-lg text-white mb-12 italic animate-slideDown drop-shadow-lg" style={{ animationDelay: '0.5s' }}>
            Choose wisely... 💕
          </p>

          <div className="flex gap-6 justify-center items-center relative h-24">
            <button
              onClick={handleYesClick}
              onMouseEnter={handleYesHover}
              onMouseLeave={handleYesLeave}
              style={{
                transform: `scale(${yesButtonScale})`,
                transition: 'transform 0.3s ease-out',
              }}
              className="relative z-20 bg-gradient-to-r from-red-500 via-rose-500 to-pink-600 hover:from-red-600 hover:via-rose-600 hover:to-pink-700 text-white font-bold text-2xl px-16 py-6 rounded-full shadow-xl transform transition-all duration-300 active:scale-95 hover:shadow-2xl border-2 border-white/30 animate-popIn"
            >
              <span className="flex items-center gap-3">
                Yes, I will! 
                <Heart className="w-6 h-6 fill-white animate-heartbeat" />
              </span>
            </button>

            <button
              onMouseEnter={handleNoHover}
              onMouseMove={handleNoHover}
              onClick={handleNoClick}
              onTouchStart={handleNoHover}
              style={{
                transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px) scale(${noButtonScale})`,
                transition: 'transform 0.15s ease-out',
              }}
              className={`bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold text-xl px-12 py-6 rounded-full shadow-lg transform active:scale-95 border-2 border-gray-300 ${shakeNo ? 'animate-shake' : ''}`}
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <div className="relative z-10 bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center transform border-2 border-white/70 animate-bounceIn">
          <div className="flex justify-center mb-8 animate-heartbeat">
            <div className="relative">
              <Heart className="w-32 h-32 text-red-500 fill-red-500 filter drop-shadow-2xl" />
              <Sparkles className="absolute -top-4 -right-4 w-12 h-12 text-yellow-400 fill-yellow-400 animate-rotate" />
              <Sparkles className="absolute -bottom-2 -left-2 w-10 h-10 text-pink-400 fill-pink-400 animate-pulse" />
            </div>
          </div>

          <h1 className="text-8xl font-bold text-white mb-6 leading-tight animate-wiggle drop-shadow-2xl" style={{ textShadow: '0 0 40px rgba(255,255,255,0.8)' }}>
            Yay!
          </h1>

          <div className="flex items-center justify-center gap-3 mb-6 animate-slideDown" style={{ animationDelay: '0.3s' }}>
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />
            <p className="text-4xl font-bold text-white drop-shadow-lg">
              Ferdaousse
            </p>
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
          </div>

          <p className="text-2xl text-white mb-8 leading-relaxed font-medium animate-slideDown drop-shadow-lg" style={{ animationDelay: '0.4s' }}>
            You just made me the happiest person!
          </p>

          <div className="flex items-center justify-center gap-2 mb-8 animate-slideDown" style={{ animationDelay: '0.5s' }}>
            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-white to-white rounded-full"></div>
            <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
            <div className="h-1 w-16 bg-gradient-to-r from-white via-white to-transparent rounded-full"></div>
          </div>

          <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/50 animate-slideDown" style={{ animationDelay: '0.6s' }}>
            <p className="text-xl text-white mb-3 leading-relaxed font-medium drop-shadow-lg">
              Happy Valentine's Day, my love! 💝
            </p>
            <p className="text-lg text-white font-semibold drop-shadow-lg">
              I can't wait to celebrate this special day with you.
            </p>
          </div>

          <div className="flex justify-center gap-4 animate-slideDown" style={{ animationDelay: '0.7s' }}>
            <Heart className="w-10 h-10 text-white fill-white animate-pulse drop-shadow-lg" />
            <Heart className="w-14 h-14 text-white fill-white animate-pulse drop-shadow-lg" style={{ animationDelay: '0.2s' }} />
            <Heart className="w-10 h-10 text-white fill-white animate-pulse drop-shadow-lg" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;