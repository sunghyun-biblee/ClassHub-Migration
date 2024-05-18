import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import preview from "assets/img/preview.jpg";
export const LearnVideo = () => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [lastPlayedTime, setLastPlayedTime] = useState(0);

  // 현재 재생 중인 시간을 주기적으로 저장합니다. (이어듣기를 위해서)
  const handleProgress = (progress: {
    played: number;
    playedSeconds: number;
  }) => {
    localStorage.setItem("lastPlayedTime", progress.playedSeconds.toString());
  };

  //   동영상이 준비되었을때 저장된 시간이 있다면 저장된 시간으로 이동

  const handleReady = () => {
    const lastPlayedTimeStr = localStorage.getItem("lastPlayedTime");
    const currentTime =
      lastPlayedTimeStr !== null ? timeFloor(parseFloat(lastPlayedTimeStr)) : 0;

    if (playerRef.current) {
      const playerCurrTime = timeFloor(playerRef.current.getCurrentTime());

      if (currentTime === 0 || playerCurrTime === currentTime) {
        return setPlaying(false);
      }
      playerRef.current.seekTo(lastPlayedTime, "seconds");
      setPlaying(true);
    }
  };

  const timeFloor = (time: number): number => {
    const data = Math.floor(time * 10) / 10;
    return data;
  };

  //   저장된 시간이 있는지 로컬 스토리지에서 불러오기
  useEffect(() => {
    const savedTime = localStorage.getItem("lastPlayedTime");
    if (savedTime) {
      setLastPlayedTime(parseFloat(savedTime));
    }
  }, []);

  return (
    <article>
      <ReactPlayer
        ref={playerRef}
        url={"/videos/test.mp4"}
        playing={playing}
        muted={true}
        controls={true}
        width="100%"
        height="80dvh"
        // light={<img src={preview} alt="thumbnail" className="w-[500px]" />}
        progressInterval={1000}
        onProgress={handleProgress}
        onReady={handleReady}
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
      ></ReactPlayer>
    </article>
  );
};

// react player의 라이브러리의 controls 옵션은 브러우저에서 제공하는 기본 html5 video 태그에서 제공하는 컨트롤러로 , 해당 컨트롤러의 옵션중 비디오 다운로드가 있습니다.
// 이 옵션은 lms 프로젝트 즉,강의를 제공하는 프로젝트에서는 저작권적으로 매우 치명적인 부분으로 해당 옵션을 비활성화 하는 방법을 찾아보았습니다.
// react player의 깃허브 레파지토리의 이슈부분에서 해당 문제 대한 해결법을 찾을 수 있었습니다
//  config props를 통하여 file 부분의 속성중 controlsList부분을 nodowonload로 지정하면 해당 영상을 다운로드할 수 없도록 설정할 수 있었습니다.

//  progressInterval={1000} 은 onProgress 이벤트를 발생시키는 빈도를 설정한다
//  위와같이 1000으로 설정하면 1000ms 즉, 1초마다 onProgress 이벤트를 발생시킴
//  onProgress는 비디오 재생중일 때,현재 재생 시간 등의 정보를 제공한다.

// playsinline prop은 모바일 장치에서 비디오가 전체 화면으로 재생되지 않고
// 인라인(현재 화면 안에서) 재생되도록 설정합니다. 주로 iOS Safari에서 유용하게 사용됩니다.
