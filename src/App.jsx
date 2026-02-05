import React, { useState, useEffect } from "react";

function App() {
  const [type, setType] = useState("");
  const [resultats, setResultats] = useState([]);
  const [erreur, setErreur] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const liste = [
    { nom: "banane", type: "fruit", emoji: "🍌" },
    { nom: "orange", type: "fruit", emoji: "🍊" },
    { nom: "pomme", type: "fruit", emoji: "🍎" },
    { nom: "raisins", type: "fruit", emoji: "🍇" },
    { nom: "kiwi", type: "fruit", emoji: "🥝" },
    { nom: "tomate", type: "legume", emoji: "🍅" },
    { nom: "carotte", type: "legume", emoji: "🥕" },
    { nom: "pomme de terre", type: "legume", emoji: "🥔" },
    { nom: "navet", type: "legume", emoji: "🥬" },
    { nom: "poivron", type: "legume", emoji: "🫑" },
    { nom: "fraise", type: "fruit", emoji: "🍓" },
    { nom: "melon", type: "fruit", emoji: "🍈" },
    { nom: "pastèque", type: "fruit", emoji: "🍉" },
    { nom: "ananas", type: "fruit", emoji: "🍍" },
    { nom: "brocoli", type: "legume", emoji: "🥦" },
    { nom: "aubergine", type: "legume", emoji: "🍆" },
    { nom: "concombre", type: "legume", emoji: "🥒" },
    { nom: "maïs", type: "legume", emoji: "🌽" },
  ];

  useEffect(() => {
    // إضافة تأثيرات عند تغيير النتائج
    if (resultats.length > 0) {
      const timer = setTimeout(() => {
        // إزالة أي رسائل خطأ قديمة
        setErreur("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [resultats]);

  function handleSubmit(e) {
    e.preventDefault();
    
    if (!inputValue.trim()) {
      setErreur("Veuillez entrer un type (fruit ou légume)");
      shakeElement(".rechercher-container");
      return;
    }

    const typeInput = inputValue.toLowerCase().trim();
    setErreur("");
    setIsLoading(true);

    // محاكاة تأخير الشبكة
    setTimeout(() => {
      // تحقق من المدخلات المقبولة (دعم الفرنسي والإنجليزي)
      const validInputs = ["fruit", "legume", "légume", "fruits", "légumes", "legumes"];
      
      if (!validInputs.includes(typeInput)) {
        setErreur("Veuillez entrer uniquement 'fruit' ou 'legume'");
        setType("");
        setResultats([]);
        setIsLoading(false);
        shakeElement(".rechercher-container");
        return;
      }

      // معالجة أنواع الإدخال
      let searchType = typeInput;
      if (typeInput === "fruits") searchType = "fruit";
      if (typeInput === "légumes" || typeInput === "legumes") searchType = "legume";
      
      setType(searchType);
      
      // تصفية النتائج
      const filteredResults = liste.filter((item) => 
        item.type.toLowerCase() === searchType
      );
      
      setResultats(filteredResults);
      setIsLoading(false);
      
      // تأكيد نجاح البحث
      if (filteredResults.length > 0) {
        successAnimation(".results-count");
      }
    }, 500);
  }

  // تأثير هزاز للخطأ
  function shakeElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.style.animation = "shake 0.5s ease-in-out";
      setTimeout(() => {
        element.style.animation = "";
      }, 500);
    }
  }

  // تأثير للنجاح
  function successAnimation(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.style.animation = "pulse 0.5s ease-in-out";
      setTimeout(() => {
        element.style.animation = "";
      }, 500);
    }
  }

  // تفريغ الحقول
  function handleReset() {
    setType("");
    setResultats([]);
    setErreur("");
    setInputValue("");
    setIsLoading(false);
  }

  // البحث التلقائي عند تغيير النص
  function handleInputChange(e) {
    const value = e.target.value;
    setInputValue(value);
    
    // بحث فوري إذا كان النص طويلاً
    if (value.length >= 3) {
      const validInputs = ["fruit", "legume", "légume", "fruits", "légumes", "legumes"];
      const typeInput = value.toLowerCase().trim();
      
      if (validInputs.includes(typeInput)) {
        let searchType = typeInput;
        if (typeInput === "fruits") searchType = "fruit";
        if (typeInput === "légumes" || typeInput === "legumes") searchType = "legume";
        
        setType(searchType);
        setResultats(liste.filter(item => item.type === searchType));
      }
    }
  }

  // قراءة النتائج بصوت عالٍ
  function speakResults() {
    if (resultats.length > 0) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = `J'ai trouvé ${resultats.length} ${type}${resultats.length > 1 ? 's' : ''}. Les ${type}s sont: ${resultats.map(r => r.nom).join(', ')}`;
      speech.lang = 'fr-FR';
      speech.rate = 0.9;
      window.speechSynthesis.speak(speech);
    }
  }

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
        }
        
        body {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          color: #333;
        }
        
        .rechercher-container {
          max-width: 600px;
          width: 100%;
          margin: 0 auto;
          padding: 35px 30px;
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 
            0 25px 60px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .rechercher-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #667eea, #764ba2);
        }
        
        h1 {
          color: #2d3748;
          margin-bottom: 30px;
          text-align: center;
          font-size: 32px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
        }
        
        .emoji-title {
          font-size: 40px;
        }
        
        form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 25px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        label {
          font-weight: 600;
          color: #4a5568;
          font-size: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        input {
          padding: 16px 20px;
          border-radius: 15px;
          border: 2px solid #e2e8f0;
          font-size: 18px;
          transition: all 0.3s;
          background: #f8fafc;
        }
        
        input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          background: white;
        }
        
        .buttons-container {
          display: flex;
          gap: 12px;
          margin-top: 10px;
        }
        
        button {
          padding: 16px 24px;
          border-radius: 15px;
          border: none;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 55px;
        }
        
        .btn-submit {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }
        
        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
        
        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .btn-reset {
          background: linear-gradient(135deg, #718096, #4a5568);
          color: white;
          box-shadow: 0 4px 15px rgba(113, 128, 150, 0.3);
        }
        
        .btn-reset:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(113, 128, 150, 0.4);
        }
        
        .btn-speak {
          background: linear-gradient(135deg, #38b2ac, #319795);
          color: white;
          margin: 15px auto;
          max-width: 250px;
        }
        
        .type-info {
          margin: 25px 0;
          font-size: 20px;
          text-align: center;
          padding: 18px;
          border-radius: 15px;
          background: linear-gradient(135deg, #d6bcfa, #b794f4);
          color: #2d3748;
          font-weight: 600;
          border-left: 5px solid #667eea;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        
        .error-message {
          color: #c53030;
          font-weight: 600;
          text-align: center;
          margin: 20px 0;
          padding: 16px;
          border-radius: 12px;
          background-color: #fed7d7;
          border: 2px solid #fc8181;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          animation: slideIn 0.3s ease-out;
        }
        
        .loading-spinner {
          text-align: center;
          margin: 30px 0;
          color: #667eea;
        }
        
        .spinner {
          border: 4px solid #e2e8f0;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin: 0 auto 15px;
        }
        
        .empty-result {
          color: #718096;
          text-align: center;
          font-weight: 600;
          margin: 25px 0;
          padding: 20px;
          border-radius: 15px;
          background-color: #f7fafc;
          border: 3px dashed #cbd5e0;
          font-size: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }
        
        .results-count {
          color: #2d3748;
          font-weight: 700;
          margin-bottom: 20px;
          font-size: 18px;
          text-align: center;
          padding: 15px;
          border-radius: 12px;
          background: linear-gradient(135deg, #c6f6d5, #9ae6b4);
          animation: fadeIn 0.5s ease-out;
        }
        
        ul {
          list-style: none;
          padding: 0;
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }
        
        li {
          background: linear-gradient(135deg, #ebf4ff, #c3dafe);
          padding: 20px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          gap: 15px;
          transition: all 0.3s;
          border-left: 5px solid #4299e1;
          cursor: pointer;
        }
        
        li:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          background: linear-gradient(135deg, #bee3f8, #90cdf4);
        }
        
        .item-emoji {
          font-size: 28px;
        }
        
        .item-name {
          font-size: 18px;
          font-weight: 600;
          color: #2d3748;
        }
        
        .counter {
          margin-top: 30px;
          text-align: center;
          font-size: 15px;
          color: #718096;
          padding: 15px;
          border-top: 2px solid #e2e8f0;
        }
        
        /* Animations */
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          body {
            padding: 15px;
          }
          
          .rechercher-container {
            padding: 25px 20px;
            border-radius: 20px;
          }
          
          h1 {
            font-size: 28px;
          }
          
          input {
            padding: 14px 18px;
            font-size: 16px;
          }
          
          button {
            padding: 14px 20px;
            font-size: 15px;
            min-height: 50px;
          }
          
          ul {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 10px;
          }
          
          li {
            padding: 16px;
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }
          
          .item-emoji {
            font-size: 24px;
          }
        }
        
        @media (max-width: 480px) {
          h1 {
            font-size: 24px;
            flex-direction: column;
            gap: 10px;
          }
          
          .buttons-container {
            flex-direction: column;
          }
          
          ul {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          
          .emoji-title {
            font-size: 32px;
          }
          
          .type-info {
            font-size: 18px;
            padding: 14px;
          }
        }
        
        @media (min-width: 1200px) {
          .rechercher-container {
            max-width: 700px;
            padding: 40px 35px;
          }
          
          h1 {
            font-size: 36px;
          }
          
          ul {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          }
        }
      `}</style>

      <div className="rechercher-container">
        <h1>
          <span className="emoji-title">🔍</span>
          Recherche d'Aliments
          <span className="emoji-title">🥗</span>
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="type">
              <span>📝</span>
              Type (fruit / légume)
            </label>
            <input
              type="text"
              id="type"
              name="type"
              placeholder="Ex: fruit, légume, fruits, légumes..."
              value={inputValue}
              onChange={handleInputChange}
              required
              autoComplete="off"
            />
          </div>
          
          <div className="buttons-container">
            <button 
              type="submit" 
              className="btn-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span>⏳</span>
                  Recherche...
                </>
              ) : (
                <>
                  <span>🔍</span>
                  Rechercher
                </>
              )}
            </button>
            <button type="button" onClick={handleReset} className="btn-reset">
              <span>🔄</span>
              Réinitialiser
            </button>
          </div>
        </form>
        
        {isLoading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Recherche en cours...</p>
          </div>
        )}
        
        {erreur && (
          <p className="error-message">
            <span>⚠️</span>
            {erreur}
          </p>
        )}
        
        {type && !erreur && !isLoading && (
          <p className="type-info">
            <span>📊</span>
            Résultats pour : <strong>{type}</strong>
          </p>
        )}
        
        {resultats.length > 0 && !isLoading && (
          <>
            <div className="results-count">
              {resultats.length} résultat{resultats.length > 1 ? 's' : ''} trouvé{resultats.length > 1 ? 's' : ''}
            </div>
            
            <button className="btn-speak" onClick={speakResults}>
              <span>🔊</span>
              Lire les résultats
            </button>
          </>
        )}
        
        {resultats.length === 0 && type && !erreur && !isLoading && (
          <div className="empty-result">
            <span>😕</span>
            Aucun résultat trouvé
          </div>
        )}
        
        {resultats.length > 0 && (
          <ul>
            {resultats.map((item, index) => (
              <li key={index} className={item.type}>
                <span className="item-emoji">{item.emoji}</span>
                <span className="item-name">{item.nom}</span>
              </li>
            ))}
          </ul>
        )}
        
        <div className="counter">
          📊 La base de données contient {liste.length} aliments
        </div>
      </div>
    </>
  );
}

export default App;