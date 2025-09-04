import { X, Heart, MapPin, Calendar, Users, Clock } from "lucide-react";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";


export const EventDetailModal = ({ event,isOpen,onClose,onJoinEvent}) => {
  if (!isOpen || !event) return null;

  const handleJoinClick = () => {
    onJoinEvent(event.id);
  };

  const getTypeColor = () => {
    const colors = {
      Workshop: "bg-community-primary text-white",
      Music: "bg-community-secondary text-white", 
      Sports: "bg-community-warm text-foreground",
      Meetup: "bg-accent text-accent-foreground"
    };
    return colors || "bg-muted text-muted-foreground";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-2xl shadow-large animate-scale-in">
        {/* Header Image */}
        <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Close Button */}
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>

          {/* Event Type Badge */}
          <div className="absolute bottom-4 left-4">
            <Badge className={getTypeColor(event.type)}>
              {event.type}
            </Badge>
          </div>

          {/* Joined Badge */}
          {event.isJoined && (
            <div className="absolute bottom-4 right-4">
              <Badge variant="secondary" className="bg-community-success text-white">
                <Heart className="w-3 h-3 mr-1 fill-current" />
                Joined
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title & Host */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {event.title}
            </h1>
            <p className="text-muted-foreground">
              Hosted by <span className="font-medium text-foreground">{event.host}</span>
            </p>
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-community-primary/10 rounded-lg">
                <Calendar className="w-5 h-5 text-community-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{event.date}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 bg-community-secondary/10 rounded-lg">
                <MapPin className="w-5 h-5 text-community-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{event.location}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 bg-community-warm/10 rounded-lg">
                <Users className="w-5 h-5 text-community-warm" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Attendees</p>
                <p className="font-medium">
                  {event.attendees} {event.maxAttendees && `/ ${event.maxAttendees}`} going
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">2-3 hours</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About this event</h3>
            <p className="text-muted-foreground leading-relaxed">
              {event.description || "Join us for an amazing community event where you'll meet like-minded people, learn new skills, and have a great time together. This event is designed to bring our local community closer and create meaningful connections."}
            </p>
          </div>

          {/* Action Button */}
          <div className="sticky bottom-0 pt-4 bg-background border-t border-border">
            <Button 
              onClick={handleJoinClick}
              className={`w-full py-6 text-lg font-medium transition-all duration-200 hover:scale-[1.02] ${
                event.isJoined 
                  ? 'bg-community-success hover:bg-community-success/90' 
                  : 'bg-gradient-hero hover:opacity-90'
              }`}
            >
              {event.isJoined ? (
                <>
                  <Heart className="w-5 h-5 mr-2 fill-current" />
                  You're Going!
                </>
              ) : (
                'Join This Event'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};