from ai_workflows.workflow import EnterpriseAIWorkflow


def process_query(
    query: str,
    designation: str,
):
    """
    Process an employee query through the complete
    enterprise AI workflow.
    """

    workflow = EnterpriseAIWorkflow()

    return workflow.run(
        query=query,
        designation=designation,
    )