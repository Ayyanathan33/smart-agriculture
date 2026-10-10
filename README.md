# KisanPulse — Smart Agriculture: Disease Prediction for Indian Smallholders

Exact clone and backend implementation of **[kisanpulse-smart-agriculture-disease-prediction.ai.studio](https://kisanpulse-smart-agriculture-disease-prediction.ai.studio)**, with integrated **Google Gemini Multimodal AI**, **OpenAI ChatGPT Vision AI**, and **Live Internet Plant Pathology Knowledge Gathering**.

---

## 🌾 Features

1. **Dual Multimodal AI Vision Engine (Gemini 3.8 Flash + OpenAI ChatGPT)**:
   - Live camera capture and image upload for Rice, Wheat, Tomato, Potato, Cotton, Sugarcane, Chilli, and Groundnut.
   - Support for both **Google Gemini (`gemini-3.8-flash`)** and **OpenAI ChatGPT (`gpt-4o` / `gpt-4o-mini`)**.
   - **Smart Automatic Failover**: If Gemini or ChatGPT experiences rate limits or demand spikes, the system automatically routes to the companion engine with zero downtime.

2. **Live Internet Plant Disease Research & Grounding (`backend/internetResearcher.js`)**:
   - Gathers real-time botanical & pathology research via Wikipedia API and verified ICAR / SAU datasets.
   - Disease symptoms in leaf images are cross-referenced directly against online agricultural research data.
   - AI diagnosis cites verified pathogen identities, official ICAR research sources, and approved remedies.

3. **3D Digital Farm Twin & Agro-Climatic Intelligence (`/api/ai/farm-brain`)**:
   - 3–7 day micro-climate spore pressure and disease risk forecasting.
   - Interactive farm scenario modeling (drip deficit irrigation, bio-mulching, trap barriers, IPM).
   - Sustainable farm score calculation and what-if predictive yield/cost outcomes.

4. **Multilingual AI Agronomist Copilot (`/api/ai/copilot`)**:
   - Conversational assistant answering farmer queries with voice readout in **8 Indian languages**: English, Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, and Bengali.
   - Backed by live web research data for specific crops, pathogens, and dosages.

5. **Alert & Alarm Center + PWA Service Worker**:
   - Acoustic sirens and push notifications for critical outbreaks.
   - Longitudinal crop recovery tracker and one-click KVK case packet generator (1800-180-1551).

6. **Unified AI Engine & Key Manager Widget (`public/gemini-widget.js`)**:
   - In-app floating modal to configure, test, and switch between Gemini and ChatGPT.
   - Toggle live web data gathering on or off with instant live web preview.

---

## 🚀 Quick Start

### 1. Run the Server
```bash
npm start
```
The server runs live at:
👉 **http://localhost:3000**

### 2. Environment Configuration
Keys and models can be set in [`.env`](file:///c:/Users/sayya/OneDrive/Documents/smart%20agriculture/.env) or inside the in-app settings widget:
```env
# Google Gemini API Key
GEMINI_API_KEY=your_gemini_key_here
GEMINI_MODEL=gemini-3.8-flash

# OpenAI ChatGPT API Key
OPENAI_API_KEY=your_openai_key_here
OPENAI_MODEL=gpt-4o-mini

# Routing Strategy: auto | gemini | chatgpt
AI_ENGINE=auto

# Live Internet Plant Pathology Research
INTERNET_RESEARCH=true

PORT=3000
```

---

## 📡 API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/ai/status` | `GET` | Returns active engine statuses (Gemini, ChatGPT, Web research) |
| `/api/ai/key-status` | `GET` | Returns masked key info and active models |
| `/api/ai/configure-key` | `POST` | Validates, updates, and persists Gemini/OpenAI settings to `.env` |
| `/api/ai/internet-research` | `GET` | Gathers and tests live web pathology data for any crop/pathogen |
| `/api/ai/crop-doctor` | `POST` | Multimodal leaf pathology diagnosis cross-referenced with web data |
| `/api/ai/farm-brain` | `POST` | 3–7 day agro-climatic forecasting and sustainability simulation |
| `/api/ai/copilot` | `POST` | Multilingual AI agronomist Q&A copilot grounded in web research |

---

## 📁 Project Structure

```
smart agriculture/
├── backend/
│   └── internetResearcher.js    # Live web disease knowledge & Wikipedia API gatherer
├── public/
│   ├── assets/
│   │   ├── index-DSj3TDBa.js
│   │   ├── index-Cerg7oLA.css
│   │   ├── hero_indian_smart_farm_1791449788361-CfUKlhaR.jpg
│   │   ├── sample_leaf_rice_blast_1791449808969-DbdkI9as.jpg
│   │   └── sample_leaf_healthy_wheat_1791449844187-D9SIKk5J.jpg
│   ├── gemini-widget.js          # AI Engine & Live Web settings widget
│   ├── icon.svg
│   ├── index.html
│   ├── manifest.json
│   └── sw.js
├── .env
├── .env.example
├── package.json
├── server.js                     # Unified backend with failover & multimodal routing
└── README.md
```
