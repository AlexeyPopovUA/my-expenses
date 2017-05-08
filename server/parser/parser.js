const xlsx = require("xlsx");
const PaymentSchema = require("./../schemas/payment");

//todo Come up with a better pattern
const foodRegExp = new RegExp(/.*(ALBERT HEIJN|Monoprix|Cafe|Aldi|Supermark|Vomar|MABROUK|Jak|De Stadthouder|Smaczek|Carrefour).*/, "gi");
const householdRegExp = new RegExp(/.*(Kruidvat|HEMA|Ikea).*/, "gi");
const closesRegExp = new RegExp(/.*(H&M|Sting).*/, "gi");
const healthRegExp = new RegExp(/.*(Sportcity).*/, "gi");
const toiletRegExp = new RegExp(/.*(sanifair).*/, "gi");
const travellingRegExp = new RegExp(/.*(NS GROEP| NS-|SNCF|KLM|BOOKING|hotel|TRANSAVIA|Lufthansa|Vueling).*/, "gi");
const specialRegExp = new RegExp(/.*(Gemeente|postnl|Post en Office|Tax Return|Publiekshal).*/, "gi");
const mobileAndInternetRegExp = new RegExp(/.*(KPN|Vodafone).*/, "gi");
const entertainmentRegExp = new RegExp(/.*(Spotify|museum|Keukenhof).*/, "gi");
const aliexpressRegExp = new RegExp(/.*(Alipay).*/, "gi");
const amazonRegExp = new RegExp(/.*(amazon).*/, "gi");
const ebayRegExp = new RegExp(/.*(ebay).*/, "gi");
const insuranceRegExp = new RegExp(/.*(Zilveren Kruis).*/, "gi");
const rentRegExp = new RegExp(/.*(B\. van den Bergh).*/, "gi");

function prePopulateCategoryForPayment(payment, description) {
    if (description.match(foodRegExp)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.FOOD;
    } else if (description.match(householdRegExp)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.HOUSEHOLD;
    } else if (description.match(closesRegExp)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.CLOSES;
    } else if (description.match(healthRegExp)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.HEALTH;
    } else if (description.match(toiletRegExp)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.TOILET;
    } else if (description.match(travellingRegExp)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.TRAVELLING;
    } else if (description.match(specialRegExp)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.SPECIAL;
    } else if (description.match(mobileAndInternetRegExp)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.MOBILEANDINTERNET;
    } else if (description.match(entertainmentRegExp)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.ENTERTAINMENT;
    } else if (description.match(aliexpressRegExp)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.ALIEXPRESS;
    } else if (description.match(amazonRegExp)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.AMAZON;
    } else if (description.match(ebayRegExp)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.EBAY;
    } else if (description.match(insuranceRegExp)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.INSURANCE;
    } else if (description.match(rentRegExp)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.RENT;
    } else {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.OTHER;
    }
}

function readAmroReport(file) {
    const xls = xlsx.read(file);

    return xlsx.utils.sheet_to_json(xls.Sheets.Sheet0);
}

module.exports = {
    readAmroReport,
    prePopulateCategoryForPayment
};
