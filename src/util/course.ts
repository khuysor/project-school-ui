import { CategoryType } from "./category";

export interface Course {
  id: number;
  courseName: string;
  teacherName: string;
  description: string;
  price: number;
  createTime: string;
  updateTime: string;
  category: CategoryType;
  imageName: string;
  index: number;
  cateId: number;
  imgUrl: string;
}
export interface CourseUpdate {
  courseName: string;
  teacherName: string;
  description: string;
  price: number;
  imageName: string;
  imgUrl: string;
  cateId: number;
}
export const courseUrl = "http://localhost:8080/api/categories/course";
