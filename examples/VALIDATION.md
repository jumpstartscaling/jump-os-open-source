# Receipt validation

The examples contain fictional identifiers and endpoints only. With Python 3:

```bash
python3 examples/validate_receipts.py
```

## MCP reference server

The [MCP reference server](mcp-reference-server/README.md) is simulation-only. It has no network client, live-system adapter, credential handling, filesystem mutation, or shell execution. From its directory, run:

```bash
npm install
npm test
```

Expected output includes acceptance of `execution-receipt.json` and rejection of `execution-receipt.invalid.json` because it contains an undeclared field. For full Draft 2020-12 validation, use any standards-compliant JSON Schema validator against `schemas/execution-receipt.schema.json`; the dependency-free script is a reproducible smoke check, not a replacement for a schema implementation.
