from ai_workflows.query_classification.query_classifier import (
    QueryClassifier,
)


def test_hr_query():

    result = QueryClassifier.classify(
        "How many casual leaves do employees get?"
    )

    assert result["department"] == "Human Resources"


def test_engineering_query():

    result = QueryClassifier.classify(
        "How does the microservice architecture work?"
    )

    assert result["department"] == "Engineering"