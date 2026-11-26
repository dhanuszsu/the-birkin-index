import numpy as np
import pandas as pd
from typing import Tuple, List, Dict, Any

CONDITION_ORDINAL_MAP = {
    "Fair": 1.0,
    "Very Good": 2.0,
    "Excellent": 3.0,
    "Store Fresh / Pristine": 4.0,
}

LEATHER_TIER_MAP = {
    "Togo": "bovine",
    "Clemence": "bovine",
    "Epsom": "bovine",
    "Swift": "calfskin",
    "Box Calf": "heritage_box",
    "Porosus Crocodile": "precious_exotic",
    "Niloticus Crocodile": "precious_exotic",
    "Alligator": "precious_exotic",
    "Ostrich": "exotic",
}

class BirkinFeatureTransformer:
    """Transforms raw Birkin specifications into numerical feature matrix for scikit-learn models."""
    
    def __init__(self):
        self.feature_names_: List[str] = []
        self.is_fitted: bool = False
        
    def fit_transform(self, df: pd.DataFrame) -> Tuple[np.ndarray, np.ndarray, List[str]]:
        """Fits feature encoders and transforms dataframe into (X, y, feature_names)."""
        if df.empty:
            raise ValueError("Cannot fit feature transformer on empty dataset.")
            
        X_df = self._extract_features(df)
        self.feature_names_ = list(X_df.columns)
        self.is_fitted = True
        
        # Target variable: price_in_usd (or price_in_inr if USD missing)
        if "price_in_usd" in df.columns and not df["price_in_usd"].isna().all():
            y = df["price_in_usd"].values.astype(float)
        else:
            y = df["original_price"].values.astype(float)
            
        return X_df.values.astype(float), y, self.feature_names_
        
    def transform(self, df: pd.DataFrame) -> np.ndarray:
        """Transforms new unseen instances using fitted feature layout."""
        if not self.is_fitted:
            raise RuntimeError("Transformer must be fitted before calling transform.")
        X_df = self._extract_features(df)
        
        # Align columns
        for col in self.feature_names_:
            if col not in X_df.columns:
                X_df[col] = 0.0
        X_df = X_df[self.feature_names_]
        return X_df.values.astype(float)
        
    def _extract_features(self, df: pd.DataFrame) -> pd.DataFrame:
        features = pd.DataFrame(index=df.index)
        
        # 1. Size as continuous numeric
        features["size_cm"] = pd.to_numeric(df["size"].astype(str).str.replace("cm", "").str.strip(), errors="coerce").fillna(30.0)
        
        # 2. Condition as ordinal integer
        features["condition_score"] = df["condition"].map(CONDITION_ORDINAL_MAP).fillna(2.5)
        
        # 3. Model construction: Sellier vs Retourne
        features["is_sellier"] = df["model"].astype(str).str.contains("Sellier", case=False).astype(float)
        
        # 4. Leather category one-hot
        leather_group = df["leather"].astype(str).map(lambda l: next((v for k, v in LEATHER_TIER_MAP.items() if k.lower() in l.lower()), "bovine"))
        for tier in ["bovine", "calfskin", "heritage_box", "precious_exotic", "exotic"]:
            features[f"leather_{tier}"] = (leather_group == tier).astype(float)
            
        # 5. Hardware one-hot
        hw_str = df["hardware"].astype(str)
        features["hw_gold"] = hw_str.str.contains("Gold", case=False).astype(float)
        features["hw_palladium"] = hw_str.str.contains("Palladium|PHW", case=False).astype(float)
        features["hw_rose_gold"] = hw_str.str.contains("Rose Gold|RGHW", case=False).astype(float)
        
        # 6. Bag age
        current_year = 2026
        prod_year = pd.to_numeric(df.get("production_year", 2022), errors="coerce").fillna(2022)
        features["bag_age_years"] = (current_year - prod_year).clip(lower=0)
        
        return features
