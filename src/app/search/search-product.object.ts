import { Color } from "../color/color.object";
import { ObjectDanse } from "../shared/objectDanse";
import { Type } from "../type/type.object";

export class SearchProduct{
    name: string;
    quantity: number;
    colours: Array<Color>;
    categories: Array<ObjectDanse>;
    kinds: Array<ObjectDanse>;
    boxes: Array<ObjectDanse>;
    types: Array<Type>;
    superTypes: Array<ObjectDanse>;
    available: boolean;

}