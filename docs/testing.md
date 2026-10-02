# Testing Guide

## Automated Tests

The backend test suite uses pytest.

Run from the repository root:

```powershell
pytest -q
```

The test suite covers authentication, permissions, query classification, tool selection, retrieval, citations, answer validation, workflow behavior, and MCP routing.

## Expected Result

A successful test run should report all tests passing.

## Manual Testing

### Authentication
- Log in with a valid employee account.
- Verify that invalid credentials are rejected.
- Verify that protected pages require authentication.

### Employee Query
- Ask a question supported by an indexed document.
- Verify that the response is grounded in retrieved evidence.
- Verify that sources/citations are displayed where applicable.

### Unsupported Query
- Ask a question for which no relevant evidence exists.
- Verify that the system does not invent an answer.

### Document Upload
- Log in as an administrator.
- Upload a supported document.
- Index the document.
- Ask a question about the newly indexed content.

### MCP Routing
- Submit a supported incident-status query such as `INC-1001`.
- Verify that the operational connector is selected.
- Verify that the returned incident information is included in the response.

### Feedback
- Submit positive or negative feedback on a response.
- Verify that the feedback is stored successfully.

### Analytics and Administration
- Verify that authorized users can access analytics.
- Verify that administrator-only functions are protected by RBAC.

## Production Validation

The deployed application should be tested using the live Vercel frontend and Render backend before the final project demonstration.
