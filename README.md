# 🤖 FriendSense AI

## AI & Machine Learning Based Friendship Analysis System

FriendSense AI is a web-based Artificial Intelligence and Machine Learning system designed to analyze friendship patterns through a series of interactive questions.

The system evaluates different aspects of a friendship such as trust, emotional support, negativity, communication, jealousy, and overall relationship quality. It generates a Friendship Score along with personalized suggestions.

---

## 🌟 Features

- 🤖 Interactive friendship analysis
- 💬 16 friendship-related questions
- 📊 Friendship Score out of 100
- 🧠 Machine Learning based prediction
- 🔍 Toxicity analysis
- 🤝 Trust analysis
- ❤️ Emotional support analysis
- 💡 Personalized friendship advice
- 📋 AI Analysis Report
- 🎨 Interactive and responsive user interface
- ⚡ Flask-based backend
- 📈 TF-IDF text feature extraction
- 🤖 LinearSVC Machine Learning model

---

## 🧠 System Architecture

FriendSense AI uses a hybrid approach combining rule-based analysis modules with a trained Machine Learning model.

### Analysis Modules

**1. Toxicity Detector**

Analyzes negative friendship patterns such as jealousy, frequent fights, stress, lying, and negativity.

**2. Trust Analyzer**

Evaluates trust-related responses including honesty, privacy, safety, and reliability.

**3. Emotion Detector**

Analyzes emotional support, emotional connection, happiness, and emotional exhaustion.

### Machine Learning Model

The system uses a trained Linear Support Vector Classifier (LinearSVC) with TF-IDF text vectorization.

The user's responses are combined into text and sent to the Flask backend, where the Machine Learning model predicts the corresponding behavioral category.

### Decision Layer

The analysis results are combined by a decision layer to generate the final Friendship Score and category.

### Architecture Flow

User → 16 Interactive Questions → Friendship Analysis → Toxicity Analysis + Trust Analysis + Emotion Analysis → Machine Learning Model → Decision Layer → Final Friendship Score → AI Analysis Report & Personalized Advice

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Python
- Flask

### Machine Learning

- Scikit-learn
- TF-IDF Vectorizer
- LinearSVC

### Data Processing

- Pandas
- CSV Dataset

---

## 📁 Project Structure

FriendSense-AI/

├── app.py  
├── requirements.txt  
├── ultimate_dataset.csv  
├── .gitignore  
│  
├── static/  
│   ├── css/  
│   │   ├── style.css  
│   │   └── analyze.css  
│   │  
│   └── js/  
│       └── analyze.js  
│  
└── templates/  
    ├── index.html  
    └── analyze.html

---

## ⚙️ How to Run

### 1. Clone the Repository

git clone https://github.com/hamnafatima2072005-create/FriendSense-AI.git

### 2. Navigate to the Project

cd FriendSense-AI

### 3. Create a Virtual Environment

python -m venv venv

### 4. Activate the Virtual Environment

For Windows:

venv\Scripts\activate

### 5. Install Dependencies

pip install -r requirements.txt

### 6. Run the Flask Application

python app.py

### 7. Open in Browser

http://127.0.0.1:5000

---

## 📊 Friendship Analysis

The system evaluates the friendship based on:

- Trust
- Emotional Support
- Communication
- Negativity
- Jealousy
- Honesty
- Quality Time
- Emotional Connection
- Friendship Stress

### Final Result Categories

- 🎉 Amazing Friendship
- 💖 Healthy Friendship
- 💭 Mixed Friendship
- 💔 Toxic Friendship Detected

---

## 🧠 Machine Learning Workflow

User Answers → Text Summary → TF-IDF Vectorization → LinearSVC Model → Behavior Prediction → Decision Layer → Final Friendship Result

---

## 🎯 Purpose of the Project

The purpose of FriendSense AI is to demonstrate how Artificial Intelligence and Machine Learning can be applied to analyze human relationship patterns through interactive behavioral data.

The project provides users with an easy-to-understand analysis of friendship characteristics and offers suggestions for improving healthy communication and relationships.

---

## 🚀 Future Enhancements

Future versions of FriendSense AI can include:

- Real AI Agent architecture
- Large Language Model integration
- Advanced Natural Language Processing
- Real-time conversational AI
- Voice-based friendship analysis
- Sentiment and emotion recognition
- Personalized AI recommendations
- User accounts and analysis history
- Database integration
- Mobile application
- More advanced Machine Learning models

---


## 📌 Project Information

| Field | Details |
|---|---|
| Project Name | FriendSense AI |
| Domain | Artificial Intelligence & Machine Learning |
| Platform | Web Application |
| Backend | Flask |
| ML Model | LinearSVC |
| Feature Extraction | TF-IDF |
| Programming Language | Python |
| Frontend | HTML, CSS, JavaScript |

---

## ⭐ Acknowledgement

This project was developed as an academic project to explore Artificial Intelligence, Machine Learning, Natural Language Processing, and web-based intelligent systems.
