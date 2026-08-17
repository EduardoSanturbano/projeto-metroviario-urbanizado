"""Contratos independentes da fonte para a camada urbana do MVP."""

from __future__ import annotations

from enum import StrEnum
from typing import Any, Literal

from pydantic import BaseModel, Field


class DataStatus(StrEnum):
    REFERENCE = "reference"  # identidade/atributo confirmado em fonte pública
    DEMONSTRATIVE = "demonstrative"  # criado para tornar o MVP navegável
    ESTIMATED = "estimated"  # derivado de uma hipótese documentada


class Provenance(BaseModel):
    status: DataStatus
    source_id: str
    verified_at: str | None = None
    notes: str | None = None


class Place(BaseModel):
    id: str
    name: str
    category: str
    geometry: dict[str, Any] | None = None
    geometry_quality: Literal["none", "approximate", "surveyed"] = "none"
    provenance: Provenance
    attributes: dict[str, Any] = Field(default_factory=dict)


class TransitLine(BaseModel):
    id: str
    name: str
    mode: Literal["metro", "monorail"]
    station_ids: list[str]
    provenance: Provenance


class TransitConnection(BaseModel):
    from_station_id: str
    to_station_id: str
    line_id: str
    kind: Literal["adjacent", "transfer"]
    provenance: Provenance

