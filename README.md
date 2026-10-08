# 🤖 Infosys AI Knowledge Assistant

<p align="center">
  <strong>Enterprise AI Knowledge Assistant powered by RAG, LangChain, LLMs, Vector Search, FastAPI, Next.js and Supabase</strong>
</p>

<p align="center">
  Python • FastAPI • Next.js • LangChain • Gemini • OpenAI • ChromaDB • Supabase
</p>

<p align="center">
  <a href="https://infosys-ai-knowledge-assistant.vercel.app">
    <strong>🚀 Live Demo</strong>
  </a>
  &nbsp;&nbsp; | &nbsp;&nbsp;
  <a href="https://infosys-ai-knowledge-assistant-ifkw.onrender.com">
    <strong>⚡ Backend API</strong>
  </a>
  &nbsp;&nbsp; | &nbsp;&nbsp;
  <a href="https://github.com/chandraAkiran/infosys-ai-knowledge-assistant">
    <strong>💻 GitHub Repository</strong>
  </a>
  <a href="https://drive.google.com/file/d/1si7K9vlBkVZaZCuBFpMS55HMIvR-N84h/view?usp=sharing">
    <strong>Video Presentation</strong>
  </a>
  &nbsp;&nbsp; | &nbsp;&nbsp;
</p>


---

# 📌 Project Overview

**Infosys AI Knowledge Assistant** is a full-stack enterprise-focused **Generative AI application** designed to help users search, understand, and interact with organizational documents using natural language.

The application uses **Retrieval-Augmented Generation (RAG)** to retrieve relevant information from enterprise documents before sending the context to a Large Language Model.

This allows the assistant to generate responses based on the organization's own knowledge instead of relying only on the general knowledge of the LLM.

The project combines:

- 📄 Enterprise document ingestion
- ✂️ Text extraction and chunking
- 🧠 Vector embeddings
- 🔎 Semantic search
- 📚 Retrieval-Augmented Generation (RAG)
- 🔗 LangChain workflows
- 🧰 AI agents and tools
- 🤖 Gemini / OpenAI integration
- 🗄️ ChromaDB vector storage
- 🔐 Supabase authentication
- 🗃️ PostgreSQL database
- 📦 Supabase Storage
- ⚡ FastAPI backend
- 💻 Next.js frontend
- ☁️ Vercel frontend deployment
- ☁️ Render backend deployment

---

# 🌐 Live Application

### 🚀 Frontend — Vercel

The production Next.js frontend is deployed on **Vercel**.

👉 **Live Application**

https://infosys-ai-knowledge-assistant.vercel.app

### ⚡ Backend — Render

The production FastAPI backend is deployed on **Render**.

👉 **Backend API**

https://infosys-ai-knowledge-assistant-ifkw.onrender.com

### 💻 Source Code

👉 **GitHub Repository**

https://github.com/chandraAkiran/infosys-ai-knowledge-assistant

---

# 🎯 Project Objectives

The primary objectives of this project are to:

- Build an enterprise AI knowledge assistant
- Implement Retrieval-Augmented Generation
- Process enterprise documents automatically
- Convert document content into vector embeddings
- Store embeddings in a vector database
- Perform semantic similarity search
- Retrieve relevant enterprise knowledge
- Generate context-grounded LLM responses
- Develop reusable LangChain workflows
- Support multiple LLM providers
- Implement secure authentication
- Build a modern frontend and backend architecture
- Deploy the application using cloud platforms

---

# ✨ Key Features

## 📄 Document Ingestion

Enterprise documents are processed through a dedicated ingestion pipeline.

```text
Document Upload
      │
      ▼
Text Extraction
      │
      ▼
Text Cleaning
      │
      ▼
Text Chunking
      │
      ▼
Embedding Generation
      │
      ▼
Vector Storage
```

This converts large enterprise documents into searchable vector representations.

---

## 🧠 Retrieval-Augmented Generation

The core AI system uses **Retrieval-Augmented Generation (RAG)**.

Instead of directly asking the LLM to answer a question, the system first searches the enterprise knowledge base.

```text
User Question
      │
      ▼
Question Embedding
      │
      ▼
Vector Search
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

This improves the relevance of responses because the LLM receives information retrieved from enterprise documents.

---

## 🔎 Semantic Search

The system performs semantic search using vector embeddings.

Unlike traditional keyword search, semantic search attempts to understand the meaning of the query.

### Example

Document:

```text
Employees are entitled to 20 days of paid annual leave.
```

Question:

```text
How many vacation days can employees take?
```

Even though the wording is different, semantic similarity can identify that **annual leave** and **vacation days** represent related concepts.

---

## 🤖 Large Language Model Integration

The architecture supports LLM-based enterprise workflows.

Supported or extensible providers include:

- Google Gemini
- OpenAI

LLMs can be used for:

- Enterprise question answering
- Document summarization
- Context-aware generation
- Knowledge retrieval
- Report analysis
- Policy interpretation
- Conversational AI

---

## 🔗 LangChain Integration

LangChain provides the orchestration layer between:

```text
User Question
      │
      ▼
Retriever
      │
      ▼
Vector Database
      │
      ▼
Retrieved Context
      │
      ▼
Prompt
      │
      ▼
LLM
      │
      ▼
Response
```

LangChain can support:

- Prompt templates
- Retrieval chains
- LLM integration
- Context construction
- AI agents
- Tool calling
- Output processing
- Reusable AI workflows

---

## 🧰 AI Workflows

The project contains a dedicated:

```text
ai_workflows/
```

module.

This helps separate AI orchestration from the frontend and backend application layers.

The architecture can support workflows such as:

```text
User Request
     │
     ▼
AI Workflow
     │
     ├── Document Search
     ├── Knowledge Retrieval
     ├── Question Answering
     └── Summarization
     │
     ▼
LLM
     │
     ▼
Response
```

---

## 📥 Document Ingestion Pipeline

A dedicated:

```text
ingestion_pipeline/
```

module handles document processing.

Typical responsibilities include:

- Document loading
- Text extraction
- Text preprocessing
- Text chunking
- Embedding generation
- Vector storage

Separating ingestion from query-time retrieval provides a cleaner and more scalable architecture.

---

## 🔐 Authentication

Supabase provides the foundation for secure user authentication.

The architecture supports:

- User registration
- User login
- Protected application routes
- User-specific resources
- Document ownership
- Chat sessions
- User-specific knowledge retrieval

---

## 💬 Conversational AI Interface

Users interact with enterprise knowledge through a conversational interface.

Example:

```text
User:
"What is the employee leave policy?"

          │
          ▼

AI Knowledge Assistant

          │
          ▼

Search Knowledge Base

          │
          ▼

Retrieve Relevant Documents

          │
          ▼

Construct RAG Context

          │
          ▼

Generate AI Response
```

---

# 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │        USER          │
                         └──────────┬───────────┘
                                    │
                                    │ HTTPS
                                    ▼
                    ┌──────────────────────────────┐
                    │      NEXT.JS FRONTEND        │
                    │                              │
                    │ Login / Signup               │
                    │ Dashboard                    │
                    │ Documents                    │
                    │ AI Chat                      │
                    │                              │
                    │      Hosted on Vercel        │
                    └──────────────┬───────────────┘
                                   │
                                   │ REST API
                                   ▼
                    ┌──────────────────────────────┐
                    │       FASTAPI BACKEND        │
                    │                              │
                    │ Authentication               │
                    │ API Routes                   │
                    │ Document Processing          │
                    │ AI Orchestration             │
                    │ RAG                          │
                    │                              │
                    │       Hosted on Render       │
                    └──────────────┬───────────────┘
                                   │
              ┌────────────────────┼───────────────────────┐
              │                    │                       │
              ▼                    ▼                       ▼
      ┌───────────────┐    ┌────────────────┐      ┌───────────────┐
      │   SUPABASE    │    │   LANGCHAIN    │      │   CHROMADB    │
      │               │    │                │      │               │
      │ Authentication│    │ RAG Chains     │      │ Embeddings    │
      │ PostgreSQL    │    │ Agents         │      │ Vector Store  │
      │ Storage       │    │ Tools          │      │ Search        │
      └───────────────┘    └───────┬────────┘      └───────┬───────┘
                                   │                       │
                                   └───────────┬───────────┘
                                               │
                                               ▼
                                   ┌───────────────────────┐
                                   │     LLM PROVIDERS     │
                                   │                       │
                                   │    Google Gemini      │
                                   │       OpenAI          │
                                   └───────────────────────┘
```

---

# ☁️ Deployment Architecture

| Component | Technology | Deployment |
|---|---|---|
| Frontend | Next.js / React / TypeScript | Vercel |
| Backend | Python / FastAPI | Render |
| AI Framework | LangChain | Backend |
| LLM | Gemini / OpenAI | Cloud API |
| Vector Database | ChromaDB | Backend |
| Authentication | Supabase Auth | Supabase |
| Database | PostgreSQL | Supabase |
| Storage | Supabase Storage | Supabase |
| Version Control | Git | GitHub |
| Repository Hosting | GitHub | GitHub |

---

# 🚀 Deployment Flow

```text
User Browser
     │
     ▼
┌──────────────────────────┐
│          VERCEL          │
│                          │
│     Next.js Frontend     │
└────────────┬─────────────┘
             │
             │ HTTPS / REST API
             ▼
┌──────────────────────────┐
│          RENDER          │
│                          │
│     FastAPI Backend      │
└────────────┬─────────────┘
             │
             ├────────────► Supabase
             │               │
             │               ├── Authentication
             │               ├── PostgreSQL
             │               └── Storage
             │
             ├────────────► ChromaDB
             │               │
             │               └── Vector Search
             │
             ├────────────► LangChain
             │               │
             │               ├── RAG
             │               ├── Agents
             │               └── Tools
             │
             └────────────► Gemini / OpenAI
                             │
                             └── AI Response
```

---

# 🔄 Complete RAG Pipeline

The RAG architecture can be divided into two primary stages.

## Stage 1 — Document Ingestion

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
Text Chunking
        │
        ▼
Embedding Model
        │
        ▼
Vector Embeddings
        │
        ▼
ChromaDB
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
ChromaDB Search
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

The user uploads an enterprise document.

### Step 2 — Extract

The ingestion pipeline extracts the document text.

### Step 3 — Clean

The extracted content is prepared for further processing.

### Step 4 — Chunk

Large documents are divided into smaller sections.

### Step 5 — Embed

Each chunk is transformed into a numerical vector representation.

### Step 6 — Store

The embeddings are stored in ChromaDB.

### Step 7 — Ask

The user submits a natural-language question.

### Step 8 — Search

The question is converted into an embedding and compared with stored vectors.

### Step 9 — Retrieve

The most relevant document chunks are retrieved.

### Step 10 — Construct Context

The retrieved chunks are assembled into the context supplied to the LLM.

### Step 11 — Generate

Gemini or OpenAI processes the retrieved context and question.

### Step 12 — Respond

The final context-grounded answer is returned to the frontend.

---

# 🧰 Technology Stack

## 🤖 Generative AI

| Technology | Purpose |
|---|---|
| Large Language Models | AI response generation |
| Google Gemini | Generative AI |
| OpenAI | Alternative LLM provider |
| RAG | Knowledge-grounded generation |
| LangChain | AI orchestration |
| Embeddings | Semantic representation |
| Vector Search | Enterprise knowledge retrieval |

---

## ⚙️ Backend

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| FastAPI | REST API development |
| LangChain | RAG and AI workflows |
| REST API | Frontend/backend communication |

---

## 💻 Frontend

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| React | User interface |
| TypeScript | Type-safe development |

---

## 🗄️ Data & Storage

| Technology | Purpose |
|---|---|
| Supabase | Backend platform |
| PostgreSQL | Application data |
| Supabase Auth | Authentication |
| Supabase Storage | File storage |
| ChromaDB | Vector database |

---

## ☁️ Deployment

| Technology | Purpose |
|---|---|
| Vercel | Frontend deployment |
| Render | Backend deployment |
| GitHub | Repository hosting |
| Git | Version control |

---

# 📁 Repository Structure

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
│   └── Project data and resources
│
├── deployment/
│   └── Deployment configuration
│
├── docs/
│   └── Project documentation and diagrams
│
├── frontend/
│   └── Next.js frontend application
│
├── ingestion_pipeline/
│   └── Document processing and ingestion
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

Install:

- Git
- Python
- Node.js
- npm

You may also need credentials for:

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

Navigate to the backend directory:

```bash
cd backend
```

Create a Python virtual environment.

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

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

---

# 3️⃣ Backend Environment Variables

Create a `.env` file.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key

OPENAI_API_KEY=your_openai_api_key

SUPABASE_URL=your_supabase_url

SUPABASE_KEY=your_supabase_key
```

> ⚠️ Never commit `.env` files, API keys, passwords, access tokens, or service-role credentials to GitHub.

---

# 4️⃣ Run the FastAPI Backend

Example:

```bash
uvicorn main:app --reload
```

The backend will typically be available locally at:

```text
http://127.0.0.1:8000
```

FastAPI API documentation is typically available at:

```text
http://127.0.0.1:8000/docs
```

Production backend:

```text
https://infosys-ai-knowledge-assistant-ifkw.onrender.com
```

---

# 5️⃣ Frontend Setup

Open another terminal.

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

# 6️⃣ Frontend Environment Variables

Configure the environment variables required by the frontend.

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url

NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

For production, configure the API URL to point to the Render backend:

```text
https://infosys-ai-knowledge-assistant-ifkw.onrender.com
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

Production application:

```text
https://infosys-ai-knowledge-assistant.vercel.app
```

---

# 🔐 Security

Enterprise AI systems can process confidential organizational information.

Important security practices include:

- User authentication
- Protected API endpoints
- User-specific document access
- Environment-variable based secret management
- Secure API key handling
- Separation of frontend and backend secrets
- Secure document storage
- Access-controlled knowledge retrieval
- Backend request validation
- Avoiding sensitive credentials in GitHub

---

# 📖 Example Use Case

Suppose an organization uploads:

```text
Employee Handbook.pdf
```

The document contains:

```text
Employees are entitled to 20 days of paid annual leave.
```

A user asks:

```text
How many vacation days do employees receive?
```

The application processes the question as follows:

```text
Question
   │
   ▼
Question Embedding
   │
   ▼
Vector Search
   │
   ▼
Relevant Handbook Section
   │
   ▼
RAG Context
   │
   ▼
Gemini / OpenAI
   │
   ▼
Context-Grounded Answer
```

The answer is generated using the relevant enterprise document content.

---
# 👤 Demo Accounts

The deployed application includes demonstration accounts for testing the authentication, employee, and admin features.

> **Note:** These are demo/test accounts created specifically for this project. They are **not real Infosys accounts or credentials**.

## 👨‍💼 Employee Account

```text
Email: employee@infosys.com
Password: password123
Role: Employee
```

Use the employee account to test standard user functionality such as accessing the application and interacting with the AI Knowledge Assistant.

---

## 👨‍💻 Admin Account

```text
Email: admin@infosys.com
Password: Admin@12345
Role: Admin
```

Use the admin account to test administrative functionality available in the application.

---

## 🚀 Try the Demo

Open the deployed application:

https://infosys-ai-knowledge-assistant.vercel.app

Then sign in using either of the demo accounts above.

> ⚠️ **Security Notice:** These credentials are provided only for demonstration and portfolio evaluation. They must not be treated as real Infosys credentials. For a production deployment, demo credentials should be removed and replaced with secure user provisioning, strong passwords, appropriate authorization controls, and proper secret-management practices.

---

# 🏢 Enterprise Use Cases

The application architecture can be adapted for:

- HR Policy Assistant
- Employee Onboarding Assistant
- Internal Company Knowledge Base
- IT Support Assistant
- Technical Documentation Search
- Company Policy Search
- Internal FAQ Chatbot
- Compliance Knowledge Assistant
- Financial Report Analysis
- Project Documentation Search
- Customer Support Knowledge Base
- Standard Operating Procedure Assistant

---

# 🎯 Problems Addressed

## Manual Document Search

Employees may spend significant time manually searching large organizational documents.

The AI assistant provides natural-language document retrieval.

---

## Information Overload

Organizations may maintain hundreds or thousands of documents.

Vector search helps identify the most relevant information.

---

## Keyword Search Limitations

Traditional search depends heavily on exact wording.

Semantic search retrieves information based on meaning.

---

## Generic LLM Responses

General-purpose LLMs may not have access to internal organizational knowledge.

RAG provides relevant enterprise context before response generation.

---

## Enterprise Knowledge Accessibility

Important organizational information may be distributed across many files and systems.

The knowledge assistant provides a conversational interface for accessing that information.

---

# 🧪 Example RAG Workflow

```text
Question:

"What is the remote work policy?"

             │
             ▼

Generate Query Embedding

             │
             ▼

Search ChromaDB

             │
             ▼

Retrieve Relevant Policy Chunks

             │
             ▼

Construct Context

             │
             ▼

LangChain Prompt

             │
             ▼

Gemini / OpenAI

             │
             ▼

Context-Grounded Response
```

---

# 🧠 Skills Demonstrated

## Generative AI

- Large Language Models
- Google Gemini
- OpenAI
- Prompt Engineering
- AI Application Development

## Retrieval-Augmented Generation

- Document ingestion
- Text extraction
- Chunking
- Embeddings
- Semantic search
- Vector retrieval
- Context construction
- Grounded generation

## LangChain

- Retrieval workflows
- Prompt templates
- LLM integration
- Agents
- Tools
- AI workflow orchestration

## Backend Engineering

- Python
- FastAPI
- REST APIs
- Authentication
- Modular backend architecture

## Vector Databases

- ChromaDB
- Vector embeddings
- Similarity search
- Semantic retrieval

## Frontend Development

- Next.js
- React
- TypeScript
- REST API integration

## Data & Cloud

- Supabase
- PostgreSQL
- Authentication
- Storage
- Vercel
- Render
- Git
- GitHub

---

# 🚀 Future Enhancements

- [ ] Hybrid keyword + semantic search
- [ ] Reranking retrieved chunks
- [ ] Advanced metadata filtering
- [ ] DOCX document support
- [ ] TXT document support
- [ ] CSV support
- [ ] OCR for scanned documents
- [ ] Advanced conversation memory
- [ ] Additional LLM providers
- [ ] Advanced AI agents
- [ ] Role-based access control
- [ ] Team workspaces
- [ ] Document versioning
- [ ] Knowledge-base analytics
- [ ] RAG evaluation framework
- [ ] Hallucination evaluation
- [ ] Automated integration tests
- [ ] Docker support
- [ ] CI/CD pipeline
- [ ] Voice-based interaction
- [ ] Monitoring and observability

---
  
# 🔗 Project Links

### 🚀 Live Application

https://infosys-ai-knowledge-assistant.vercel.app

### ⚡ Backend API

https://infosys-ai-knowledge-assistant-ifkw.onrender.com

### 💻 GitHub Repository

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

---

# ⭐ Support

If you find this project useful, consider giving the repository a **⭐ Star**.

---

<p align="center">
  <strong>Built with Python • FastAPI • Next.js • LangChain • Gemini • OpenAI • ChromaDB • Supabase</strong>
</p>

<p align="center">
  <strong>Deployed with Vercel + Render</strong>
</p>

<p align="center">
  <strong>Enterprise Knowledge + RAG + Generative AI</strong>
</p>
