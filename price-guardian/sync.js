/**
 * OFFICIAL SALSABILAH AMIN EMPIRES - CORE ENGINE
 * Registered in UK: 09814720
 * Strategy: MD AL AMIN SOHAG
 */

const EMPIRE_CONFIG = {
    API_KEY: "9957b74834b6681bca3660749917d404134724ff49426",
    GATEWAY_URL: "https://amarsmsbd.xyz/api/smsSendApi",
    SENDER_ID: "880961761xxxx", 
    EMI_DIVIDER: 6
};

async function processSmartReminders(customerName, totalDue, mobile) {
    let cleanDue = parseFloat(totalDue.toString().replace(/[^0-9.]/g, ''));
    if (isNaN(cleanDue) || cleanDue <= 0) return;

    let installmentAmount = (cleanDue / EMPIRE_CONFIG.EMI_DIVIDER).toFixed(2);
    let nextDate = new Date();
    nextDate.setMonth(nextDate.getMonth() + 1);
    nextDate.setDate(10);

    let message = `Shu-priyo ${customerName}, Salsabilah Electronics-e apnar kisti ${installmentAmount} TK. Shesh tarik: ${nextDate.toLocaleDateString('en-GB')}. Dhonno-bad.`;

    const params = new URLSearchParams({
        apiKey: EMPIRE_CONFIG.API_KEY,
        smsText: message,
        number: mobile,
        senderid: EMPIRE_CONFIG.SENDER_ID
    });

    try {
        await fetch(`${EMPIRE_CONFIG.GATEWAY_URL}?${params.toString()}`, { method: 'GET' });
    } catch (e) {
        console.log("Sync Error");
    }
}

// System Init
console.log("Salsabilah Electronics Ltd - Online.");
