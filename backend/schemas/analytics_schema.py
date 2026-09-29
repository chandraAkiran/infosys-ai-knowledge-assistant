from pydantic import BaseModel


class AnalyticsOverview(BaseModel):
    total_queries: int
    average_response_time: float
    no_answer_rate: float
    positive_feedback_rate: float


class QueryAnalytics(BaseModel):
    date: str
    query_count: int


class DepartmentAnalytics(BaseModel):
    department: str
    query_count: int


class FeedbackAnalytics(BaseModel):
    positive: int
    negative: int