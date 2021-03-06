function BackArrow(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={24}
      width={24}
      fill="#D7E5CF"
      {...props}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </svg>
  );
}

export default BackArrow;
