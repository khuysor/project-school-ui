export interface CategoryType {
  id: number;
  code: string;
  name: string;
  createTime: string;
  updateTime: string;
}

export const categoryUrl = "http://localhost:8080/api/category";
