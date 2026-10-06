# 🤖 Infosys AI Knowledge Assistant

<p align="center">
  <strong>Enterprise AI Knowledge Assistant powered by RAG, LangChain, LLMs, Vector Search, FastAPI and Next.js</strong>
</p>

<p align="center">
  Python • FastAPI • Next.js • LangChain • Gemini • OpenAI • ChromaDB • Supabase
</p>

<p align="center">
  <a href="https://github.com/chandraAkiran/infosys-ai-knowledge-assistant">
    <strong>💻 GitHub Repository</strong>
  </a>
</p>

---

## 📌 Project Overview

**Infosys AI Knowledge Assistant** is an enterprise-focused **Generative AI application** designed to help users search, understand, and interact with organizational knowledge using natural language.

The application uses **Retrieval-Augmented Generation (RAG)** to retrieve relevant information from enterprise documents before generating an AI response.

It combines:

- 📄 Enterprise document ingestion
- ✂️ Text extraction and chunking
- 🧠 Vector embeddings
- 🔎 Semantic search
- 🤖 Retrieval-Augmented Generation (RAG)
- 🔗 LangChain workflows
- 🧰 AI agents and tools
- 🔀 Multiple LLM providers
- 🔐 Authentication
- 💬 Conversational AI
- 🗄️ Vector database
- ⚡ FastAPI backend
- 💻 Next.js frontend
- ☁️ Cloud-ready deployment architecture

The project demonstrates an end-to-end **Generative AI and Enterprise RAG system**, from document ingestion and embedding generation to semantic retrieval and LLM-based question answering.

---

# 🎯 Project Objectives

The main objectives of the project are to:

- Build an enterprise AI knowledge-search platform
- Implement Retrieval-Augmented Generation
- Process enterprise documents automatically
- Convert document content into vector embeddings
- Perform semantic similarity search
- Generate document-grounded AI responses
- Develop reusable LangChain workflows
- Support multiple LLM providers
- Build modular frontend and backend services
- Implement secure authentication
- Create a scalable AI application architecture
- Prepare the application for cloud deployment

---

# ✨ Key Features

## 📄 1. Enterprise Document Ingestion

The system provides a document ingestion pipeline for processing enterprise knowledge.

The pipeline follows:

```text
Enterprise Document
        │
        ▼
Document Loader
        │
        ▼
Text Extraction
        │
        ▼
Text Cleaning
        │
        ▼
Chunking
        │
        ▼
Embedding Generation
        │
        ▼
Vector Database
```

This converts large enterprise documents into searchable vector representations.

---

## 🧠 2. Retrieval-Augmented Generation

The application uses **RAG** to retrieve relevant information before generating an answer.

Instead of sending only the user question to an LLM, the system first searches the enterprise knowledge base.

```text
User Question
      │
      ▼
Question Embedding
      │
      ▼
Vector Similarity Search
      │
      ▼
Relevant Document Chunks
      │
      ▼
Context Construction
      │
      ▼
LLM
      │
      ▼
Context-Grounded Response
```

This approach helps the AI generate responses based on enterprise information rather than relying entirely on generic model knowledge.

---

## 🔎 3. Semantic Search

The application uses vector embeddings to perform **semantic search**.

Semantic search retrieves information based on meaning rather than exact keyword matching.

### Example

Enterprise document:

```text
Employees are entitled to 20 days of paid annual leave.
```

User question:

```text
How many vacation days are employees allowed?
```

Even though the wording differs, semantic search can identify the relationship between **annual leave** and **vacation days**.

---

## 🤖 4. Large Language Models

The system is designed to work with modern Large Language Models.

LLMs can be used for:

- Question answering
- Document summarization
- Enterprise knowledge retrieval
- Context-aware response generation
- Policy interpretation
- Report analysis
- Conversational AI

The architecture supports providers such as:

- **Google Gemini**
- **OpenAI**

---

## 🔗 5. LangChain Integration

LangChain is used to organize the Generative AI workflow.

It provides components for:

- Prompt templates
- LLM integration
- Retrieval chains
- Context construction
- Document retrieval
- AI agents
- Tool calling
- Output processing

This modular design makes the application easier to extend with additional models and tools.

---

## 🧰 6. AI Workflows

The repository contains a dedicated:

```text
ai_workflows/
```

module for organizing AI-specific workflows.

This separation improves maintainability by keeping AI orchestration independent from the frontend and API layers.

Possible workflows include:

```text
Question
   │
   ▼
Intent / Workflow
   │
   ├── Document Search
   │
   ├── Knowledge Retrieval
   │
   ├── Summarization
   │
   └── Question Answering
   │
   ▼
LLM
   │
   ▼
Response
```

---

## 📥 7. Dedicated Ingestion Pipeline

Document processing is separated into:

```text
ingestion_pipeline/
```

This provides a modular architecture for:

- Loading documents
- Extracting content
- Cleaning text
- Splitting text
- Creating chunks
- Generating embeddings
- Storing vectors

Separating ingestion from query-time retrieval makes the architecture easier to scale and maintain.

---

## 🔐 8. Authentication

The application architecture supports authenticated access to enterprise resources.

Authentication provides a foundation for:

- User registration
- Secure login
- Protected routes
- User-specific resources
- Enterprise document access
- Chat history
- Role-based access

---

## 💬 9. Conversational Knowledge Assistant

Users can interact with enterprise knowledge through a conversational interface.

Example:

```text
User:
What is the employee leave policy?

        │
        ▼

Knowledge Assistant

        │
        ▼

Search Enterprise Documents

        │
        ▼

Retrieve Relevant Sections

        │
        ▼

Generate Answer

        │
        ▼

Assistant:
Based on the uploaded employee policy...
```

---

# 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │        USER         │
                         └──────────┬──────────┘
                                    │
                                    ▼
                    ┌─────────────────────────────┐
                    │      NEXT.JS FRONTEND       │
                    │                             │
                    │ Login / Dashboard           │
                    │ Document Interface          │
                    │ AI Chat                     │
                    └──────────────┬──────────────┘
                                   │
                                   │ REST API
                                   ▼
                    ┌─────────────────────────────┐
                    │       FASTAPI BACKEND       │
                    │                             │
                    │ Authentication              │
                    │ API Routes                  │
                    │ Business Logic              │
                    │ AI Orchestration            │
                    └──────────────┬──────────────┘
                                   │
              ┌────────────────────┼─────────────────────┐
              │                    │                     │
              ▼                    ▼                     ▼
      ┌───────────────┐    ┌────────────────┐    ┌───────────────┐
      │   SUPABASE    │    │   LANGCHAIN    │    │ VECTOR STORE  │
      │               │    │                │    │               │
      │ Authentication│    │ RAG Chains     │    │ Embeddings    │
      │ Database      │    │ Agents         │    │ Semantic      │
      │ Storage       │    │ Tools          │    │ Search        │
      └───────────────┘    └───────┬────────┘    └───────┬───────┘
                                   │                     │
                                   └──────────┬──────────┘
                                              │
                                              ▼
                                   ┌─────────────────────┐
                                   │    LLM PROVIDER     │
                                   │                     │
                                   │ Google Gemini       │
                                   │ OpenAI              │
                                   └─────────────────────┘
```

---

# 🔄 Complete RAG Pipeline

The application contains two primary RAG stages.

## Stage 1 — Document Ingestion

```text
Document
   │
   ▼
Document Loader
   │
   ▼
Text Extraction
   │
   ▼
Text Cleaning
   │
   ▼
Chunking
   │
   ▼
Embedding Model
   │
   ▼
Vector Embeddings
   │
   ▼
Vector Database
```

---

## Stage 2 — Question Answering

```text
User Question
      │
      ▼
Question Embedding
      │
      ▼
Vector Database Search
      │
      ▼
Top Relevant Chunks
      │
      ▼
Context Construction
      │
      ▼
LangChain
      │
      ▼
Gemini / OpenAI
      │
      ▼
AI Response
```

---

# 🔍 How RAG Works

### Step 1 — Upload

Enterprise documents are added to the knowledge base.

### Step 2 — Extract

The ingestion pipeline extracts text from the documents.

### Step 3 — Chunk

Large documents are divided into smaller chunks.

### Step 4 — Embed

Each chunk is transformed into a numerical vector using an embedding model.

### Step 5 — Store

The vectors are stored in a vector database.

### Step 6 — Ask

The user submits a natural-language question.

### Step 7 — Retrieve

The system searches for document chunks that are semantically similar to the question.

### Step 8 — Construct Context

The most relevant document content is assembled into context.

### Step 9 — Generate

The LLM receives the question and retrieved context.

### Step 10 — Respond

The final context-grounded response is returned to the user.

---

# 🧰 Technology Stack

## Generative AI

| Technology | Purpose |
|---|---|
| LLMs | Natural-language generation |
| RAG | Document-grounded question answering |
| LangChain | AI orchestration |
| Gemini | Generative AI / embeddings |
| OpenAI | Alternative LLM provider |
| Vector Embeddings | Semantic representation |
| Vector Search | Knowledge retrieval |

---

## Backend

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| FastAPI | REST API development |
| LangChain | AI/RAG workflows |
| REST APIs | Service communication |

---

## Frontend

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| React | UI development |
| TypeScript | Type-safe frontend development |

---

## Data & Storage

| Technology | Purpose |
|---|---|
| Supabase | Authentication and application services |
| PostgreSQL | Relational data |
| ChromaDB | Vector storage and similarity search |
| Embeddings | Semantic document representation |

---

## Development & Deployment

| Technology | Purpose |
|---|---|
| Git | Version control |
| GitHub | Source-code management |
| Vercel | Frontend deployment |
| Render | Backend deployment |

---

# 📁 Project Structure

```text
infosys-ai-knowledge-assistant/
│
├── ai_workflows/
│   └── AI workflow and orchestration components
│
├── backend/
│   └── FastAPI backend services
│
├── data/
│   └── Project data and sample resources
│
├── deployment/
│   └── Deployment configuration
│
├── docs/
│   └── Project documentation, diagrams and screenshots
│
├── frontend/
│   └── Frontend application
│
├── ingestion_pipeline/
│   └── Document ingestion and preprocessing
│
├── tests/
│   └── Application tests
│
├── .gitignore
├── .python-version
└── README.md
```

---

# ⚙️ Local Installation

## Prerequisites

Before running the application, install:

- Python
- Node.js
- npm
- Git

You may also need accounts/API credentials for:

- Google Gemini
- OpenAI
- Supabase

---

# 1️⃣ Clone the Repository

```bash
git clone https://github.com/chandraAkiran/infosys-ai-knowledge-assistant.git

cd infosys-ai-knowledge-assistant
```

---

# 2️⃣ Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment.

### macOS / Linux

```bash
python3 -m venv venv

source venv/bin/activate
```

### Windows

```bash
python -m venv venv

venv\Scripts\activate
```

Install the backend dependencies:

```bash
pip install -r requirements.txt
```

---

# 3️⃣ Environment Variables

Create a `.env` file for backend configuration.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key

OPENAI_API_KEY=your_openai_api_key

SUPABASE_URL=your_supabase_url

SUPABASE_KEY=your_supabase_key
```

> ⚠️ Never commit `.env` files, API keys, passwords, access tokens, or service-role credentials to GitHub.

---

# 4️⃣ Start the Backend

Example:

```bash
uvicorn main:app --reload
```

The backend will typically be available at:

```text
http://127.0.0.1:8000
```

FastAPI documentation can typically be accessed at:

```text
http://127.0.0.1:8000/docs
```

---

# 5️⃣ Frontend Setup

Open another terminal and navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

# 6️⃣ Frontend Environment Configuration

Configure the frontend environment variables required by the application.

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url

NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

# 7️⃣ Start the Frontend

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🔐 Security Architecture

Enterprise AI applications may work with confidential organizational knowledge.

The architecture should therefore enforce secure access patterns.

```text
User Login
    │
    ▼
Authentication
    │
    ▼
Access Token
    │
    ▼
Frontend
    │
    ▼
Backend API
    │
    ▼
Validate User
    │
    ▼
Authorized Knowledge Access
```

Important security practices include:

- Authentication before accessing protected resources
- Secure API access
- User-specific document retrieval
- Environment-based secret management
- Separation of frontend and backend credentials
- Secure document storage
- API key protection
- Controlled enterprise knowledge access

---

# 📖 Example Use Case

Suppose an organization uploads:

```text
Employee Handbook.pdf
```

The document contains:

```text
Employees are entitled to 20 paid annual leave days.
```

A user asks:

```text
How many annual leave days do employees receive?
```

The system performs:

```text
Question
   │
   ▼
Question Embedding
   │
   ▼
Semantic Search
   │
   ▼
Employee Handbook
Relevant Section
   │
   ▼
RAG Context
   │
   ▼
LLM
   │
   ▼
Answer
```

The assistant can then generate a response based on the retrieved enterprise document.

---

# 🏢 Enterprise Use Cases

The architecture can be adapted for:

- HR policy assistants
- Employee onboarding assistants
- Internal company knowledge bases
- IT support assistants
- Technical documentation search
- Company policy search
- Internal FAQ assistants
- Compliance knowledge systems
- Financial document analysis
- Project documentation assistants
- Customer-support knowledge bases
- Standard operating procedure search

---

# 🎯 Problems Addressed

## Manual Document Search

Employees may spend significant time manually searching large organizational documents.

The assistant provides natural-language knowledge retrieval.

---

## Information Overload

Organizations can have hundreds or thousands of documents.

Vector search helps identify the most relevant information.

---

## Keyword Search Limitations

Traditional search depends heavily on exact wording.

Semantic search retrieves information based on meaning.

---

## Generic LLM Responses

Generic LLMs may answer without access to internal company knowledge.

RAG supplies relevant enterprise context before generation.

---

## Knowledge Accessibility

Enterprise information can be distributed across multiple documents.

The knowledge assistant provides a conversational interface to retrieve it.

---

# 🧪 Example AI Workflow

```text
Question:

"What is the remote-work policy?"

             │
             ▼

Generate Query Embedding

             │
             ▼

Search Vector Database

             │
             ▼

Retrieve Relevant Policy Chunks

             │
             ▼

Construct Context

             │
             ▼

Prompt:

Context:
[Retrieved company policy]

Question:
"What is the remote-work policy?"

             │
             ▼

Gemini / OpenAI

             │
             ▼

Context-Grounded Response
```

---

# 🧠 Skills Demonstrated

This project demonstrates practical knowledge of:

### Generative AI

- Large Language Models
- Google Gemini
- OpenAI
- Prompt Engineering
- AI application development

### Retrieval-Augmented Generation

- Document ingestion
- Text extraction
- Chunking
- Embeddings
- Semantic search
- Vector retrieval
- Context construction
- Grounded generation

### LangChain

- Retrieval chains
- Prompt templates
- LLM integration
- Agents
- Tools
- AI workflow orchestration

### Backend Engineering

- Python
- FastAPI
- REST APIs
- Authentication
- Modular architecture

### Vector Databases

- ChromaDB
- Vector embeddings
- Similarity search
- Semantic retrieval

### Frontend Development

- Next.js
- React
- TypeScript
- API integration

### Data & Cloud

- Supabase
- PostgreSQL
- Authentication
- Git
- GitHub
- Cloud deployment concepts

---

# 🚀 Future Improvements

Potential enhancements include:

- [ ] Hybrid semantic and keyword search
- [ ] Reranking retrieved document chunks
- [ ] Advanced metadata filtering
- [ ] Support for DOCX documents
- [ ] Support for TXT files
- [ ] Support for CSV files
- [ ] OCR for scanned PDFs
- [ ] Persistent conversation memory
- [ ] More LLM providers
- [ ] Advanced AI agents
- [ ] Role-based access control
- [ ] Team workspaces
- [ ] Document versioning
- [ ] Knowledge-base analytics
- [ ] RAG evaluation framework
- [ ] Hallucination evaluation
- [ ] Automated testing
- [ ] Docker deployment
- [ ] CI/CD pipelines
- [ ] Voice-based interaction

---

# 💼 Resume-Ready Project Description

## Infosys AI Knowledge Assistant

**Tech Stack:** Python, FastAPI, Next.js, LangChain, Google Gemini, OpenAI, RAG, ChromaDB, Supabase, Vector Search

Built an **Enterprise AI Knowledge Assistant** using Retrieval-Augmented Generation (RAG), LangChain, Large Language Models, vector embeddings, semantic search, FastAPI, and Next.js.

Developed a modular enterprise document-processing architecture covering **document ingestion, text extraction, chunking, embedding generation, vector storage, semantic retrieval, context construction, and LLM-based question answering**.

Structured the application into independent **frontend, backend, AI workflow, ingestion pipeline, deployment, documentation, data, and testing modules**, providing a scalable foundation for enterprise Generative AI applications.

---

# 📄 Resume Bullet Points

- Built an **Enterprise AI Knowledge Assistant** using Python, FastAPI, Next.js, LangChain and Retrieval-Augmented Generation.
- Developed an end-to-end document ingestion pipeline covering text extraction, preprocessing, chunking, embeddings and semantic vector search.
- Implemented context-grounded question answering by retrieving relevant enterprise document content before LLM generation.
- Designed modular AI workflows for enterprise knowledge retrieval, question answering and Generative AI processing.
- Integrated vector search, LLM APIs, authentication and full-stack application components.
- Structured the project into separate frontend, backend, ingestion, AI workflow, deployment and testing modules for maintainability and scalability.

---

# 📌 Repository

**GitHub Repository:**

https://github.com/chandraAkiran/infosys-ai-knowledge-assistant

---

# 👨‍💻 Author

## Chandra Akash Kiran

**MTech in Computer Science**

### Areas of Interest

- Data Science
- Machine Learning
- Generative AI
- Retrieval-Augmented Generation
- Large Language Models
- AI Engineering
- Enterprise AI Applications

### GitHub

https://github.com/chandraAkiran

### Project Repository

https://github.com/chandraAkiran/infosys-ai-knowledge-assistant

---

# ⭐ Support

If you find this project useful, consider giving the repository a **⭐ Star**.

---

<p align="center">
  <strong>Built with Python • FastAPI • Next.js • LangChain • Gemini • OpenAI • ChromaDB • Supabase</strong>
</p>

<p align="center">
  <strong>Enterprise Knowledge + Retrieval-Augmented Generation + Generative AI</strong>
</p>
