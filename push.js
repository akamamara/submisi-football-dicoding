var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BGMR42Jm1vvmoQLZkuSCr4dtGL9OeOrKz3CeubBkaJuj2V3Pqh2H4KZhZ2ej_-v03Q7s8hiby8_1f24JV9L6e9I",
    "privateKey": "YfGfMc29Mz1Y0mO5Xwudte6RJx9WFZemqQQKRit0ntU"
};


webPush.setVapidDetails(
    'mailto:aldiokta10@hotmail.co.id',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/e_PC6rqO768:APA91bH4OLfm4UbXgb01p4R1D8ntrgxavT3sh3JS2gf4fR4bONfA6kv9j4kbroTLJZ77Ee9VMKFIIBJCYh5oOvx3FT9NnvGDExBgkDVPH6LfANyyAJTJoqemV1IPDORAqyH3GDz63BCk",
    "keys": {
        "p256dh": "BAMJJ80DK/16Tr4w5j0qHB2oxCS9SbQT1tua8884VHH9l2kGHulDR7z9NBOIA5ukll5MQZ/ujlVv5uRuPXWMHJU=",
        "auth": "yqszRYRWITh3I2AGoRsqHw=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '1083178825172',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);