import { Heart, MapPin, Calendar, Users } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

export const EventCard = ({ event, onEventClick, onJoinEvent }) => {
  const handleJoinClick = (e) => {
    e.stopPropagation();
    onJoinEvent(event.id);
  };

  const getTypeColor = (type) => {
    const colors = {
      Workshop: "bg-community-primary text-white",
      Music: "bg-community-secondary text-white", 
      Sports: "bg-community-warm text-foreground",
      Meetup: "bg-accent text-accent-foreground"
    };
    return colors[type] || "bg-muted text-muted-foreground";
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-[1.02] animate-fade-in"
      onClick={() => onEventClick(event)}
    >
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge className={getTypeColor(event.type)}>
            {event.type}
          </Badge>
        </div>
        {event.isJoined && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-community-success text-white">
              <Heart className="w-3 h-3 mr-1 fill-current" />
              Joined
            </Badge>
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {event.title}
          </h3>
        </div>

        {/* Event Details */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2 text-community-primary" />
            <span>{event.date}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 text-community-secondary" />
            <span className="truncate">{event.location}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="w-4 h-4 mr-2 text-community-warm" />
              <span>
                {event.attendees} {event.maxAttendees && `/ ${event.maxAttendees}`} attending
              </span>
            </div>
          </div>
        </div>

        {/* Host Info & Join Button */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="text-sm text-muted-foreground">
            by <span className="font-medium text-foreground">{event.host}</span>
          </div>
          
          <Button 
            size="sm" 
            variant={event.isJoined ? "secondary" : "default"}
            onClick={handleJoinClick}
            className="ml-auto transition-all duration-200 hover:scale-105"
          >
            {event.isJoined ? "Joined" : "Join Event"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
