Some users prefer to hide their Webflow site from search engines. If this option is turned on, CryoLayer will also hide the Vercel site since it copies the same robots.txt file. Follow these instructions to allow robots on your Vercel site while keeping your Webflow site hidden.

1. In your Vercel site's dashboard, click the site's "Settings" tab.
1. Click on "Environment Variables" on the left-hand side.
1. Input "REPLACE_ROBOTS_TXT" for the variable name, and "yes" for the value, without the quotes.
1. Click "Add"
1. Now just publish your Webflow site again.

Now the robots.txt file on your Vercel site should be empty, allowing robots to crawl your site.