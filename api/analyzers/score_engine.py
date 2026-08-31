"""
Reality Score Engine
Combines individual forensic analysis results into a unified Reality Score.

Implements:
- Weighted combination of forensic signals
- Configurable weights per analysis category
- Verdict classification with confidence levels
"""


class ScoreEngine:
    """Calculates the overall Reality Score from individual analysis results."""

    # Configurable weights for each analysis category
    WEIGHTS = {
        # Video analysis weights
        "face_manipulation": 0.25,
        "frame_consistency": 0.20,
        "temporal_coherence": 0.15,
        "compression_analysis": 0.10,
        
        # Image analysis weights
        "ai_generation": 0.30,
        "compression_artifacts": 0.15,
        "exif_consistency": 0.25,
        "pixel_analysis": 0.20,
        
        # Audio analysis weights
        "voice_synthesis": 0.35,
        "audio_quality": 0.25,
        "encoding_consistency": 0.15,
        
        # Metadata weights (applied across all types)
        "timestamp_consistency": 0.12,
        "device_information": 0.15,
        "file_integrity": 0.13,
    }

    # Verdict thresholds
    VERDICTS = [
        (90, "HIGH_CONFIDENCE_AUTHENTIC", "High Confidence Authentic"),
        (75, "PROBABLY_AUTHENTIC", "Probably Authentic"),
        (50, "SUSPICIOUS", "Suspicious"),
        (25, "LIKELY_MANIPULATED", "Likely Manipulated"),
        (0, "HIGHLY_LIKELY_MANIPULATED", "Highly Likely Manipulated"),
    ]

    def calculate(
        self, analysis_results: dict, file_type: str
    ) -> tuple[float, str, str, dict]:
        """
        Calculate the Reality Score from analysis results.

        Args:
            analysis_results: Dictionary of analysis module outputs.
            file_type: Type of file ('video', 'image', 'audio', 'document').

        Returns:
            Tuple of (reality_score, verdict_code, verdict_label, metrics_breakdown).
        """
        all_scores = {}
        total_weight = 0.0
        weighted_sum = 0.0

        # Flatten nested analysis results and extract scores
        for module_name, module_results in analysis_results.items():
            if isinstance(module_results, dict):
                # Check if this is a direct result or contains sub-results
                if "score" in module_results:
                    # Direct result
                    key = module_name
                    weight = self.WEIGHTS.get(key, 0.10)
                    score = module_results["score"]
                    confidence = module_results.get("confidence", 0.7)
                    
                    effective_weight = weight * confidence
                    weighted_sum += score * effective_weight
                    total_weight += effective_weight
                    
                    all_scores[key] = {
                        "score": round(score, 1),
                        "confidence": round(confidence, 2),
                        "weight": round(weight, 2),
                        "label": module_results.get("label", key),
                    }
                else:
                    # Nested results (e.g., video: {face_manipulation: {...}, ...})
                    for sub_key, sub_result in module_results.items():
                        if isinstance(sub_result, dict) and "score" in sub_result:
                            weight = self.WEIGHTS.get(sub_key, 0.10)
                            score = sub_result["score"]
                            confidence = sub_result.get("confidence", 0.7)
                            
                            effective_weight = weight * confidence
                            weighted_sum += score * effective_weight
                            total_weight += effective_weight
                            
                            all_scores[sub_key] = {
                                "score": round(score, 1),
                                "confidence": round(confidence, 2),
                                "weight": round(weight, 2),
                                "label": sub_result.get("label", sub_key),
                            }

        # Calculate final Reality Score
        if total_weight > 0:
            reality_score = weighted_sum / total_weight
        else:
            reality_score = 50.0  # Default uncertain

        reality_score = round(max(0, min(100, reality_score)), 1)

        # Determine verdict
        verdict_code = "SUSPICIOUS"
        verdict_label = "Suspicious"
        for threshold, code, label in self.VERDICTS:
            if reality_score >= threshold:
                verdict_code = code
                verdict_label = label
                break

        # Build high-level metrics for the dashboard
        metrics = self._build_metrics(all_scores, file_type, reality_score)

        return reality_score, verdict_code, verdict_label, metrics

    def _build_metrics(
        self, all_scores: dict, file_type: str, reality_score: float
    ) -> dict:
        """
        Build the high-level metrics breakdown for the dashboard display.
        Maps individual scores to the five dashboard categories.
        """
        metrics = {}

        # Source Authenticity — based on manipulation detection
        source_keys = ["face_manipulation", "ai_generation", "voice_synthesis", "pixel_analysis"]
        source_scores = [all_scores[k]["score"] for k in source_keys if k in all_scores]
        metrics["source_authenticity"] = {
            "score": round(sum(source_scores) / len(source_scores), 1) if source_scores else reality_score,
            "label": "Source Authenticity",
            "description": "Likelihood content originated from a genuine source",
        }

        # Device Authenticity — based on device/metadata info
        device_keys = ["device_information", "exif_consistency"]
        device_scores = [all_scores[k]["score"] for k in device_keys if k in all_scores]
        metrics["device_authenticity"] = {
            "score": round(sum(device_scores) / len(device_scores), 1) if device_scores else reality_score,
            "label": "Device Authenticity",
            "description": "Confidence in capture device identification",
        }

        # Temporal Consistency — based on timestamps and temporal analysis
        temporal_keys = ["temporal_coherence", "timestamp_consistency"]
        temporal_scores = [all_scores[k]["score"] for k in temporal_keys if k in all_scores]
        metrics["temporal_consistency"] = {
            "score": round(sum(temporal_scores) / len(temporal_scores), 1) if temporal_scores else reality_score,
            "label": "Temporal Consistency",
            "description": "Timeline and temporal coherence assessment",
        }

        # Metadata Integrity — based on file structure and metadata
        meta_keys = ["file_integrity", "compression_analysis", "compression_artifacts", "encoding_consistency"]
        meta_scores = [all_scores[k]["score"] for k in meta_keys if k in all_scores]
        metrics["metadata_integrity"] = {
            "score": round(sum(meta_scores) / len(meta_scores), 1) if meta_scores else reality_score,
            "label": "Metadata Integrity",
            "description": "File metadata and structure consistency",
        }

        # AI Manipulation — inverse of authenticity (lower = less manipulation)
        ai_keys = ["ai_generation", "face_manipulation", "voice_synthesis"]
        ai_scores = [all_scores[k]["score"] for k in ai_keys if k in all_scores]
        ai_avg = sum(ai_scores) / len(ai_scores) if ai_scores else reality_score
        metrics["ai_manipulation"] = {
            "score": round(max(0, 100 - ai_avg), 1),
            "label": "AI Manipulation",
            "description": "Probability of AI-based content manipulation",
        }

        # Include individual scores for detailed view
        metrics["individual_scores"] = all_scores

        return metrics
