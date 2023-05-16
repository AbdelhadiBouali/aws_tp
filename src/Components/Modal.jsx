/* eslint-disable react/prop-types */

import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../recoil/userAtom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";




export default function Modal({ isCorrect, solution, turn, score }) {
  
  const user = useRecoilValue(userAtom)
  const setUser = useSetRecoilState(userAtom)

  const navigate = useNavigate()

  const addWordAndScoreAndTurnToFireStore = async (word, score) => {
    const docRef = doc(db, "utilisateur", user.id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
      await updateDoc(docRef, {
        Score: parseInt(docSnap.data().Score) + parseInt(score),
        mots: [...user?.mots?? [], word],
      })
      setUser({
        ...user,
        Score: parseInt(docSnap.data().Score) + parseInt(score),
        mots: [...user?.mots?? [], word],
      })
    }
  }

  useEffect(() => {
    if(isCorrect) {
      addWordAndScoreAndTurnToFireStore(solution, score)
    }
  }, [isCorrect])



  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>Vous gagnez!</h1>
          <p className="solution">{solution}</p>
          <p>Vous avez trouvé la solution dans {turn} essaies :)</p>
          <button   onClick={() => navigate(-1)}>Voir Ton Résultat</button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>Pas grave</h1>
          <p className="solution">{solution}</p>
          <p>Plus de chance la prochaine fois :)</p>
          <button   onClick={() => navigate(-1)}>Voir Ton Résultat</button>
        </div>

      )}
      
    </div>
  )
}
