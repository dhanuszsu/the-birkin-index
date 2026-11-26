"""
Model definitions and estimators for The Birkin Index.
"""
from typing import Dict, Any, Tuple
import numpy as np
from sklearn.dummy import DummyRegressor
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.ensemble import RandomForestRegressor
from ml.evaluation.metrics import calculate_regression_metrics


def get_candidate_models() -> Dict[str, Any]:
    """
    Returns the benchmark suite of candidate models.
    """
    return {
        "baseline_median": DummyRegressor(strategy="median"),
        "linear_regression": LinearRegression(),
        "ridge_regression": Ridge(alpha=1.0, random_state=42),
        "random_forest": RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42, n_jobs=-1)
    }


def train_and_evaluate_suite(
    X_train: np.ndarray,
    y_train: np.ndarray,
    X_test: np.ndarray,
    y_test: np.ndarray
) -> Tuple[Dict[str, Dict[str, Any]], str, Any]:
    """
    Trains all candidate models, evaluates on test data, and identifies the best model.
    
    Returns:
        results: Dict mapping model name to its metrics and instance.
        best_model_name: Name of model with lowest RMSE on test set.
        best_model: Trained best model estimator.
    """
    models = get_candidate_models()
    results = {}
    best_name = ""
    lowest_rmse = float("inf")
    best_estimator = None

    for name, model in models.items():
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        metrics = calculate_regression_metrics(y_test, y_pred)
        
        results[name] = {
            "metrics": metrics,
            "model": model
        }
        
        if metrics["rmse"] < lowest_rmse:
            lowest_rmse = metrics["rmse"]
            best_name = name
            best_estimator = model

    return results, best_name, best_estimator
