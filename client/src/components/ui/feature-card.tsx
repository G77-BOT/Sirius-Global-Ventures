import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="bg-white p-6 rounded-md shadow-sm hover:shadow transition-shadow duration-200">
      <CardContent className="p-0">
        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-secondary" />
        </div>
        <h4 className="font-heading font-bold text-lg text-primary mb-2">{title}</h4>
        <p className="text-neutral-400 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
