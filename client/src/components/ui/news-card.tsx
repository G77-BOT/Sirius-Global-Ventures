import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface NewsCardProps {
  id: number;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  publishDate: Date;
  subsidiaryId: number | null;
  subsidiaryName?: string;
  subsidiaryInitials?: string;
}

const NewsCard = ({
  id,
  title,
  content,
  category,
  imageUrl,
  publishDate,
  subsidiaryId,
  subsidiaryName = "Global Holdings",
  subsidiaryInitials = "GH"
}: NewsCardProps) => {
  const formattedDate = formatDistanceToNow(new Date(publishDate), { addSuffix: true });
  const isGlobalHoldings = !subsidiaryId;
  const bgColor = isGlobalHoldings ? "bg-primary" : "bg-secondary";
  
  // Default placeholder image if none provided
  const defaultImage = "https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400&q=80";

  return (
    <Card className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="h-48 bg-neutral-200 relative">
        <img 
          src={imageUrl || defaultImage} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-0 left-0 ${bgColor} text-white text-xs font-medium px-3 py-1`}>
          {category}
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className={`w-6 h-6 ${bgColor} rounded-full flex items-center justify-center mr-2`}>
            <span className="text-white font-bold text-xs">{subsidiaryInitials}</span>
          </div>
          <span className="text-neutral-300 text-sm">{subsidiaryName}</span>
          <span className="mx-2 text-neutral-300">•</span>
          <span className="text-neutral-300 text-sm">{formattedDate}</span>
        </div>
        <h3 className="font-heading font-bold text-xl text-primary mb-2">{title}</h3>
        <p className="text-neutral-400 text-sm mb-4">{content}</p>
        <Link href={`/news/${id}`}>
          <a className="text-secondary hover:text-secondary-dark font-medium text-sm inline-flex items-center">
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </Link>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
