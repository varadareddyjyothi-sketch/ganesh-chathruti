import os
import re
# pyrefly: ignore [missing-import]
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Dictionary of spiritual and positive themes to generate uplifting responses
THEME_BLESSINGS = {
    "health": "May Lord Ganesha bless you and your loved ones with abundant health, vitality, and well-being.",
    "happiness": "May eternal joy and peace fill your heart and home throughout this sacred season.",
    "family": "May Ganesha protect your family with unity, love, harmony, and prosperity.",
    "success": "May all obstacles vanish from your career, education, and dreams. Success is yours.",
    "peace": "May divine calmness fill your spirit and silence all anxieties.",
    "wisdom": "May Ganesha, the lord of wisdom, guide every decision you make toward light.",
    "love": "May unconditional warmth and kindness flow through your life abundantly."
}

DEFAULT_BLESSING = "May Lord Ganesha remove every obstacle from your path and illuminate your journey with success and peace."

def analyze_sentiment_and_intent(wish_text):
    wish_lower = wish_text.lower()
    
    # Simple word matching for intent
    matched_themes = []
    for theme, blessing in THEME_BLESSINGS.items():
        if theme in wish_lower or (theme == "health" and any(w in wish_lower for w in ["cure", "heal", "body", "sick", "fitness"])):
            matched_themes.append(theme)
        elif (theme == "success" and any(w in wish_lower for w in ["job", "career", "money", "pass", "exam", "wealth", "dream", "goal"])):
            matched_themes.append(theme)
        elif (theme == "happiness" and any(w in wish_lower for w in ["joy", "smile", "happy", "glad", "content"])):
            matched_themes.append(theme)

    sentiment = "hopeful"
    if any(w in wish_lower for w in ["thank", "grateful", "blessed", "gratitude"]):
        sentiment = "devotional & grateful"
    elif any(w in wish_lower for w in ["help", "protect", "save", "fear"]):
        sentiment = "seeking protection"

    if matched_themes:
        primary_theme = matched_themes[0]
        positive_msg = THEME_BLESSINGS[primary_theme]
    else:
        positive_msg = DEFAULT_BLESSING

    return {
        "sentiment": sentiment,
        "primaryTheme": matched_themes[0] if matched_themes else "blessings",
        "positiveMessage": positive_msg,
        "status": "success"
    }

@app.route('/analyze-wish', methods=['POST'])
def analyze_wish():
    try:
        data = request.get_json(silent=True) or {}
        wish = data.get('wish', '').strip()
        
        if not wish:
            return jsonify({"error": "Wish cannot be empty"}), 400

        result = analyze_sentiment_and_intent(wish)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e), "positiveMessage": DEFAULT_BLESSING, "sentiment": "hopeful"}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "service": "Ganesh Blessings Python Microservice"}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    print(f"Ganesh Blessings Python Microservice running on port {port}")
    app.run(host='0.0.0.0', port=port, debug=True)
