import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RatingStars from "./rating-stars";

interface ReviewCardProps {
  name: string;
  avatarSrc: string;
  rating: number;
  review: string;
}

const ReviewCard = ({ name, avatarSrc, rating, review }: ReviewCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={avatarSrc} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle>{name}</CardTitle>
          <div className="flex">
            <RatingStars rating={rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{review}</p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
