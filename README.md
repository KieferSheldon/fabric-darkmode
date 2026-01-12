# Fabric Dark Mode

A dark mode browser extension specifically configured for Microsoft Fabric.

## ⚠️ Disclaimer

**This fork is not distributed on the Chrome Web Store; it is shared in the spirit of FOSS and for educational purposes. I recommend that if you want up-to-date themes, bug fixes, and features, you use and contribute to [Dark Reader](https://github.com/darkreader/darkreader) itself.**

This project is a fork of [Dark Reader](https://github.com/darkreader/darkreader), an open-source MIT-licensed browser extension. All credit for the core functionality goes to the Dark Reader team.

## Features

- **Notebooks Support**: Dark mode that mimics VS Code's notebook dark theme for a consistent experience
- **Reports Optimization**: Optimized for Power BI and Fabric reports (with caveats - see below)
- **Easy Toggle**: Use the extension icon to quickly enable/disable dark mode as needed
- **Persistent Settings**: Your preferences are saved across sessions

### ⚠️ Report Rendering Notes

Some reports may display styling issues when dark mode is enabled, particularly in:
- Complex visualizations
- Custom formatted reports
- Certain report elements

This is normal and expected. Simply **toggle the extension off** using the icon when viewing reports that don't render well in dark mode. You can re-enable it when navigating back to other Fabric components.

## Installation

1. Download or clone this repository
2. Run `npm install`
3. Run `npm run build`
4. Open Edge/Chrome and go to `chrome://extensions/` (or `edge://extensions/`)
5. Enable "Developer mode"
6. Click "Load unpacked"
7. Select the `build/release/chrome-mv3` folder

## Building

Requires [Node.js](https://nodejs.org/) (LTS or higher recommended).

```bash
npm install
npm run build
```

The built extension will be in `build/release/chrome-mv3/`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Based on [Dark Reader](https://github.com/darkreader/darkreader) © Dark Reader Ltd.
