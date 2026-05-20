import React, { useState } from 'react';
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
  },
  {
    icon: Calendar,
    title: 'Manage Timetable',
    description: 'View your weekly schedule with color-coded classes and never miss a lecture.',
    color: '#19E68C',
  },
  {
    icon: FileText,
    title: 'Access Notes',
    description: 'Download study materials and notes shared by teachers in one place.',
    color: '#F59E0B',
  },
  {
    icon: MessageSquare,
    title: 'Complaint System',
    description: 'Submit and track complaints with real-time status updates from admins.',
    color: '#8B5CF6',
  },
];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  return (
    <div className="flex flex-col min-h-screen bg-background p-6">
      <div className="flex justify-end mb-4">
        <button onClick={handleSkip} className="text-muted-foreground text-sm">
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center max-w-sm"
          >
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center mb-8"
              style={{ backgroundColor: `${slides[currentSlide].color}20` }}
            >
              {React.createElement(slides[currentSlide].icon, {
                className: 'w-16 h-16',
                style: { color: slides[currentSlide].color },
              })}
            </div>
            <h2 className="text-3xl mb-4">{slides[currentSlide].title}</h2>
            <p className="text-muted-foreground leading-relaxed">{slides[currentSlide].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-center gap-2 mb-4">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-muted'
              }`}
            />
          ))}
        </div>
        <Button onClick={handleNext} className="w-full h-14 rounded-2xl" size="lg">
          {currentSlide < slides.length - 1 ? (
            <>
              Next <ArrowRight className="ml-2 w-5 h-5" />
            </>
          ) : (
            'Get Started'
          )}
        </Button>
      </div>
    </div>
  );
}
