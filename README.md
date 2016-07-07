# SharePoint-apponly-node
access SharePoint using client credentials "apponly" from nodejs applications
<br/><code>run npm install sharepoint-apponly-node --save</code><br/>

1. Require the sharepoint-apponly module 
<br/>
<code>
var sharepoint=require('sharepoint-apponly-node');
</code>
2. Execute call to getSharePointAppOnlyAccessToken and get the token response body in the callback
<code>
sharepoint.getSharePointAppOnlyAccessToken('https://yoursubdomain.sharepoint.com','YourClientId','YourClientSecret',function(response){
    console.log(response);
});
</code>
<br/>
the result will be something like 
![Client Credentials Token Response](./result.png)