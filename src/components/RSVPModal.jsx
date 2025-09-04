import { CheckCircle2, X } from "lucide-react";
import { Button } from "./ui/Button";


export const RSVPModal = ({ isOpen, eventTitle, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-background rounded-2xl shadow-large p-6 w-full max-w-md animate-scale-in">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Success Content */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-community-success/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-community-success" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              You're all set! 🎉
            </h2>
            <p className="text-muted-foreground">
              You've successfully joined <span className="font-medium text-foreground">"{eventTitle}"</span>
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
            We've sent you a confirmation email with event details. 
            You'll also receive a reminder 24 hours before the event.
          </div>

          <Button 
            onClick={onClose}
            className="w-full mt-6 bg-gradient-hero hover:opacity-90 transition-all duration-200"
          >
            Continue Exploring
          </Button>
        </div>
      </div>
    </div>
  );
};