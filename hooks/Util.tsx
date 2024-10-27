
const nfGermanMoney = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
})

export function formatPriceGerman(price: number) {
    return price ? nfGermanMoney.format(price) : ""
}