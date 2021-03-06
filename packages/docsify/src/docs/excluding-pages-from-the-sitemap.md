# Excluding Pages From the Sitemap

To exclude pages from the sitemap, add a `sitemap="no"` custom attribute to the body element. To do this, go to the page you want to exclude from the sitemap, then click on the "Body" element in the navigator on the left:

<p style={{"marginLeft":"auto","marginRight":"auto","width":192,"height":768,"maxWidth":"100%"}}><img src="https://smarterlabs.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F932858ff-b6fb-4028-a4c5-47e0fbd1683c%2FScreen_Shot_2021-07-19_at_12.36.47_PM.png?table=block&id=a603aa38-e46f-4f6e-9868-ce37f94f7ecc&spaceId=2089b25c-d262-479d-a1ff-9c3871a1c564" alt="" /></p>
			

Click on the "settings gear" on the right, then click the "+" sign under "Custom Attributes":

<p style={{"marginLeft":"auto","marginRight":"auto","width":240,"height":418,"maxWidth":"100%"}}><img src="https://smarterlabs.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F44dfa732-0c38-4653-97c0-18ca18b4f9fb%2FScreen_Shot_2021-07-19_at_12.38.55_PM.png?table=block&id=df15547e-0d77-47d9-9b6c-241d8816235f&spaceId=2089b25c-d262-479d-a1ff-9c3871a1c564" alt="" /></p>
			

Then input "sitemap" for the Name, and "no" for the Value:

<p style={{"marginLeft":"auto","marginRight":"auto","width":240,"height":288,"maxWidth":"100%"}}><img src="https://smarterlabs.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F538d2940-41da-46d0-b68a-631c00566493%2FScreen_Shot_2021-07-19_at_12.39.38_PM.png?table=block&id=76156018-6a15-43ce-b5f0-21bf020aa072&spaceId=2089b25c-d262-479d-a1ff-9c3871a1c564" alt="" /></p>
			

After that, publish your Webflow site and wait for it to deploy to Netlify. After that, this page should be excluded from your sitemap. Repeat for any other pages you want to exclude.