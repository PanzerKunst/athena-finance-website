import classNames from "classnames"
import ReactPlayer from "react-player/lazy"

import "./VideoPlayer.scss"

type Props = {
  url: string;
  autoPlay?: boolean;
}

export function VideoPlayer({ url, autoPlay = false }: Props) {
  const isHosted = url.startsWith("/video")

  return (
    <div className={classNames("video-player", { hosted: isHosted })}>
      {isHosted ? (
        <div>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            src={url}
            controls
            playsInline
            autoPlay={autoPlay}
          >
            Your browser does not support HTML5 video.
          </video>
        </div>
      ) : (
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          controls
          playing={autoPlay}
        />
      )}
    </div>
  )
}
