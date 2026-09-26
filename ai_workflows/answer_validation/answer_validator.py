from typing import Any, Dict


class AnswerValidator:
    """
    Performs lightweight post-generation validation.

    This is not a replacement for human evaluation.
    It is a safety layer before an answer is returned
    to the frontend.
    """

    INSUFFICIENT_PATTERNS = [
        "couldn't find this information",
        "could not find this information",
        "not found in the indexed documents",
        "insufficient information",
        "insufficient context",
        "unable to answer",
    ]

    @classmethod
    def validate(
        cls,
        response: Dict[str, Any],
    ) -> Dict[str, Any]:

        answer = str(
            response.get("answer", "")
        ).strip()

        citations = response.get(
            "citations",
            [],
        )

        confidence = response.get(
            "confidence_score",
            0.0,
        )

        issues = []

        # -------------------------------------------------
        # Empty answer
        # -------------------------------------------------

        if not answer:

            issues.append(
                "empty_answer"
            )

        # -------------------------------------------------
        # Clamp confidence
        # -------------------------------------------------

        try:

            confidence = float(confidence)

        except (TypeError, ValueError):

            confidence = 0.0

            issues.append(
                "invalid_confidence"
            )

        confidence = max(
            0.0,
            min(
                1.0,
                confidence,
            ),
        )

        # -------------------------------------------------
        # Check insufficient-context response
        # -------------------------------------------------

        answer_lower = answer.lower()

        insufficient = any(
            pattern in answer_lower
            for pattern in cls.INSUFFICIENT_PATTERNS
        )

        if insufficient:

            confidence = 0.0

            citations = []

        # -------------------------------------------------
        # Answer without citations
        # -------------------------------------------------

        elif not citations:

            issues.append(
                "missing_citations"
            )

            confidence = min(
                confidence,
                0.5,
            )

        # -------------------------------------------------
        # Final result
        # -------------------------------------------------

        is_valid = (
            len(issues) == 0
            and not insufficient
        )

        return {
            **response,
            "confidence_score": confidence,
            "citations": citations,
            "validation": {
                "is_valid": is_valid,
                "issues": issues,
                "insufficient_context": insufficient,
            },
        }