import * as React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";

import WelcomeScreen from "../welcome-screen/welcome-screen";
import QuestionArtist from "../question-artist/question-artist";
import QuestionGenre from "../question-genre/question-genre";
import GameScreen from "../game-screen/game-screen";
import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player";
import {GameType, FIRST_STEP} from "../../consts";
import {QuestionArtistTypes, QuestionGenreTypes} from "../../types";

const QuestionGenreWrapped = withAudioPlayer(QuestionGenre);
const QuestionArtistWrapped = withAudioPlayer(QuestionArtist);

interface Props {
  errorsCount: number;
  questions: Question[];
  onUserAnswer: () => void;
  onWelcomeButtonClick: () => void;
  step: number;
}

type Question = QuestionArtistTypes | QuestionGenreTypes;

class App extends React.PureComponent<Props, {}> {

  _renderGameScreen() {
    const {errorsCount,
      questions,
      onUserAnswer,
      onWelcomeButtonClick,
      step} = this.props;
    const question = questions[step];

    if (step === FIRST_STEP || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={errorsCount}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen
              type={question.type}
            >
              <QuestionArtistWrapped
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen
              type={question.type}
            >
              <QuestionGenreWrapped
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
      }
    }

    return null;
  }

  render() {
    const {questions} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/artist">
            <QuestionArtistWrapped
              question={questions[1]}
              onAnswer={() => {
                return;
              }}
            />
          </Route>
          <Route exact path="/dev-genre">
            <QuestionGenreWrapped
              question={questions[0]}
              onAnswer={() => {
                return;
              }}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  step: state.step,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer() {
    dispatch(ActionCreator.incrementStep());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
