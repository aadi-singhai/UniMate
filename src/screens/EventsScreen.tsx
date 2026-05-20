import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Plus } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface EventsScreenProps {
  onBack: () => void;
  userRole: 'student' | 'teacher' | 'admin';
}

const INITIAL_EVENTS = [
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
    image: 'https://images.unsplash.com/photo-1563607813-c3a0f0856483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjBmZXN0aXZhbHxlbnwxfHx8fDE3Gx79ODAxMTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Cultural',
    color: '#F59E0B',
  },
];

export function EventsScreen({ onBack, userRole }: EventsScreenProps) {
  const [eventList, setEventList] = useState(INITIAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<typeof INITIAL_EVENTS[0] | null>(null);
  const [showAddEvent, setShowAddEvent] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, name: value }));
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return;

    const newEvent = {
      id: Date.now(),
      title: formData.title,
      date: new Date(formData.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      time: `${formData.startTime || '12:00 PM'} - ${formData.endTime || '1:00 PM'}`,
      location: formData.location || 'TBD',
      description: formData.description,
      attendees: 0,
      image: 'https://images.unsplash.com/photo-1700936655767-7049129f1995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80', // Default placeholder fallback
      category: 'General',
      color: '#6366F1',
    };

    setEventList((prev) => [newEvent, ...prev]);
    setShowAddEvent(false);
    // Reset Form
    setFormData({ title: '', date: '', startTime: '', endTime: '', location: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <GlassCard className="p-6 rounded-b-3xl mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (selectedEvent) setSelectedEvent(null);
                else if (showAddEvent) setShowAddEvent(false);
                else onBack();
              }}
              className="p-2 hover:bg-secondary/50 rounded-full transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-semibold tracking-tight">
              {selectedEvent ? selectedEvent.title : showAddEvent ? 'Add Event' : 'Events'}
            </h1>
          </div>

          {!selectedEvent && !showAddEvent && (userRole === 'admin' || userRole === 'teacher') && (
            <button
              onClick={() => setShowAddEvent(true)}
              className="p-2 bg-primary text-primary-foreground rounded-full hover:scale-110 transition-transform shadow-md"
              aria-label="Create new event"
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <form onSubmit={handleCreateEvent} className="bg-card border border-border rounded-3xl p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Event Title</label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter event title"
                    className="h-12 rounded-2xl"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Date</label>
                  <Input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="h-12 rounded-2xl"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Start Time</label>
                    <Input
                      name="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      className="h-12 rounded-2xl"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">End Time</label>
                    <Input
                      name="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      className="h-12 rounded-2xl"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Location</label>
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Event location"
                    className="h-12 rounded-2xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Description</label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Event description"
                    className="rounded-2xl min-h-[100px]"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button type="button" onClick={() => setShowAddEvent(false)} variant="outline" className="flex-1 rounded-2xl h-12">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 rounded-2xl h-12">Create Event</Button>
                </div>
              </form>
            </motion.div>
          ) : selectedEvent ? (
            /* Event Detail View */
            <motion.div
              key="event-detail"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-6"
            >
              <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className="px-4 py-1.5 rounded-full text-white text-xs font-medium backdrop-blur-md"
                      style={{ backgroundColor: `${selectedEvent.color}CC` }}
                    >
                      {selectedEvent.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Users className="w-5 h-5 text-primary" />
                      <span>{selectedEvent.attendees} attendees</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <h3 className="font-semibold text-sm mb-2">About Event</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedEvent.description}</p>
                  </div>
                </div>
              </div>
              <Button className="w-full h-14 rounded-2xl text-base font-medium" size="lg">
                Register for Event
              </Button>
            </motion.div>
          ) : (
            /* Events Cards List */
            <motion.div
              key="events-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {eventList.map((event, index) => (
                <motion.button
                  key={event.id}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => setSelectedEvent(event)}
                  className="w-full bg-card border border-border rounded-3xl overflow-hidden hover:scale-[1.01] active:scale-[0.99] transition-all text-left block shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <div className="relative h-32">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-white text-[11px] font-medium backdrop-blur-md bg-white/20 px-2.5 py-1 rounded-full">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className="font-semibold text-base mb-1.5 text-card-foreground">{event.title}</h2>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>{event.date.split(',')[0]}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-primary" />
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