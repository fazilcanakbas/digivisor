export interface Tour {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  price: number;
  duration: number;
  location: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  includesList: string[];
  excludesList: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  tourName: string;
}