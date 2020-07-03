import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import {GameType} from "../../consts.js";

class QuestionArtist extends PureComponent {
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

QuestionArtist.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      artist: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    })).isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  }).isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default QuestionArtist;
