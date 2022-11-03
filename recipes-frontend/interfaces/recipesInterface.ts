export interface Iingredients {
    name:string;
    quantity:string;
    _id:string;
}

export interface IRecipe{
    _id:string;
    title:string;
    steps:string[];
    ingredients:Iingredients[];
    img:string;
    __v?:number;
}

export interface IGetRecipes {
    statusCode: number,
    success: boolean,
    body:[]
}