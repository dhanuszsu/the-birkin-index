"""Tests for Archive endpoints."""

def test_get_archive_empty_or_populated(client):
    response = client.get("/api/v1/archive")
    assert response.status_code == 200
    data = response.json()
    assert "records" in data
    assert "total" in data
    assert "page" in data
    assert "page_size" in data


def test_get_archive_with_filters(client, sample_illustrative_record):
    response = client.get("/api/v1/archive?size=25&leather=Togo")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] >= 1
    assert any(item["id"] == sample_illustrative_record.id for item in data["records"])


def test_get_archive_by_id(client, sample_illustrative_record):
    response = client.get(f"/api/v1/archive/{sample_illustrative_record.id}")
    assert response.status_code == 200
    item = response.json()
    assert item["id"] == sample_illustrative_record.id
    assert item["is_illustrative"] is True
    assert item["eligible_for_ml"] is False


def test_get_archive_not_found(client):
    response = client.get("/api/v1/archive/rec_nonexistent_xyz")
    assert response.status_code == 404
    data = response.json()
    assert "not found" in data["detail"].lower()


def test_create_archive_record_illustrative(client, sample_source):
    payload = {
        "model": "Birkin 30 Sellier",
        "size": "30",
        "leather": "Epsom",
        "color": "Gold",
        "hardware": "Gold (GHW)",
        "condition": "Store Fresh / Pristine",
        "production_year": "2024",
        "transaction_type": "completed_sale",
        "original_price": 28000.0,
        "original_currency": "USD",
        "price_in_inr": 2324000.0,
        "source_name": sample_source.name,
        "source_reference": "Lot 101",
        "price_basis": "Price including buyer's premium",
        "verification_status": "UNVERIFIED",
        "verification_notes": "Created via API test",
        "is_illustrative": True,
        "record_category": "illustrative_display",
        "notes": "Testing creation endpoint"
    }
    response = client.post("/api/v1/archive/records", json=payload)
    assert response.status_code == 201
    created = response.json()
    assert created["id"].startswith("REC-") or created["id"].startswith("rec_")
    assert created["eligible_for_ml"] is False
    assert created["is_illustrative"] is True
