import { Address } from "./address.model";
import { Email } from "./email.model";
import { Phone } from "./phone.model";

export interface Contact{
    id:number;
    first_name:string;
    last_name:string;
    phones: Phone[];
    emails:Email[];
    addresses:Address[];

}