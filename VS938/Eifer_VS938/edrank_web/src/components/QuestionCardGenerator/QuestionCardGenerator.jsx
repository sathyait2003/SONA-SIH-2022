// import './STPListCard.scss';
function QuestionCard({ question, options }) {
	return (
		<div className='question-list-card-main'>
			<h3>{question}</h3>
            {/* <br></br>
            <br></br> */}
            {
                options.map((opt, i) => {
                    return (
                        <>
                        <input key={i} type="radio" id={i}/>
                        <label for={i}>{opt}</label><br></br>
                        </>
                    )
                })
            }
		</div>
	);
}

export default QuestionCard;
