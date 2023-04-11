export interface Customer {
    customer_id?:number,
    company_name:String,
    contact_name:String,
    contact_title:String,
    phone:String,
    fax:String,
    direccion: {
        address:String,
        city:String,
        region:String,
        postal_code:String,
        country:String,
    }

}
