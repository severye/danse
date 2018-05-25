import { Color } from "../color/color.object";
import { ObjectDanse } from "../shared/objectDanse";
import { SizeQuantity } from "../shared/sizequantity.object";


export class Product{
    id: string;
    name: string;
    totalQuantity: number;
    picture: string;
    comment: string;
    colour: Color;
    category: ObjectDanse;
    type: ObjectDanse;
    kind : ObjectDanse;
    box: ObjectDanse;
    sizeQuantities: Array<SizeQuantity>;
    quantityBooked: number;
    quantityAvailable: number;
}