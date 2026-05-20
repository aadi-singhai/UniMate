import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Calendar, FileText, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: CheckCircle2,
    title: 'Smart Attendance',
    description: 'Mark attendance automatically via WiFi detection. Say goodbye to proxy attendance.',
    color: '#335CFF',
    bgClass: 'bg-[#335CFF]/15',
  },
  {
    icon: Calendar,
    title: 'Manage Timetable',
    description: 'View your weekly schedule with color-coded classes and never miss a lecture.',
    color: '#19E68C',
    bgClass: 'bg-[#19E68C]/15',
  },
  {
    icon: FileText,
    title: 'Access Notes',
    description: 'Download study materials and notes shared by teachers in one place.',
    color: '#F59E0B',
    bgClass: 'bg-[#F59E0B]/15',
  },
  {
    icon: MessageSquare,
    title: 'Complaint System',
    description: 'Submit and track complaints with real-time status updates from admins.',
    color: '#8B5CF6',
    bgClass: 'bg-[#8B5CF6]/15',
  },
];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const activeSlide = slides[currentSlide];
  const IconComponent = activeSlide.icon;

  return (
    <div className="flex flex-col min-h-screen bg-background p-6 select-none justify-between">
      {/* Top Bar Actions Context */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSkip}
          className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10"
        >
          Skip
        </button>
      </div>

      {/* Main Slides Interactive Viewport Section */}
      <div className="flex-1 flex flex-col items-center justify-center my-8">
        <div className="w-full max-w-sm overflow-hidden min-h-[380px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="flex flex-col items-center text-center px-4"
            >
              <div
                className={`w-32 h-32 rounded-full flex items-center justify-center mb-8 shadow-sm ${activeSlide.bgClass}`}
              >
                <IconComponent
                  className="w-14 h-14 transition-transform duration-3xl hover:scale-110"
                  style={{ color: activeSlide.color }}
                />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                {activeSlide.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm max-w-[280px]">
                {activeSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Controls Execution Footer */}
      <div className="flex flex-col gap-6 pb-4 max-w-sm mx-auto w-full">
        {/* Progress Navigation Matrix Dots */}
        <div className="flex justify-center gap-2.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-muted hover:bg-muted-foreground/40'
                }`}
              aria-label={`Navigate step view pagination control indicator element index ${index + 1}`}
            />
          ))}
        </div>

        {/* Dynamic Context Submission Button Link */}
        <Button onClick={handleNext} className="w-full h-14 rounded-2xl font-medium shadow-sm" size="lg">
          {currentSlide < slides.length - 1 ? (
            <>
              Next <ArrowRight className="ml-2 w-5 h-5 animate-pulse" />
            </>
          ) : (
            'Get Started'
          )}
        </Button>
      </div>
    </div>
  );
}