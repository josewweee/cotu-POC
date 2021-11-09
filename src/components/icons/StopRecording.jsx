function StopRecording(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={48}
      width={48}
      {...props}
      viewBox="0 0 20 20"
      transform="scale(2.2)"
    >
      <path fill="none" d="M0 0h20v20H0z" />
      <path
        fill="#F88423"
        d="M10 3c-3.87 0-7 3.13-7 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm3 10H7V7h6v6z"
      />
    </svg>
  );
}

export default StopRecording;
