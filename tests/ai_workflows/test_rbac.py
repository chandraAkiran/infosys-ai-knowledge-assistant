from ai_workflows.query_classification.rbac_classifier import (
    QueryRBACClassifier,
)


def test_software_engineer_access():

    departments = (
        QueryRBACClassifier
        .get_allowed_departments(
            "Software Engineer"
        )
    )

    assert "Engineering" in departments
    assert "PMO" in departments


def test_hr_access():

    departments = (
        QueryRBACClassifier
        .get_allowed_departments(
            "HR Associate"
        )
    )

    assert departments == [
        "Human Resources"
    ]