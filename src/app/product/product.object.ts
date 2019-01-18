import { Color } from "../color/color.object";
import { ObjectDanse } from "../shared/objectDanse";
import { SizeQuantity } from "../shared/sizequantity.object";
import { Book } from "../book/book.object";
import { Picture } from "../picture/picture.object";
import { Type } from "../type/type.object";


export class Product{
    id: string;
    name: string;
    totalQuantity: number;
    picture: string;
    comment: string;
    colour: Color;
    category: ObjectDanse;
    type: Type;
    kind : ObjectDanse;
    box: ObjectDanse;
    sizeQuantities: Array<SizeQuantity>;
    quantityBooked: number;
    quantityAvailable: number;
    productBook: Array<Book>;
    pictures: Array<Picture>;
}