function RecordIcon(props) {
  return (
    <svg
      width={64}
      height={64}
      transform="scale(1.5)"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={32} cy={32} r={23} stroke="#F88423" strokeWidth={2} />
      <path
        d="M32 34c1.66 0 2.99-1.34 2.99-3l.01-6c0-1.66-1.34-3-3-3s-3 1.34-3 3v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S26.7 34 26.7 31H25c0 3.41 2.72 6.23 6 6.72V41h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"
        fill="#F88423"
      />
    </svg>
  );
}

export default RecordIcon;

/* 
function RecordIcon(props) {
  return (
    <svg
      width={64}
      height={64}
      transform="scale(1.9)"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={32} cy={32} r={23} stroke="#F88423" strokeWidth={2} />
      <path
        d="M32 34c1.66 0 2.99-1.34 2.99-3l.01-6c0-1.66-1.34-3-3-3s-3 1.34-3 3v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S26.7 34 26.7 31H25c0 3.41 2.72 6.23 6 6.72V41h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"
        fill="#F88423"
      />
    </svg>
  );
}

export default RecordIcon;


*/
