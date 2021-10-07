**Note:** This step is optional. You only have to do this if you want your Vercel site to stay in sync with your Webflow site.

After your website has been deployed to Vercel, follow these steps to automatically sync your Vercel site with your Webflow site every time it publishes:

### **In Vercel:**

1. In the Vercel dashboard, go to your new website's "Settings" tab.
1. Click on the "Git" section on the left-hand side.
1. Scroll down to the "Deploy Hooks" section.
1. Input "Webflow" for the name, and "main" for the other input.
1. Click "Create Hook"
1. Click the "copy" button that just appeared above the previous button, next to the webhook URL. This copies that URL that we'll use later.

### **In Webflow:**

1. In your Webflow's website settings, go to the "Integrations" tab.
1. Scroll down to the "Webhooks" section.
1. Click the "+ Add Webhook" button.
1. Under "Trigger Type", select "Site publish".
1. Paste the webhook URL we copied from Vercel into the "Webhook URL" field.

Now every time you publish a change in Webflow, it should trigger a rebuild in Vercel!