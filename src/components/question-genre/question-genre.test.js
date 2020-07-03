import React from "react";
import renderer from "react-test-renderer";
import QuestionGenre from "./question-genre.jsx";

const question = {
  type: `genre`,
  genre: `rock`,
  answers: [{
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `rock`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `blues`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `jazz`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `rock`,
  }],
};

it(`QuestionGenre is rendered correctly`, () => {
  const tree = renderer.create((
    <QuestionGenre
      question={question}
      onAnswer={() => {}}
      renderPlayer={() => {}}
    />
  ), {
    createMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
