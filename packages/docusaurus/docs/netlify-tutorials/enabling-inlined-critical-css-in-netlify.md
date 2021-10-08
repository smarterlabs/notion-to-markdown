# Enabling Inlined Critical CSS in Netlify

Since CryoLayer needs to modify HTML to support inlining critical CSS, this can sometimes negatively affect styles on some sites. This is why we turn this feature off by default. Follow these instructions to turn on inlining critical CSS.

1. In your Netlify site's dashboard, click the "Site settings" tab.
1. Click on "Build & deploy" on the left-hand side.
1. Scroll down to where it says "Environment Variables".
1. Click the "Edit variables" button.
1. Click the "New variable" button.
1. Input "INLINE_CSS" for the variable name, and "yes" for the value, without the quotes.
1. Now just publish your Webflow site again. Once Netlify is done building, check your site to make sure there aren't any styling issues.

If you notice any styling issues with your site, go back into the Environment Variables settings and remove the "INLINE_CSS" variable you just created.