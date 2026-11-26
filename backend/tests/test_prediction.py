"""Tests for Model status and valuation prediction refusal."""

def test_model_status_endpoint_returns_quarantine_disclosure(client):
    response = client.get("/api/v1/model/status")
    assert response.status_code == 200
    data = response.json()
    assert data["is_available"] is False
    assert data["status"] == "unavailable"
    assert data["eligible_for_ml_count"] < 50
    assert "minimum_records_required" in data
    assert data["minimum_records_required"] == 50
    assert "strictly prohibits" in data["reason"].lower() or "quarantine" in data["reason"].lower()


def test_valuation_predict_refuses_when_model_unavailable(client):
    payload = {
        "model": "Birkin 25",
        "size": "25",
        "leather": "Togo",
        "color": "Noir",
        "hardware": "Gold",
        "condition": "Store Fresh / Pristine"
    }
    response = client.post("/api/v1/valuation/predict", json=payload)
    assert response.status_code == 503
    data = response.json()
    assert "detail" in data
    detail = data["detail"]
    assert detail["error"] == "VALUATION_MODEL_UNAVAILABLE"
    assert "eligible_records_count" in detail
    assert detail["minimum_records_required"] == 50
