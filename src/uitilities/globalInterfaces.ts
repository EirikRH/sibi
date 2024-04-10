import { Decimal, JsonValue } from '@prisma/client/runtime/library';

export interface ExistingItem {
  id: number;
  user_id: number;
  date_posted: Date;
  image_location: string;
  description: string;
  category: string;
  price: Decimal;

  brand?: string | null;
  model?: string | null;
  date_sold?: Date | null;
}

export interface NewItem {
  image_location: string;
  description: string;
  category: string;
  price: number;

  brand?: string;
  model?: string;
  size?: string;
}

export interface AdvancedSearchTerms {
  category?: string;
  brand?: string;
  model?: string;
  size?: string;
  description: string;
}

export interface ExistingUser {
  id: number;
  username: string;
  email: string;
  password: string;
  date_joined: Date;

  rating: Decimal | null;
  personal_info: JsonValue | null;
}

export interface NewUser {
  username: string;
  email: string;
  password: string;
}

export interface LoginAttempt {
  email: string;
  password: string;
}
export interface TokenContent {
  id: number;
  username: string;
}
