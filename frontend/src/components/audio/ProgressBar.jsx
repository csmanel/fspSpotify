const ProgressBar = () => {
  return (
    <div className="progress-bar-container">
      <span className="current-time">00:00</span>
      <input type="range" />
      <span className="time">03:32</span>
    </div>
  );
};

export default ProgressBar;
