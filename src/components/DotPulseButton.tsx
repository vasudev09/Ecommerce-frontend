const DotPulseButton = ({
  color,
  bgColor,
  borderRadius,
}: {
  color: string;
  bgColor: string;
  borderRadius: string;
}) => {
  const styles = `
    .dot-pulse-container {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: ${borderRadius};
        background-color: ${bgColor};
    }

    .dot-pulse {
    position: relative;
    left: -9999px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${bgColor};
    color: ${color};
    box-shadow: 9999px 0 0 -5px;
    animation: dot-pulse 1.5s infinite linear;
    animation-delay: 0.25s;
    }
    .dot-pulse::before,
    .dot-pulse::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${bgColor};
    color: ${color};
    }
    .dot-pulse::before {
    box-shadow: 9976px 0 0 -5px;
    animation: dot-pulse-before 1.5s infinite linear;
    animation-delay: 0s;
    }
    .dot-pulse::after {
    box-shadow: 10014px 0 0 -5px;
    animation: dot-pulse-after 1.5s infinite linear;
    animation-delay: 0.5s;
    }

    @keyframes dot-pulse-before {
    0% {
        box-shadow: 9976px 0 0 -5px;
    }
    30% {
        box-shadow: 9976px 0 0 2px;
    }
    60%,
    100% {
        box-shadow: 9976px 0 0 -5px;
    }
    }
    @keyframes dot-pulse {
    0% {
        box-shadow: 9999px 0 0 -5px;
    }
    30% {
        box-shadow: 9999px 0 0 2px;
    }
    60%,
    100% {
        box-shadow: 9999px 0 0 -5px;
    }
    }
    @keyframes dot-pulse-after {
    0% {
        box-shadow: 10014px 0 0 -5px;
    }
    30% {
        box-shadow: 10014px 0 0 2px;
    }
    60%,
    100% {
        box-shadow: 10014px 0 0 -5px;
    }
    }
    `;
  return (
    <>
      <style>{styles}</style>
      <div className="dot-pulse-container">
        <div className="dot-pulse"></div>
      </div>
    </>
  );
};

export default DotPulseButton;
