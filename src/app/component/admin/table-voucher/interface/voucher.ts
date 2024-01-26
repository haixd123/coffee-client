export interface Voucher{
    id: number,
    name: string,
    description: string,
    code: string,
    percentDiscount: number,
    voucherType: number,
    expiredAt: string,
}