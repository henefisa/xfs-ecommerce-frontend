import React, { useEffect, useState } from "react";

interface CountdownProps {
  /** duration second */
  duration: number;
}

const Countdown: React.FC<CountdownProps> = ({ duration }) => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const convertTime = (secs: number) => {
    const hours = ~~(secs / (60 * 60));
    const minutes = ~~((secs % 3600) / 60);
    const seconds = ~~(secs % 3600) % 60;

    return {
      hours,
      minutes,
      seconds,
    };
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let seconds = duration;
    interval = setInterval(() => {
      if (seconds === 0 && interval) clearInterval(interval);
      setTime(convertTime(seconds));
      seconds -= 1;
    }, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [duration]);

  return (
    <div className="count-down">
      <div className="count-down__time">
        {time.hours.toString().padStart(2, "0")}
      </div>
      <div className="count-down__time">
        {time.minutes.toString().padStart(2, "0")}
      </div>
      <div className="count-down__time">
        {time.seconds.toString().padStart(2, "0")}
      </div>
    </div>
  );
};

export default React.memo(Countdown);
