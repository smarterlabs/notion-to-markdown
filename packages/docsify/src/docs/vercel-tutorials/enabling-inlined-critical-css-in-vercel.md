# Enabling Inlined Critical CSS in Vercel

Since CryoLayer needs to modify HTML to support inlined CSS, this can sometimes negatively affect styles on some sites. This is why we turn this feature off by default. Follow these instructions to turn on inlined critical CSS.

1. In your Vercel site's dashboard, click the site's "Settings" tab.
1. Click on "Environment Variables" on the left-hand side.
1. Input "INLINE_CSS" for the variable name, and "yes" for the value, without the quotes.
1. Click "Add"
1. Now just publish your Webflow site again. Once Vercel is done building, check your site to make sure there aren't any styling issues.

If you notice any styling issues with your site, go back into the Environment Variables settings and remove the "INLINE_CSS" variable you just created.