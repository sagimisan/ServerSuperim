export interface userProfileData {
  name: string;
  email: string;
  password:string;
  grade: string;
  rate: number;
  hourPrice:number;
  shoppingListId:string
  shoppingListsIDS:string[]
}

export type productData={
  price:number,
  department:number,
  side:number,
  row:number,
  flowr:number,
      name: string;
  quantity: number;
  // id: number;
  isSelected: boolean;
  picture?: string;
}