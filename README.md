# Countries of the World

A single-file atlas of 249 countries and territories, plus a place to track a banknote collection.
Open `index.html` to browse flags, capitals, populations, currencies, calling codes and languages,
and to see which countries are in your collection.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | The whole page, with a copy of all country data (including flags) embedded inside it |
| `country-by-collection.json` | **Your collection** — `Banknote` and `includedInCollection` for each country |
| `sync-collection.js` | Copies your collection values from the JSON file into `index.html` |
| `country-by-*.json` | The source datasets (calling code, capital, continent, currency, flag, languages, population, region) |
| `_originals/` | Untouched copies of the source datasets |
| `country-flags-main.zip` | Original flag image archive |

## Tracking your collection

Each country in `country-by-collection.json` looks like this:

```json
{
    "country": "Afghanistan",
    "Banknote": "10",
    "includedInCollection": true
}
```

- `Banknote` is **text**, so it can hold a number (`"10"`) or notes (`"P-123, P-125"`).
- `includedInCollection` is **true / false**. On the page it shows as a green ✓ or a grey ✕.
- Keep `country` spelled exactly as it is in the file; that's how entries are matched.

### Getting your edits onto the page

How you open the page decides what you need to do after editing the JSON:

- **Opened by double-clicking `index.html`** — browsers don't let a local page read other files,
  so copy your edits into the page first, then refresh:

  ```bash
  node sync-collection.js
  ```

  The script tells you how many countries it updated and lists any names it couldn't match.

- **Opened through a local web server** — the page reads `country-by-collection.json` on every load,
  so just save and refresh. For example:

  ```bash
  npx serve .
  ```

  Running `node sync-collection.js` afterwards is still worthwhile, so the double-click version stays current.

If the page doesn't change after an edit, press **Ctrl+F5** to force a full reload.

## Using the page

- **Search** by country, capital, continent, region, currency, language or banknote text.
- **Filter** by continent with the dropdown, or click a bar in the "Countries by continent" chart.
- **Sort** by name, population, banknote or collection status from the dropdown, or by clicking table headers.
- **Switch** between Cards and Table view.
- **Click** any country for its full details.
- **Theme** — the button in the top-right toggles light and dark mode (remembered in your browser).

## Data sources

- Country datasets: the `country-by-*.json` files in this folder.
- Populations: World Bank 2024; ONS mid-2023 for the UK nations.
- Flags: © their respective sources.
