import * as React from "react";
import {GameType, timerLineStyle} from "../../consts";

interface Props {
  type: GameType;
  children: React.ReactNode;
}

const GameScreen: React.FunctionComponent<Props> = (props: Props) => {
  const {type, children} = props;
  const gameTypeClassName = `game game--${type}`;

  return (
    <section className={gameTypeClassName}>
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={timerLineStyle}/>
        </svg>

        <div className="game__mistakes">
          <div className="wrong" />
          <div className="wrong" />
          <div className="wrong" />
        </div>
      </header>

      {children}
    </section>
  );
};

export default GameScreen;
