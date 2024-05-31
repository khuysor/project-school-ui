export interface StudentType {
  id: number;
  firstName: string; // Explicitly define data type with null handling
  lastName: string;
  gender:string;
  age: number;
  email: string;
  phone: string;
  address: string;
}
export const urlStu = "http://localhost:8080/api/students";
