import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";


export default class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = createRef();

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: props.isPlaying,
    };

    this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
  }

  componentDidMount() {
    const {src} = this.props;
    const audio = this._audioRef.current;

    if (audio) {
      audio.src = src;

      audio.oncanplaythrough = () => this._handlePlayThrough();

      audio.onplay = () => this._handleOnPlay();

      audio.onpause = () => this._handleOnPause();

      audio.ontimeupdate = () => this._handleTimeUpdate(audio);
    }
  }

  _handlePlayThrough() {
    this.setState({
      isLoading: false,
    });
  }

  _handleOnPlay() {
    this.setState({
      isPlaying: true,
    });
  }

  _handleOnPause() {
    this.setState({
      isPlaying: false,
    });
  }

  _handleTimeUpdate(audio) {
    this.setState({
      progress: audio.currentTime
    });
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;

    if (audio) {
      audio.oncanplaythrough = null;
      audio.onplay = null;
      audio.onpause = null;
      audio.ontimeupdate = null;
      audio.src = ``;
    }

  }

  _handlePlayButtonClick() {
    const {onPlayButtonClick} = this.props;

    this.setState({isPlaying: !this.state.isPlaying});

    onPlayButtonClick();
  }

  render() {
    const {isLoading, isPlaying} = this.state;

    const buttonClassName = `track__button track__button--${isPlaying ? `pause` : `play`}`;

    return (
      <>
        <button
          className={buttonClassName}
          type="button"
          disabled={isLoading}
          onClick={this._handlePlayButtonClick}
        />
        <div className="track__status">
          <audio
            ref={this._audioRef}
          />
        </div>
      </>
    );
  }

  componentDidUpdate() {
    const audio = this._audioRef.current;

    if (this.props.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired
};
