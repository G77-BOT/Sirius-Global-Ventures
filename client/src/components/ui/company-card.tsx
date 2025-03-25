import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Subsidiary, Stat } from "@shared/schema";
import { Badge } from "@/components/ui/badge";

interface CompanyCardProps {
  subsidiary: Subsidiary;
  stats?: Stat[];
}

const CompanyCard = ({ subsidiary, stats = [] }: CompanyCardProps) => {
  const { 
    id, 
    name, 
    shortName, 
    description, 
    industry, 
    established, 
    status, 
    logoInitials, 
    logoColor, 
    detailedDescription,
    websiteUrl
  } = subsidiary;

  return (
    <Card className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200" id={`company-${id}`}>
      <div className="flex flex-col lg:flex-row">
        <div 
          className="lg:w-1/3 bg-gradient-to-br p-8 flex items-center justify-center"
          style={{ 
            background: `linear-gradient(to bottom right, ${logoColor}, ${adjustColorBrightness(logoColor, -20)})` 
          }}
        >
          <div className="text-center">
            <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
              <span className="text-secondary font-bold text-2xl">{logoInitials}</span>
            </div>
            <h3 className="font-heading font-bold text-2xl text-white mb-2">{name}</h3>
            <p className="text-white/80 text-sm">{description}</p>
          </div>
        </div>
        <div className="lg:w-2/3 p-8">
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-xs text-neutral-300 uppercase font-medium mb-1">Established {established}</div>
                <h3 className="font-heading font-bold text-2xl text-primary">{industry}</h3>
              </div>
              <StatusBadge status={status} />
            </div>
            
            <p className="text-neutral-400 mb-6">{detailedDescription}</p>
            
            {stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-neutral-100 p-3 rounded-md text-center">
                    <div className="text-primary font-bold text-xl">{stat.value}</div>
                    <div className="text-neutral-300 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-auto">
              {websiteUrl ? (
                <a 
                  href={websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-secondary hover:text-secondary-dark font-medium"
                >
                  Visit {shortName}
                  <ExternalLink className="h-5 w-5 ml-1" />
                </a>
              ) : (
                <Link href={`/companies/${id}`}>
                  <a className="inline-flex items-center text-secondary hover:text-secondary-dark font-medium">
                    Learn more about {shortName}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Helper function to adjust color brightness
function adjustColorBrightness(color: string, percent: number) {
  if (color.startsWith('#')) {
    let hex = color.slice(1);
    
    // Convert to RGB
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);
    
    // Adjust brightness
    r = Math.max(0, Math.min(255, r + percent));
    g = Math.max(0, Math.min(255, g + percent));
    b = Math.max(0, Math.min(255, b + percent));
    
    // Convert back to hex
    const rHex = r.toString(16).padStart(2, '0');
    const gHex = g.toString(16).padStart(2, '0');
    const bHex = b.toString(16).padStart(2, '0');
    
    return `#${rHex}${gHex}${bHex}`;
  }
  
  return color;
}

const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'active') {
    return <Badge className="bg-success/10 text-success px-3 py-1 rounded-full text-xs font-medium">Active</Badge>;
  } else if (status === 'coming-soon') {
    return <Badge className="bg-warning/10 text-warning px-3 py-1 rounded-full text-xs font-medium">Coming Soon</Badge>;
  } else {
    return <Badge className="bg-neutral-100 text-neutral-500 px-3 py-1 rounded-full text-xs font-medium">{status}</Badge>;
  }
};

export default CompanyCard;
