function RecordIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} {...props}>
      <g fill="none">
        <path d="M0 0h24v24H0z" />
        <path d="M0 0h24v24H0z" />
        <path d="M0 0h24v24H0z" />
      </g>
      <path
        fill="#F88423"
        d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"
      />
      <path
        fill="#F88423"
        d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"
      />
    </svg>
  );
}

export default RecordIcon;
