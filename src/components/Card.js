import './Card.css'

const Card = ({ card, onChoose, flipped, disabled }) => {

    const onClick = () => {
        if (disabled)
            return
        onChoose(card)
    }

    return (
        <div className='card'>
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card front" />
                <img
                    className="back"
                    src="/img/cover.png"
                    onClick={onClick} alt="card back" />

            </div>
        </div>
    );
}

export default Card;