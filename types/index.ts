import CATEGORIES from "@/constants/Index";

type Category = keyof typeof CATEGORIES;

interface ToDo {
  text: string;
  category: Category;
  completed: boolean;
}

export type {
  Category,
  ToDo
};
