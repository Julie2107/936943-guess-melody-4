import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import {GameType} from "../../consts.js";

class QuestionGenre extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePlayer: 0,
      answers: [false, false, false, false],
    };

    this._handleSubmitButton = this._handleSubmitButton.bind(this);
    this._getGenreAnswers = this._getGenreAnswers.bind(this);
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
    });
  }

  _getGenreAnswers() {
    const {question, renderPlayer} = this.props;
    const {answers} = question;
    const {answers: userAnswers, activePlayer} = this.state;

    return answers.map((answer, i) => {
      const answerID = `answer-${i}`;
      const keyCount = `${i}-${answer.src}`;

      return (
        <div key={keyCount} className="track">
          {renderPlayer(answer.src, i, activePlayer)}
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

  _handleSubmitButton(evt) {
    const {onAnswer, question} = this.props;

    evt.preventDefault();
    onAnswer(question, this.state.answers);
  }

  render() {
    const {question} = this.props;
    const {genre} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={this._handleSubmitButton}
        >
          {this._getGenreAnswers()}
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
  renderPlayer: PropTypes.func.isRequired,
};

export default QuestionGenre;
