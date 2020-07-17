import * as React from "react";
import * as renderer from "react-test-renderer";

import QuestionArtist from "./question-artist";
import {GameType, QuestionArtistTypes} from "../../types";

const question: QuestionArtistTypes = {
  type: GameType.ARTIST,
  song: {
    artist: `Jim Beam`,
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  },
  answers: [{
    picture: `https://api.adorable.io/avatars/128/0`,
    artist: `John Snow`,
  }, {
    picture: `https://api.adorable.io/avatars/128/1`,
    artist: `Jack Daniels`,
  }, {
    picture: `https://api.adorable.io/avatars/128/2`,
    artist: `Jim Beam`,
  }],
};

it(`questionArtist is rendered correctly`, () => {
  const tree = renderer.create(
      <QuestionArtist
        question={question}
        onAnswer={() => {}}
        renderPlayer={() => null}
      />, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
