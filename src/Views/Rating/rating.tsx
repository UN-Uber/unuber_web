import { useState } from "react";
import './rating.css';
import { FaStar } from "react-icons/fa";
import axios from "axios";

function ratingDes (value : number){
    var name : string = "";
    switch (value) {
      case 1:
        name = "Pésimo";
        break;
      case 2:
        name = "Malo";
        break;
      case 3:
        name = "Regular";
        break;
      case 4:
        name = "Bueno";
        break;
      case 5:
        name = "Excelente";
        break;
      default:
        break;
    }
    return (name);
}

function updateUserCalif(inputValue:number){
    return axios.post("https://general-api-f6ljpbkkwa-uc.a.run.app;", {
        query:` mutation UserCalifInput($input: UserCalifInput) {
            createUserCalif(input: $input)
            } `,
        variables:{
            idnput: inputValue,
        },
    }, {
        headers:{
            'Content-Type': 'application/json',
        }
    });
}

   
const rating: React.FC = () => {
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(0);
  
    return (
      <div className="container">
        <h2> Calificación </h2>
        <p>Por favor selecciona una calificación en la escala de 1 a 5 estrellas.</p>
        <div className="stars">
          {[...Array(5)].map((_star, i) => {
            const ratingValue = i + 1;
            return (
              <label>
                <input type="radio" 
                name="rating" 
                value={ratingValue}
                onClick={() => setCurrentValue(ratingValue)} 
                />
                <FaStar className="star"
                  size={30}
                  color = {ratingValue <= (hoverValue || currentValue)? "#ff9933" : "#6c6c6c"} 
                  onMouseOver={() => setHoverValue(ratingValue)}
                  onMouseOut={() => setHoverValue(0)}
                />
              </label>
            )
          })}
        </div>
        <p>{ratingDes(currentValue)}</p>
  
        <button id="botonx" onClick={() => updateUserCalif(currentValue)}>
          Enviar
        </button>
      </div>
    );
}

export default rating;
