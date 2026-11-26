"""
Evaluation metrics for The Birkin Index valuation models.
"""
from typing import Dict, Any
import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score, explained_variance_score


def calculate_regression_metrics(y_true: np.ndarray, y_pred: np.ndarray) -> Dict[str, float]:
    """
    Computes comprehensive regression metrics for valuation accuracy.
    
    Parameters:
        y_true: Ground truth target values (actual USD prices).
        y_pred: Model predictions (predicted USD prices).
        
    Returns:
        Dictionary with MAE, RMSE, R2, MAPE, and MdAPE.
    """
    y_true = np.asarray(y_true, dtype=float)
    y_pred = np.asarray(y_pred, dtype=float)
    
    if len(y_true) == 0:
        return {
            "mae": 0.0,
            "rmse": 0.0,
            "r2": 0.0,
            "mape": 0.0,
            "mdape": 0.0,
            "sample_size": 0
        }
        
    mae = float(mean_absolute_error(y_true, y_pred))
    rmse = float(np.sqrt(mean_squared_error(y_true, y_pred)))
    
    # R2 can be negative if model performs worse than mean
    r2 = float(r2_score(y_true, y_pred)) if len(y_true) > 1 else 0.0
    explained_var = float(explained_variance_score(y_true, y_pred)) if len(y_true) > 1 else 0.0
    
    # Percentage errors (guard against division by zero)
    nonzero_mask = y_true > 0
    if np.any(nonzero_mask):
        pct_errors = np.abs((y_true[nonzero_mask] - y_pred[nonzero_mask]) / y_true[nonzero_mask]) * 100.0
        mape = float(np.mean(pct_errors))
        mdape = float(np.median(pct_errors))
    else:
        mape = 0.0
        mdape = 0.0
        
    return {
        "mae": round(mae, 2),
        "rmse": round(rmse, 2),
        "r2": round(r2, 4),
        "explained_variance": round(explained_var, 4),
        "mape": round(mape, 2),
        "mdape": round(mdape, 2),
        "sample_size": int(len(y_true))
    }
