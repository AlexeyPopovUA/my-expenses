const xlsx = require("xlsx");

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
        payment.category = "Food";
    } else if (householdRegExp.test(description)) {
        payment.category = "Household";
    } else if (closesRegExp.test(description)) {
        payment.category = "Closes";
    } else if (healthRegExp.test(description)) {
        payment.category = "Health";
    } else if (toiletRegExp.test(description)) {
        payment.category = "Toilet";
    } else if (travellingRegExp.test(description)) {
        payment.category = "Travelling";
    } else if (specialRegExp.test(description)) {
        payment.category = "Special";
    } else if (mobileAndInternetRegExp.test(description)) {
        payment.category = "Mobile and internet";
    } else if (entertainmentRegExp.test(description)) {
        payment.category = "Entertainment";
    } else if (aliexpressRegExp.test(description)) {
        payment.category = "Ali Express";
    } else if (amazonRegExp.test(description)) {
        payment.category = "Amazon";
    } else if (ebayRegExp.test(description)) {
        payment.category = "Ebay";
    } else if (insuranceRegExp.test(description)) {
        payment.category = "Insurance";
    } else if (rentRegExp.test(description)) {
        payment.category = "Rent";
    } else {
        payment.category = "Other";
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
