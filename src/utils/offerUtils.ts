export interface Offer {
    active: boolean;
    percentage: number;
    startDate: string;
    endDate: string;
    badge: string;
}

export function isOfferActive(offer: Offer): boolean {
    if (!offer.active) return false;

    const now = new Date();
    const start = new Date(offer.startDate);
    const end = new Date(offer.endDate);

    return now >= start && now <= end;
}

export function calculateDiscountedPrice(basePrice: number, percentage: number): number {
    return Math.round(basePrice * (1 - percentage / 100));
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}
