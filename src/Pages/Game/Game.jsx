
import { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import Wordle from "../../Components/Wordle"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../../firebase"



const Home = () => {

  const [data, setData] = useState({
    solution: "",
    indices: [],
    score: 0
  })




  const getWordsFromFireStore = async () => {
    await getDocs(collection(db, "mots")).then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data() }));
                    const randomIndex = Math.floor(Math.random()*newData.length)
                    setData(
                      {
                        ...data,
                        solution: newData[randomIndex].motCle,
                        indices: newData[randomIndex].indices,
                        score: newData[randomIndex].scoreMot
                      }
                    )
                   
            })
  }


  useEffect(() => {
    getWordsFromFireStore()
  }, [])



// Renderer callback with condition



  return (
    <div className="App">
      <h1>Wordle (Lingo)</h1>

      {
        data.solution
        &&
        <Wordle 
          solution={data?.solution} 
          indices={data?.indices?.length > 0 ? data?.indices : []} 
          score={data?.score} />
        }
      {/* {indices.length > 0 && */}
    </div>
  )
}

export default Home