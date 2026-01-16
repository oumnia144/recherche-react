import React, { useState } from "react";

function App() {
  const [type, setType] = useState("");
  const [resultats, setResultats] = useState([]);
  const [erreur, setErreur] = useState("");

  const liste = [
    { nom: "banane", type: "fruit" },
    { nom: "orange", type: "fruit" },
    { nom: "pomme", type: "fruit" },
    { nom: "raisins", type: "fruit" },
    { nom: "kiwi", type: "fruit" },
    { nom: "tomate", type: "legume" },
    { nom: "carotte", type: "legume" },
    { nom: "pomme de terre", type: "legume" },
    { nom: "navet", type: "legume" },
    { nom: "poivron", type: "legume" },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    const typeInput = e.target.type.value.toLowerCase().trim();
    setErreur("");
    
    // Validation de l'entrée
    if (typeInput !== "fruit" && typeInput !== "legume") {
      setErreur("Veuillez entrer uniquement 'fruit' ou 'legume'");
      setType("");
      setResultats([]);
      return;
    }
    
    setType(typeInput);
    setResultats(liste.filter((item) => item.type === typeInput));
  }

  // Fonction pour réinitialiser la recherche
  function handleReset() {
    setType("");
    setResultats([]);
    setErreur("");
  }

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .rechercher-container {
          max-width: 500px;
          width: 100%;
          margin: 0 auto;
          padding: 35px;
          border-radius: 20px;
          background: #fff;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease;
        }
        
        .rechercher-container:hover {
          transform: translateY(-5px);
        }
        
        h1 {
          color: #2a5298;
          margin-bottom: 25px;
          text-align: center;
          font-size: 28px;
          position: relative;
          padding-bottom: 15px;
        }
        
        h1::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #2a5298, #1e3c72);
          border-radius: 2px;
        }
        
        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 25px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        label {
          font-weight: 600;
          color: #333;
          font-size: 15px;
        }
        
        input {
          padding: 12px 15px;
          border-radius: 10px;
          border: 2px solid #e1e5ee;
          font-size: 16px;
          transition: all 0.3s;
        }
        
        input:focus {
          outline: none;
          border-color: #2a5298;
          box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.1);
        }
        
        .buttons-container {
          display: flex;
          gap: 10px;
        }
        
        button {
          padding: 12px 20px;
          border-radius: 10px;
          border: none;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
          flex: 1;
        }
        
        .btn-submit {
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          color: white;
        }
        
        .btn-submit:hover {
          background: linear-gradient(135deg, #2a5298, #3a62b8);
          box-shadow: 0 5px 15px rgba(42, 82, 152, 0.3);
        }
        
        .btn-reset {
          background: linear-gradient(135deg, #6c757d, #495057);
          color: white;
        }
        
        .btn-reset:hover {
          background: linear-gradient(135deg, #495057, #343a40);
          box-shadow: 0 5px 15px rgba(108, 117, 125, 0.3);
        }
        
        .type-info {
          margin: 20px 0;
          font-size: 18px;
          text-align: center;
          padding: 12px;
          border-radius: 10px;
          background: linear-gradient(135deg, #3db5c8, #b522b5);
          border-left: 4px solid #2a5298;
        }
        
        .type-info strong {
          color: #2a5298;
          text-transform: capitalize;
        }
        
        .error-message {
          color: #dc3545;
          font-weight: 600;
          text-align: center;
          margin: 15px 0;
          padding: 10px;
          border-radius: 8px;
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
        }
        
        .empty-result {
          color: #6c757d;
          text-align: center;
          font-weight: 600;
          margin: 20px 0;
          padding: 15px;
          border-radius: 10px;
          background-color: #f8f9fa;
          border: 2px dashed #dee2e6;
        }
        
        .results-count {
          color: #2a5298;
          font-weight: 600;
          margin-bottom: 10px;
          font-size: 16px;
        }
        
        ul {
          list-style: none;
          padding: 0;
          margin-top: 15px;
        }
        
        li {
          background: linear-gradient(135deg, #c31f9a, #3370ad);
          padding: 14px 18px;
          border-radius: 12px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          transition: transform 0.2s, box-shadow 0.2s;
          border-left: 4px solid #2a5298;
        }
        
        li:hover {
          transform: translateX(5px);
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
        }
        .counter {
          margin-top: 20px;
          text-align: center;
          font-size: 14px;
          color: #6c757d;
        }
        
        @media (max-width: 600px) {
          .rechercher-container {
            padding: 25px 20px;
          }
          
          h1 {
            font-size: 24px;
          }
          
          .buttons-container {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="rechercher-container">
        <h1>🔍 Recherche d'Aliments</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="type">Type (fruit / légume)</label>
            <input
              type="text"
              id="type"
              name="type"
              placeholder="Entrez 'fruit' ou 'legume'"
              required
            />
          </div>
          
          <div className="buttons-container">
            <button type="submit" className="btn-submit">Rechercher</button>
            <button type="button" onClick={handleReset} className="btn-reset">Réinitialiser</button>
          </div>
        </form>
        
        {erreur && <p className="error-message">{erreur}</p>}
        
        {type && !erreur && (
          <p className="type-info">
            Résultats pour : <strong>{type}</strong>
          </p>
        )}
        
        {resultats.length > 0 && (
          <div className="results-count">
            {resultats.length} résultat{resultats.length > 1 ? 's' : ''} trouvé{resultats.length > 1 ? 's' : ''}
          </div>
        )}
        
        {resultats.length === 0 && type && !erreur && (
          <p className="empty-result">Aucun résultat trouvé ❌</p>
        )}
        
        <ul>
          {resultats.map((item, index) => (
            <li key={index} className={item.type}>
              {item.nom}
            </li>
          ))}
        </ul>
        
        <div className="counter">
          La base de données contient {liste.length} éléments
        </div>
      </div>
    </>
  );
}

export default App;