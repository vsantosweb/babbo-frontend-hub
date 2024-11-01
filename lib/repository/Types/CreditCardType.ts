export type CreditCardType = {
    number: string
    holder_name: string
    exp_month: string
    exp_year: string
    cvv: string
    billing_address: {
        line_1: string
        zip_code: string
        city: string
        state: string
        country: string
    }
}