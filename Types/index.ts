interface product {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  title: string;
  description: string;
  price: number;
  available: number;
  discount: number;
  category: string;
  thumbnail: string;
  isArchived: string | null;
  images: string | null;
  sizes: string | null;
  colors: string;
}

interface cart {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  price: number;
  available: number;
  discount: number;
  category: string;
  thumbnail: string;
  isArchived: string | null;
  images: string | null;
  sizes: string | null;
  colors: string;
  qty: number;
}

interface order {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  totalPrice: number;
  orderedItems: string;
  status: string;
}

interface user {
  id: string;
  name: string;
  email: string | null;
  emailVerified: boolean;
  image: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
