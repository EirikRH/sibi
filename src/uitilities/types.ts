import { Decimal, JsonValue } from '@prisma/client/runtime/library';

export type ExistingItem = {
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
};

export type NewItem = {
  image_location: string;
  description: string;
  category: string;
  price: number;

  brand?: string;
  model?: string;
  size?: string;
};

export type AdvancedSearchTerms = {
  category?: string;
  brand?: string;
  model?: string;
  size?: string;
  description: string;
};

export type ExistingUser = {
  id: number;
  username: string;
  email: string;
  password: string;
  date_joined: Date;

  rating: Decimal | null;
  personal_info: JsonValue | null;
};

export type NewUser = {
  username: string;
  email: string;
  password: string;
};

export type LoginAttempt = {
  email: string;
  password: string;
};
export type TokenContent = {
  id: number;
  email: string;
  password: string;
};
