const xlsx = require("xlsx");
const PaymentSchema = require("./../schemas/payment");

//todo Come up with a better pattern
const foodRegExp = /.*(ALBERT HEIJN|Cafe|Aldi|Supermark|Vomar|MABROUK|Jak|De Stadthouder|Smaczek).*/gi;
const householdRegExp = /.*(Kruidvat|HEMA|Ikea).*/gi;
const closesRegExp = /.*(H&M|Sting).*/gi;
const healthRegExp = /.*(Sportcity).*/gi;
const toiletRegExp = /.*(sanifair).*/gi;
const travellingRegExp = /.*(NS GROEP|KLM|BOOKING|hotel|TRANSAVIA|Lufthansa|Vueling).*/gi;
const specialRegExp = /.*(Gemeente|postnl|Post en Office|Tax Return|Publiekshal).*/gi;
const mobileAndInternetRegExp = /.*(KPN|Vodafone).*/gi;
const entertainmentRegExp = /.*(Spotify|museum|Keukenhof).*/gi;
const aliexpressRegExp = /.*(Alipay).*/gi;
const amazonRegExp = /.*(amazon).*/gi;
const ebayRegExp = /.*(ebay).*/gi;
const insuranceRegExp = /.*(Zilveren Kruis).*/gi;
const rentRegExp = /.*(B. van den Bergh).*/gi;

//todo Replace hardcoded categories with constants
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
