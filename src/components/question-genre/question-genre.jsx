import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import AudioPlayer from "../audio-player/audio-player.jsx";
import {GameType} from "../../consts.js";

class QuestionGenre extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePlayer: 0,
      answers: [false, false, false, false],
    };

    this._handleSubmitButton = this._handleSubmitButton.bind(this);
  }

  _handleOnChangeTrack(evt, userAnswers, i) {
    const value = evt.target.checked;

    this.setState({
      answers: [...userAnswers.slice(0, i), value, ...userAnswers.slice(i + 1)],
    });
  }

  _handlePlayButtonClick(activePlayer, i) {
    this.setState({
      activePlayer: activePlayer === i ? -1 : i,
    })
  }

  _getGenreAnswers(userAnswers, answers, activePlayer) {

    return answers.map((answer, i) => {
      const answerID = `answer-${i}`;

      return (
        <div key={`${i}-${answer.src}`} className="track">
          <AudioPlayer
            onPlayButtonClick={() => {
              this._handlePlayButtonClick(activePlayer, i)
            }}
            isPlaying={i === activePlayer}
            src={answer.src}
          />
          <div className="game__answer">
            <input
              className="game__input visually-hidden" type="checkbox" name="answer"
              value={answerID}
              id={answerID}
              checked={userAnswers[i]}
              onChange={(evt) => {
                this._handleOnChangeTrack(evt, userAnswers, i);
              }}
            />
            <label className="game__check" htmlFor={answerID}>Отметить</label>
          </div>
        </div>
      );
    });
  }

  _handleSubmitButton(question, onAnswer) {
    return (evt) => {
      evt.preventDefault();
      onAnswer(question, this.state.answers);
    };
  }

  render() {
    const {onAnswer, question} = this.props;
    const {answers: userAnswers, activePlayer} = this.state;
    const {answers, genre} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={this._handleSubmitButton(question, onAnswer, activePlayer)}
        >
          {this._getGenreAnswers(userAnswers, answers)}
          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

QuestionGenre.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })).isRequired,
    genre: PropTypes.string.isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  }).isRequired,
};

export default QuestionGenre;
