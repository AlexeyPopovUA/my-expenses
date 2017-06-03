const xlsx = require("xlsx");
const PaymentSchema = require("./../schemas/payment");

//todo Come up with a better pattern
const foodRegExp = /.*(ALBERT HEIJN|Snack|Billa|Gern im Stern|Kaasboer|Monoprix|Carrefour|Cafe|Aldi|Supermark|Vomar|MABROUK|Jak|De Stadthouder|Smaczek|Edeka|Spar|Kroon vis).*/i;
const householdRegExp = /.*(Kruidvat|HEMA|Ikea).*/i;
const closesRegExp = /.*(H&M|Hennes & Mauritz|Sting|Zeeman|Bershka|Zarra).*/i;
const healthRegExp = /.*(Sportcity).*/i;
const toiletRegExp = /.*(sanifair).*/i;
const travellingRegExp = /.*(NS GROEP| NS-|SNCF|KLM|BOOKING|hotel|TRANSAVIA|Lufthansa|Vueling|DB Bahn).*/i;
const specialRegExp = /.*(Gemeente|postnl|Post en Office|Tax Return|Publiekshal).*/i;
const mobileAndInternetRegExp = /.*(KPN|Vodafone).*/i;
const entertainmentRegExp = /.*(Spotify|museum|Keukenhof).*/i;
const aliexpressRegExp = /.*(Alipay).*/i;
const amazonRegExp = /.*(amazon).*/i;
const ebayRegExp = /.*(ebay).*/i;
const insuranceRegExp = /.*(Zilveren Kruis).*/i;
const rentRegExp = /.*(B\. van den Bergh).*/i;

function prePopulateCategoryForPayment(payment, description) {
    if (foodRegExp.test(description)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.FOOD;
    } else if (householdRegExp.test(description)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.HOUSEHOLD;
    } else if (closesRegExp.test(description)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.CLOSES;
    } else if (healthRegExp.test(description)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.HEALTH;
    } else if (toiletRegExp.test(description)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.TOILET;
    } else if (travellingRegExp.test(description)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.TRAVELLING;
    } else if (specialRegExp.test(description)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.SPECIAL;
    } else if (mobileAndInternetRegExp.test(description)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.MOBILEANDINTERNET;
    } else if (entertainmentRegExp.test(description)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.ENTERTAINMENT;
    } else if (aliexpressRegExp.test(description)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.ALIEXPRESS;
    } else if (amazonRegExp.test(description)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.AMAZON;
    } else if (ebayRegExp.test(description)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.EBAY;
    } else if (insuranceRegExp.test(description)) {
        payment.category = PaymentSchema.PAYMENT_CATEGORIES.INSURANCE;
    } else if (rentRegExp.test(description)) {
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
