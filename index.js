var request = require('request');
var querystring = require('querystring');
var sharepoint = require('./SharePoint');
var util=require('util');
module.exports = {
    getSharePointAppOnlyAccessToken: function (siteUrl, clientId, clientSecret, callback) {
        //first get the site realm
        getRealm(siteUrl, function (response) {
            //read realm from header
            realm = extractRealmId(response.headers[sharepoint.wwwauthenticate]);
            var body = {};
            body.grant_type = 'client_credentials';
            body.client_id = util.format('%s@%s', clientId, realm);
            body.resource = util.format('%s/%s@%s', sharepoint.sharePointPrinciple, siteUrl, realm).replace('https://','');
            body.client_secret = clientSecret;
            var formData = querystring.stringify(body);
            var contentLength = formData.length;
            //get app only access token
            request(
                {
                    url: util.format(sharepoint.authenticationUrl, realm),
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Length': contentLength
                    },
                    body: formData,
                    json:true
                },
                function(error,response,body){
                    if(error && response.StatusCode!=200){
                        throw 'can\'t get access token'
                    }
                    callback(body);
                }
            );
        })
    }
}
function getRealm(siteUrl, callback) {
    request(
        {
            url: siteUrl + sharepoint.clientSvcUrl,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ',
                'Content-Type': 'application/json'
            },
            json: true
        })
        .on('error', function (error) {
            throw 'can\t get site realm';
        })
        .on('response', function (response) {
            callback(response);
        })
}

function extractRealmId(header) {
    if (header == null) {
        throw 'fail to get realm from supplied site Url'
    }
    return header.substring(header.indexOf('realm="') + 7, header.indexOf('",'));
}