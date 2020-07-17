import * as React from "react";

import {QuestionArtistTypes, AnswerArtist} from "../../types";

interface Props {
  onAnswer: (question: QuestionArtistTypes, answer: AnswerArtist) => void;
  question: QuestionArtistTypes;
  renderPlayer: (src: string, index: number) => React.ReactNode;
}

interface State {
  isPlaying: boolean;
}

class QuestionArtist extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: true,
    };

    this._getArtistPoint = this._getArtistPoint.bind(this);

  }

  render() {
    const {question, renderPlayer} = this.props;
    const {answers, song} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <div className="track">
            {renderPlayer(song.src, 0)}
          </div>
        </div>
        <form className="game__artist">
          {answers.map(this._getArtistPoint)}
        </form>
      </section>
    );
  }

  _getArtistPoint(answer, i) {
    const answerID = `answer-${i}`;
    const {onAnswer, question} = this.props;

    return (
      <div key={answer.artist} className="artist">
        <input className="artist__input visually-hidden" type="radio" name="answer" value={answerID} id={answerID}
          onChange={(evt) => {
            evt.preventDefault();
            onAnswer(question, answer);
          }}
        />
        <label className="artist__name" htmlFor={answerID}>
          <img className="artist__picture" src={answer.picture} alt={answer.artist} />
          {answer.artist}
        </label>
      </div>
    );
  }
}

export default QuestionArtist;
