"""Leitor local. Troque esta implementação por PostGIS/API sem alterar o domínio."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any


class CityDataRepository:
    def __init__(self, data_dir: Path | None = None) -> None:
        self.data_dir = data_dir or Path(__file__).parents[3] / "data" / "mvp"

    def collection(self, name: str) -> dict[str, Any]:
        return self._read(f"{name}.geojson")

    def document(self, name: str) -> dict[str, Any]:
        return self._read(f"{name}.json")

    def network(self) -> dict[str, Any]:
        return {
            "stations": self.collection("stations"),
            "lines": self.document("lines"),
            "connections": self.document("connections"),
        }

    def _read(self, filename: str) -> dict[str, Any]:
        with (self.data_dir / filename).open(encoding="utf-8") as file:
            return json.load(file)
