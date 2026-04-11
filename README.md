# Eventbooking AI: The Intelligent Event Assistant

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-6DB33F?style=flat-square&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![LLM](https://img.shields.io/badge/LLM-Llama_3.1-blue?style=flat-square)](https://groq.com/)
[![RAG](https://img.shields.io/badge/Framework-RAG-orange?style=flat-square)](https://github.com/facebookresearch/faiss)

A high-performance, full-stack event management platform that uses **Retrieval-Augmented Generation (RAG)** to provide 100% accurate answers about venue policies, bookings, and schedules. 

---

## Project Highlights
* **Zero Hallucination:** Unlike standard AI, this assistant only answers based on your uploaded event documents.
* **Dual-Engine Brain:** Powered by **Llama 3.1** for natural conversation and **FAISS** for lightning-fast document search.
* **Full-Stack Integration:** A seamless experience built with **React** (Frontend), **Spring Boot** (Backend), and **PostgreSQL**.
* **Enterprise Ready:** Designed to handle real-world business data like venue brochures, pricing lists, and safety rules.

---

The Tech Stack

| Layer | Technology |
|---|---|
| **AI Intelligence** | Llama 3.1 (via Groq API) |
| **Search Engine** | RAG with FAISS Vector Database |
| **Backend** | Spring Boot (Java) |
| **Frontend** | React.js & Streamlit |
| **Database** | PostgreSQL |

---

---

## The Power of Llama 3.1 (Our LLM Engine)
While the RAG finds the facts, the **Large Language Model (LLM)** is what makes the assistant smart. We use **Llama 3.1** to:
* **Understand Context:** It doesn't just look for words; it understands what the user actually wants.
* **Natural Conversation:** It turns dry data into friendly, professional advice.
* **Complex Reasoning:** It can summarize long policy documents into a short, 2-line answer.

---

##  How It Works: The Hybrid Approach
Our system uses a "Two-Step" process to ensure the best results:

1.  **Retrieval (RAG):** When you ask a question, the system searches your uploaded PDFs and finds the exact information.
2.  **Generation (LLM):** The **Llama 3.1** model reads that information and writes a human-like response.

> **Why this matters:** By using an LLM + RAG, the assistant stays 100% truthful (no lying) while sounding like a real human expert.
---

Project Structure

```text
├── backend-spring/      # Java Spring Boot API for user & booking management
├── frontend-react/      # Main user dashboard
├── ai-engine/           # Python RAG implementation (LangChain + FAISS)
└── data/                # Sample event documents and brochures

### Dashboard Overview
<img src="https://github.com/user-attachments/assets/a4cf3f71-02a3-467c-a3b7-4c97bef47858" width="800" />

### AI Query Interface
<img src="https://github.com/user-attachments/assets/6d8fdd2b-e2f9-4f66-939a-f224a574fe6a" width="800" />

### Database & Backend Logs
<img src="https://github.com/user-attachments/assets/dde5e7a-6172-4d67-ac4f-73c462cc2149" width="800" />
