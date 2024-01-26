export interface Voucher{
    id: string,
    description: string,
    percentDiscount: number,
    voucherType: number,
    maxDiscount: number,
    createdAt: Date | string,
    expiredAt: Date | string,
}