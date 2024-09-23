import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Ratings from "./ratings";

interface ReviewCardProps {
  productId: number;
  id: number;
  userId: string;
  content: string;
  rating: number;
  user: { name: string; email: string; image?: string };
}

const ReviewCard = ({ content, rating, user }: ReviewCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle>{user.name}</CardTitle>
          <div className="flex">
            <Ratings rating={rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
