**Note:** This step is optional. You only have to do this if you want your Netlify site to stay in sync with your Webflow site.

After your website has been deployed to Netlify, follow these steps to automatically sync your Netlify's site with your Webflow site every time it publishes:

### **In Netlify:**

1. In the Netlify dashboard, go to your new website's "Site settings" tab.
1. Click on the "Build and Deploy" section on the left-hand side.
1. Scroll down to the "Build Hooks" section.
1. Copy and paste the webhook URL that says "Webflow:" next to it.

### **In Webflow:**

1. In your Webflow's website settings, go to the "Integrations" tab.
1. Scroll down to the "Webhooks" section.
1. Click the "+ Add Webhook" button.
1. Under "Trigger Type", select "Site publish".
1. Paste the webhook URL we copied from Netlify into the "Webhook URL" field.

Now every time you publish a change in Webflow, it should trigger a rebuild in Netlify!