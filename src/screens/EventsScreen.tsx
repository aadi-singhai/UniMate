import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Plus, X } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface EventsScreenProps {
  onBack: () => void;
  userRole: 'student' | 'teacher' | 'admin';
}

const events = [
  {
    id: 1,
    title: 'Tech Fest 2024',
    date: 'December 15, 2024',
    time: '10:00 AM - 6:00 PM',
    location: 'Main Auditorium',
    description: 'Annual technology festival featuring hackathons, tech talks, and project exhibitions. Join us for a day of innovation and creativity.',
    attendees: 350,
    image: 'https://images.unsplash.com/photo-1700936655767-7049129f1995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZXZlbnQlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc2NDc5ODAxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Technical',
    color: '#335CFF',
  },
  {
    id: 2,
    title: 'AI/ML Workshop',
    date: 'December 18, 2024',
    time: '2:00 PM - 5:00 PM',
    location: 'Computer Lab 301',
    description: 'Hands-on workshop on Machine Learning fundamentals and practical implementation using Python and TensorFlow.',
    attendees: 80,
    image: 'https://images.unsplash.com/photo-1762158007836-25d13ab34c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwd29ya3Nob3B8ZW58MXx8fHwxNzY0Nzk4MDE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Workshop',
    color: '#19E68C',
  },
  {
    id: 3,
    title: 'Cultural Fest',
    date: 'December 22, 2024',
    time: '5:00 PM - 10:00 PM',
    location: 'Campus Grounds',
    description: 'Celebrate diversity with music, dance, drama, and cultural performances from students around the world.',
    attendees: 500,
    image: 'https://images.unsplash.com/photo-1563607813-c3a0f0856483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjBmZXN0aXZhbHxlbnwxfHx8fDE3NjQ3OTgwMTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Cultural',
    color: '#F59E0B',
  },
];

export function EventsScreen({ onBack, userRole }: EventsScreenProps) {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [showAddEvent, setShowAddEvent] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <GlassCard className="p-6 rounded-b-3xl mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (selectedEvent) {
                  setSelectedEvent(null);
                } else if (showAddEvent) {
                  setShowAddEvent(false);
                } else {
                  onBack();
                }
              }}
              className="p-2 hover:bg-secondary/50 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-2xl">
              {selectedEvent ? selectedEvent.title : showAddEvent ? 'Add Event' : 'Events'}
            </h2>
          </div>
          {!selectedEvent && !showAddEvent && userRole === 'admin' && (
            <button
              onClick={() => setShowAddEvent(true)}
              className="p-2 bg-primary text-primary-foreground rounded-full hover:scale-110 transition-transform"
            >
              <Plus className="w-6 h-6" />
            </button>
          )}
          {!selectedEvent && !showAddEvent && userRole === 'teacher' && (
            <button
              onClick={() => setShowAddEvent(true)}
              className="p-2 bg-primary text-primary-foreground rounded-full hover:scale-110 transition-transform"
            >
              <Plus className="w-6 h-6" />
            </button>
          )}
        </div>
      </GlassCard>

      <div className="px-6">
        <AnimatePresence mode="wait">
          {showAddEvent ? (
            /* Add Event Form */
            <motion.div
              key="add-event"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="bg-card border border-border rounded-3xl p-6 space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Event Title</label>
                  <Input placeholder="Enter event title" className="h-12 rounded-2xl" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Date</label>
                  <Input type="date" className="h-12 rounded-2xl" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Start Time</label>
                    <Input type="time" className="h-12 rounded-2xl" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">End Time</label>
                    <Input type="time" className="h-12 rounded-2xl" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Location</label>
                  <Input placeholder="Event location" className="h-12 rounded-2xl" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Description</label>
                  <Textarea placeholder="Event description" className="rounded-2xl min-h-[100px]" />
                </div>
                <div className="flex gap-3">
                  <Button onClick={() => setShowAddEvent(false)} variant="outline" className="flex-1 rounded-2xl">
                    Cancel
                  </Button>
                  <Button className="flex-1 rounded-2xl">Create Event</Button>
                </div>
              </div>
            </motion.div>
          ) : selectedEvent ? (
            /* Event Detail */
            <motion.div
              key="event-detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="bg-card border border-border rounded-3xl overflow-hidden">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className="px-4 py-2 rounded-full text-white text-sm backdrop-blur-md"
                      style={{ backgroundColor: `${selectedEvent.color}CC` }}
                    >
                      {selectedEvent.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h2>{selectedEvent.title}</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="w-5 h-5" />
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="w-5 h-5" />
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-5 h-5" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Users className="w-5 h-5" />
                      <span>{selectedEvent.attendees} attendees</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <h4 className="mb-2">About Event</h4>
                    <p className="text-muted-foreground leading-relaxed">{selectedEvent.description}</p>
                  </div>
                </div>
              </div>
              <Button className="w-full h-14 rounded-2xl" size="lg">
                Register for Event
              </Button>
            </motion.div>
          ) : (
            /* Events List */
            <motion.div
              key="events-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {events.map((event, index) => (
                <motion.button
                  key={event.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedEvent(event)}
                  className="w-full bg-card border border-border rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform text-left"
                >
                  <div className="relative h-32">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-white text-xs backdrop-blur-md bg-white/20 px-3 py-1 rounded-full">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="mb-2">{event.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date.split(',')[0]}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees}</span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}