To exclude pages from the sitemap, add a `sitemap="no"` custom attribute to the body element. To do this, go to the page you want to exclude from the sitemap, then click on the "Body" element in the navigator on the left:

![](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/932858ff-b6fb-4028-a4c5-47e0fbd1683c/Screen_Shot_2021-07-19_at_12.36.47_PM.png)

Click on the "settings gear" on the right, then click the "+" sign under "Custom Attributes":

![](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/44dfa732-0c38-4653-97c0-18ca18b4f9fb/Screen_Shot_2021-07-19_at_12.38.55_PM.png)

Then input "sitemap" for the Name, and "no" for the Value:

![](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/538d2940-41da-46d0-b68a-631c00566493/Screen_Shot_2021-07-19_at_12.39.38_PM.png)

After that, publish your Webflow site and wait for it to deploy to Netlify. After that, this page should be excluded from your sitemap. Repeat for any other pages you want to exclude.