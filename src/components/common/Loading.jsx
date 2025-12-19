import "./Loading.css";

const Loading = ({ size = "md", className = "" }) => {
  return (
    <div className={`loading loading-${size} ${className}`.trim()}>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;
