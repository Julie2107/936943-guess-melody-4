import * as React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";

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
}

interface State {
  step: number;
}

type Question = QuestionArtistTypes | QuestionGenreTypes;

class App extends React.PureComponent<Props, State, {}> {
  constructor(props) {
    super(props);

    this.state = {
      step: FIRST_STEP,
    };

    this._handleWelcomeButtonClick = this._handleWelcomeButtonClick.bind(this);
    this._handleOnAnswer = this._handleOnAnswer.bind(this);
  }

  _handleWelcomeButtonClick() {
    this.setState({
      step: 0,
    });
  }

  _handleOnAnswer() {
    this.setState((prevState) => ({
      step: prevState.step + 1,
    }));
  }

  _renderGameScreen() {
    const {errorsCount, questions} = this.props;
    const {step} = this.state;
    const question = questions[step];

    if (step === FIRST_STEP || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={errorsCount}
          onWelcomeButtonClick={this._handleWelcomeButtonClick}
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
                onAnswer={this._handleOnAnswer}
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
                onAnswer={this._handleOnAnswer}
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

export default App;
