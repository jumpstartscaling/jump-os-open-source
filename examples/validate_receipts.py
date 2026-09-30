#!/usr/bin/env python3
"""Small dependency-free structural validator for the public examples.

Full JSON Schema validation remains the normative check; this script makes the
repository's positive/negative examples reproducible with Python's standard
library alone.
"""
import json
from pathlib import Path

ROOT = Path(__file__).parent
REQUIRED = {"receipt_id", "schema_version", "timestamp", "task", "principal", "authority_boundary", "execution", "evidence_chain", "result"}


def validate(path: Path) -> list[str]:
    data = json.loads(path.read_text())
    errors = []
    errors.extend(f"missing top-level field: {key}" for key in sorted(REQUIRED - data.keys()))
    if data.get("schema_version") != "1.0":
        errors.append("schema_version must be 1.0")
    if "unexpected_private_field" in data:
        errors.append("unexpected_private_field is not allowed")
    return errors


def main() -> int:
    valid_errors = validate(ROOT / "execution-receipt.json")
    invalid_errors = validate(ROOT / "execution-receipt.invalid.json")
    if valid_errors:
        raise SystemExit(f"valid example failed: {valid_errors}")
    if not invalid_errors:
        raise SystemExit("invalid example unexpectedly passed")
    print("PASS: valid example accepted")
    print(f"PASS: invalid example rejected: {', '.join(invalid_errors)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
