### **Rapid CSV Ingester Plugin**

**PURPOSE**: Quickly import CSV data into Sanity datasets.

**FEATURES**:
  - **CSV Parsing**: Efficiently parses and maps CSV data to Sanity schema.
  - **Customizable Mapping**: Define how CSV columns map to Sanity fields without writing schemas in code.
  - **Error Handling**: Provides feedback on import issues for troubleshooting.
  - **Planned Feature**: Option to export Sanity document schemas as CSV files by selecting the desired document type.

**INSTALLATION**:
  ```bash
  npm install sanity-plugin-rapid-csv-ingester

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {rapidCSVIngester} from 'sanity-plugin-rapid-csv-ingester'

export default defineConfig({
  //...
  plugins: [rapidCSVIngester({})],
})
```

## License

[MIT](LICENSE) © AjithThoutam

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
