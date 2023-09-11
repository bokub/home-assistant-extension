# Home Assistant Extension for Chrome and Firefox

![Version](https://flat.badgen.net/github/release/bokub/home-assistant-extension?label=version&color=cyan)
[![Chrome users](https://flat.badgen.net/chrome-web-store/users/hpoiflhmfklhfcfpibmdmpeonphmdbda?label=chrome%20users&color=green)][chrome]
[![Firefox users](https://flat.badgen.net/amo/users/home-assistant?label=firefox%20users&color=orange)][firefox]
[![Code style](https://flat.badgen.net/badge/code%20style/prettier/ff69b4)](https://github.com/bokub/prettier-config)

> Unofficial extension to quickly access your Home Assistant dashboard from everywhere

<p align="center">
  <a href="https://chrome.google.com/webstore/detail/home-assistant/hpoiflhmfklhfcfpibmdmpeonphmdbda" target="_blank">
    <img src="https://user-images.githubusercontent.com/17952318/116673701-034c6100-a9a4-11eb-9420-dc69b59aea67.png" width="600">
  </a>
</p>

## Setup

Open your `configuration.yaml` file and add the following lines, then restart Home Assistant.

```yaml
http:
  use_x_frame_options: false
```

In your Lovelace dashboard, **create a new view** and add a few cards that you want to see in your extension

Here are a few tips:

- If you have only one card, activate the "panel mode" option for a better look
- If you want to match your browser color scheme, you can choose a specific theme just for this view
- You can completely hide the view if you don't want it to show in your existing dashboard, it won't affect the extension
- I suggest you to choose a specific URL for the view. For example: "extension"

**Install** the extension from the [Chrome Web Store][chrome] or [Firefox Add-ons][firefox]

**Pin** the extension in Chrome so it's always visible (it's already done by default in Firefox)

Open the extension options (right-click the icon > _Configure_), then:

- Set the URL of your view as seen in your browser, for example `https://my-home-assistant.com/lovelace/extension`
- Adjust width and height so everything looks good
- You can choose to crop the upper part of your view to hide the page header. By default, the size of the header is 56 pixels

If you like this extension, please ⭐ this repo and leave a nice review in the stores!

[chrome]: https://chrome.google.com/webstore/detail/home-assistant/hpoiflhmfklhfcfpibmdmpeonphmdbda
[firefox]: https://addons.mozilla.org/firefox/addon/home-assistant/

## Development

The build output is the `dist` folder

```bash
# Install dependencies
npm install

# Build extensions from source
npm run build:chrome
npm run build:firefox

# Development mode
npm run dev:chrome
npm run dev:firefox
```
