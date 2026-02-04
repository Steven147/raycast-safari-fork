# Raycast Safari Extension

Forked from [Raycast/extensions](https://github.com/raycast/extensions/tree/main/extensions/safari)

A Raycast extension for managing Safari tabs, history, bookmarks, and reading list.

## Features

### Commands

| Command | Description |
|---------|-------------|
| **Search Tabs** | Browse and search your open Safari tabs, including iCloud tabs across all devices |
| **Search History** | Search through your Safari browsing history with fuzzy search support |
| **Search Bookmarks** | Search and browse your Safari bookmarks |
| **Search Reading List** | Browse your Safari reading list with read/unread status grouping |
| **Add to Reading List** | Add the current Safari tab to your reading list |
| **Copy URL to Clipboard** | Copy the current Safari tab URL |
| **Copy Title as Link to Clipboard** | Copy the current tab title as a Markdown link |
| **Close Other Tabs** | Close all Safari tabs except the current one |

### AI Capabilities

The extension provides AI-powered tools for Raycast Pro:

- Summarize the current tab content
- Search and open items in your reading list
- Find and retrieve bookmarks
- Search browsing history
- Get info about all open tabs
- Get tab content (text or HTML source)
- Close specific tabs

### Preferences

| Preference | Description |
|------------|-------------|
| **Local Safari Browser** | Switch between Safari and Safari Technology Preview |
| **Pinyin Support** | Enable pinyin search for Chinese characters |
| **Fuzzy Search** | Enable fuzzy search for more flexible searching |
| **iCloud Tabs** | Include iCloud tabs across all your devices |

## Requirements

- macOS
- [Raycast](https://raycast.com/)
- Safari or Safari Technology Preview
- Full Disk Access permission for Raycast (to read Safari data)

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build the extension
npm run build

# Lint code
npm run lint

# Fix linting issues
npm run fix-lint
```

## Permissions

This extension requires **Full Disk Access** to function properly:

1. Open System Settings > Privacy & Security
2. Find Raycast and enable "Full Disk Access"
3. Restart Raycast

## Project Structure

```
extensions/safari/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom hooks
│   ├── lang-adaptor/   # Language adapters (pinyin support)
│   └── tools/          # Safari tool functions
├── swift/              # Swift library for Safari interaction
└── assets/             # Images and icons
```

## License

MIT

## Credits

Originally developed by the Raycast team and contributors.

- Fork from: https://github.com/raycast/extensions/tree/main/extensions/safari
