import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ValueCard = ({ icon: Icon, title, description }: ValueCardProps) => {
  return (
    <Card className="value-card bg-neutral-100 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-200">
      <CardContent className="pt-6 p-0">
        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-heading font-bold text-xl text-primary mb-2">{title}</h3>
        <p className="text-neutral-400">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ValueCard;
