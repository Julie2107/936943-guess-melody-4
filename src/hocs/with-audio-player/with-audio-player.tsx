import * as React from 'react';
import {Subtract} from "utility-types";

import AudioPlayer from "../../components/audio-player/audio-player";

interface State {
  activePlayerId: number;
}

interface InjectingProps {
  renderPlayer: (src: string, id: number) => React.ReactNode;
}

const withActivePlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;

  type T = Subtract<P, InjectingProps>;

  class WithActivePlayer extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: 0,
      };
    }

    _handlePlayButtonClick(id) {
      const {activePlayerId} = this.state;

      return () => {
        this.setState({
          activePlayerId: activePlayerId === id ? -1 : id
        });
      };
    }

    _getAudioPlayer(src, id) {
      const {activePlayerId} = this.state;
      const isPLayingId = id === activePlayerId;

      return (
        <AudioPlayer
          src={src}
          isPlaying={isPLayingId}
          onPlayButtonClick={this._handlePlayButtonClick(id)}
        />
      );
    }

    render() {

      return <Component
        {...this.props}
        renderPlayer={(src, id) => this._getAudioPlayer(src, id)}
      />;
    }
  }

  return WithActivePlayer;
};

export default withActivePlayer;
