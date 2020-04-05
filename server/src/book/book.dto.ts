import { Categories } from "../category/categories.entity";

export class BookDto{
    bookname :string;
    bookpage :number;
    bookisbn :string;
    bookprice :number;
    categorybook :Categories;
}