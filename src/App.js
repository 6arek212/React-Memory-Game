import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card'

const cardImages = [
  { 'src': '/img/helmet-1.png', matched: false },
  { 'src': '/img/potion-1.png', matched: false },
  { 'src': '/img/ring-1.png', matched: false },
  { 'src': '/img/scroll-1.png', matched: false },
  { 'src': '/img/shield-1.png', matched: false },
  { 'src': '/img/sword-1.png', matched: false },
]


function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)





  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCard => {
          return prevCard.map(card => {
            if (card.src === choiceOne.src || card.src === choiceTwo.src)
              return { ...card, matched: true }
            return card
          })
        })
        setTimeout(resetTurn, 1000)
        return
      }
      setTimeout(resetTurn, 1000)
    }
  }, [choiceOne, choiceTwo])

  // handle choice 
  const onChoose = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //resest and update turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(turns + 1)
    setDisabled(false)
  }

  // shuffle cards 
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }


  useEffect(() => {
    shuffleCards()
  }, [])


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {
          cards.map(card => (<Card
            key={card.id}
            card={card}
            onChoose={onChoose}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled} />))
        }
      </div>

      <p>Turns: {turns}</p>

    </div>
  );
}

export default App;
